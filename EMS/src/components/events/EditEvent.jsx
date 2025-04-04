import React, { useState, useEffect ,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState({
    title: "",
    organizer: "", 
    date: "",
    time: "",
    description: "",
    venue: "",
    registrationFee: 0,
    maxSlots: 0,
    photoURL: "",
  });

  useEffect(() => {
    fetchEventDetails();
  }, []);

  
  
  
  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required! Redirecting to login...");
        scrollToTop();
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const response = await fetch(`http://localhost:7000/api/v1/event/${id}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token 
        },
      });

      if (!response.ok) throw new Error("Failed to fetch event details");

      const data = await response.json();
      console.log(data.data);
      const userId = localStorage.getItem("userId"); // Logged-in user ID

      if (data.data.createdBy !== userId) {
        setError("You are not authorized to edit this event.");
        scrollToTop();
        setTimeout(() => navigate("/my-events"), 2000);
      } else {
        const formattedEvent = {
          ...data.data,
          date: data.data.date ? new Date(data.data.date).toISOString().split("T")[0] : "", // Fix date format
        };
        setEventData(formattedEvent);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Error loading event details.");
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess('');
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:7000/api/v1/event/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token 
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      console.log(data.data);

      if (response.ok) {
        setSuccess("Event updated successfully!");
        scrollToTop();
        setTimeout(() => navigate("/my-events"), 2000);
      } else {
        setError(data.message || "Error updating event.");
        scrollToTop();
      }
    } catch (error) {
      setError("Failed to update event.");
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start"  });
    }
  };

  if (loading) return <p>Loading event details...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div ref={topRef}></div>
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

      {success && (
        <div className="bg-green-300 border border-green-500 text-green-700 px-4 py-3 rounded-md mb-4">
          <strong>Success:</strong> {success}
        </div>
      )}
      {error && (
        <div className="bg-red-300 border border-red-500 text-red-700 px-4 py-3 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}


      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Organizer</span>
          <input
            type="text"
            name="organizer"
            value={eventData.organizer}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Date</span>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Time</span>
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Venue</span>
          <input
            type="text"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Max Slots</span>
          <input
            type="number"
            name="maxSlots"
            value={eventData.maxSlots}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Registration Fee</span>
          <input
            type="number"
            name="registrationFee"
            value={eventData.registrationFee}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Photo URL</span>
          <input
            type="url"
            name="photoURL"
            value={eventData.photoURL}
            onChange={handleChange}
            required
            placeholder="Enter image URL"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </label>


        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={() => navigate("/my-events")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
