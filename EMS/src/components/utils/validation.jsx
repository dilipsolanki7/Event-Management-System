// src/utils/validation.js
export const validateEvent = (eventData) => {
    const errors = {};
  
    if (!eventData.title?.trim()) {
      errors.title = 'Title is required';
    }
  
    if (!eventData.description?.trim()) {
      errors.description = 'Description is required';
    }
  
    if (!eventData.date) {
      errors.date = 'Date is required';
    } else {
      const eventDate = new Date(eventData.date);
      if (eventDate < new Date()) {
        errors.date = 'Event date cannot be in the past';
      }
    }
  
    if (!eventData.time) {
      errors.time = 'Time is required';
    }
  
    if (!eventData.location?.trim()) {
      errors.location = 'Location is required';
    }
  
    if (!eventData.price || eventData.price < 0) {
      errors.price = 'Price must be 0 or greater';
    }
  
    if (!eventData.capacity || eventData.capacity < 1) {
      errors.capacity = 'Capacity must be at least 1';
    }
  
    return errors;
  };
  
  // src/hooks/useForm.js
  import { useState, useCallback } from 'react';
  
  const useForm = (initialState, validate, onSubmit) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when field is edited
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }, [errors]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate(values);
      
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          setErrors(prev => ({
            ...prev,
            submit: error.message
          }));
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setErrors(validationErrors);
      }
    };
  
    return {
      values,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit,
      setValues
    };
  };
  
  // Enhanced CreateEvent component with validation
  const CreateEvent = () => {
    const {
      values,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit
    } = useForm(
      {
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        capacity: '',
        category: '',
        imageUrl: ''
      },
      validateEvent,
      async (formData) => {
        const auth = getAuth();
        const db = getFirestore();
        
        const eventData = {
          ...formData,
          price: parseFloat(formData.price),
          capacity: parseInt(formData.capacity),
          createdBy: auth.currentUser.uid,
          createdAt: new Date().toISOString(),
          registrations: 0
        };
  
        await addDoc(collection(db, 'events'), eventData);
        navigate('/my-events');
      }
    );
  
    return (
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
  
          {/* Add similar validation UI for other fields */}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    );
  };