// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// //import jwtDecode from 'jwt-decode'; // Ensure this is correctly imported

// const CreateEvent = () => {
//     const [eventData, setEventData] = useState({
//         title: '',
//         organizer: '',
//         date: '',
//         time: '',
//         description: '',
//         venue: '',
//         photoURL: '',
//         file: null,
//         createdBy: '' // Initialize as empty
//     });

//     const navigate = useNavigate();

//     /* useEffect(() => {
//         // Logic to get the current user's ID from the token
//         const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const currentUserId = decodedToken.userId;
//             setEventData((prevData) => ({
//                 ...prevData,
//                 createdBy: currentUserId // Set createdBy to the user ID
//             }));
//         } else {
//             console.error('User not authenticated');
//             navigate('/login'); // Redirect to login if user is not authenticated
//         }
//     }, [navigate]); */

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData({
//             ...eventData,
//             [name]: value
//         });
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         setEventData({
//             ...eventData,
//             file: file // Store the file in the event data
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('title', eventData.title);
//         formData.append('organizer', eventData.organizer);
//         formData.append('date', eventData.date);
//         formData.append('time', eventData.time);
//         formData.append('description', eventData.description);
//         formData.append('venue', eventData.venue);
//         formData.append('photoURL', eventData.photoURL);
//         formData.append('createdBy', eventData.createdBy); // Include createdBy field

//         try {
//             console.log("body-->", formData);
//             let token = localStorage.getItem("token");
//             const response = await fetch('http://localhost:7000/api/v1/event/add', {
//                 method: 'POST',
//                 body: formData,
//                 headers:{
//                     // "Content-Type": "application/json",
//                     "Authorization": token
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create event');
//             }

//             const result = await response.json();
//             console.log('Event created:', result);
//             // navigate('/my-events'); // Redirect to My Events page after successful creation
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Create Event</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="title" placeholder="Event Title" onChange={handleChange} required />
//                 <input type="text" name="organizer" placeholder="Organizer" onChange={handleChange} required />
//                 <input type="date" name="date" onChange={handleChange} required />
//                 <input type="time" name="time" onChange={handleChange} required />
//                 <textarea name="description" placeholder="Description" onChange={handleChange} required />
//                 <input type="text" name="venue" placeholder="Venue" onChange={handleChange} required />
//                 <input type="text" name="photoURL" placeholder="Photo URL" onChange={handleChange} />
//                 <button type="submit">Create Event</button>
//             </form>
//         </div>
//     );
// };

// export default CreateEvent;


/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: '',
        organizer: '',
        date: '',
        time: '',
        description: '',
        venue: '',
        photoURL: '',
        file: null,
        registrationFee: '',
        maxSlots: ''
    });
    

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setEventData((prevData) => ({
            ...prevData,
            file: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            title: eventData.title,
            organizer: eventData.organizer,
            date: eventData.date,
            time: eventData.time,
            description: eventData.description,
            venue: eventData.venue,
            photoURL: eventData.photoURL || null, // Send null if not provided
            registrationFee: eventData.registrationFee,
            maxSlots: eventData.maxSlots
        };
        

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Redirecting to login.');
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:7000/api/v1/event/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(requestData) // Convert to JSON
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const result = await response.json();
            console.log('Event created:', result);
            navigate('/my-events'); // Redirect after successful creation
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };


    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleChange} required />
                <input type="text" name="organizer" placeholder="Organizer" value={eventData.organizer} onChange={handleChange} required />
                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
                <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required />
                <input type="text" name="venue" placeholder="Venue" value={eventData.venue} onChange={handleChange} required />
                <input type="number"  name="registrationFee" placeholder="Registration Fee (Enter 0 if free)" value={eventData.registrationFee} onChange={handleChange} required />
                <input type="number" name="maxSlots" placeholder="Maximum Slots Available" value={eventData.maxSlots} onChange={handleChange} required />
                <input type="text" name="photoURL" placeholder="Photo URL (optional)" value={eventData.photoURL} onChange={handleChange} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent; */


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: '',
        organizer: '',
        date: '',
        time: '',
        description: '',
        venue: '',
        photoURL: '',
        file: null,
        registrationFee: '',
        maxSlots: ''
    });
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (error || successMessage) {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top smoothly
        }
    }, [error, successMessage]);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setEventData((prevData) => ({
            ...prevData,
            file: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        const requestData = { ...eventData, photoURL: eventData.photoURL || null };
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Redirecting to login.');
                setError("Please Login!");
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:7000/api/v1/event/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(requestData)
            });

            /* if (!response.ok) {
                throw new Error('Failed to create event');
            } */

            const result = await response.json();
            console.log('Event created:', result);
            setSuccessMessage("Event Created successfully!...");
            setTimeout(() => {
                navigate('/my-events', { replace: true });
            }, 2000);
            
        } catch (error) {
            console.error('Error creating event:', error);
            setError(error.message);
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundImage: "url('https://source.unsplash.com/1600x900/?event,party')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            padding: '20px',
            marginTop : '75px',
            marginBottom : '125px'
        }}>
            <div style={{ maxHeight: '825px',marginTop: '40px', maxWidth: '600px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
                🎉 Create Your Event
            </h1>

                {(error || successMessage) && (
                    <div style={{
                        backgroundColor: error ? '#ff4d4d' : '#28a745',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '5px',
                        fontSize: '14px',
                        textAlign: 'center',
                        marginBottom: '10px',
                        width: '100%'
                    }}>
                        {error || successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="organizer" placeholder="Organizer" value={eventData.organizer} onChange={handleChange} required style={inputStyle} />
                    <input type="date" name="date" value={eventData.date} onChange={handleChange} required style={inputStyle} />
                    <input type="time" name="time" value={eventData.time} onChange={handleChange} required style={inputStyle} />
                    <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required style={{ ...inputStyle, height: '80px' }} />
                    <input type="text" name="venue" placeholder="Venue" value={eventData.venue} onChange={handleChange} required style={inputStyle} />
                    <input type="number" name="registrationFee" placeholder="Registration Fee (Enter 0 if free)" value={eventData.registrationFee} onChange={handleChange} required style={inputStyle} />
                    <input type="number" name="maxSlots" placeholder="Maximum Slots Available" value={eventData.maxSlots} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="photoURL" placeholder="Photo URL (optional)" value={eventData.photoURL} onChange={handleChange} style={inputStyle} />
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={inputStyle} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Create Event</button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px'
};

export default CreateEvent;
