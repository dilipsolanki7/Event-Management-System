// src/pages/MyEvents.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/events/EventCard";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);
  
  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:7000/api/v1/event/myevents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      const data = await response.json();
      //console.log("data-->", data);
      console.log("data.items-->", data.data.items);

      if (response.ok) {
        // setEvents(data.items);
        setEvents(data.data?.items || []); 

      } else {
        console.error("Error fetching events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : !Array.isArray(events) || events.length === 0 ? (
          <p>No events created yet.</p>
      ) : (

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3 border">Event</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Venue</th>
                <th className="p-3 border">Max Slots</th>
                <th className="p-3 border">Reg. Fees</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((events) => (
                <tr key={events._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{events.title}</td>
                  <td className="p-3 border">{events.description}</td>
                  <td className="p-3 border">{new Date(events.date).toLocaleDateString()}</td>
                  <td className="p-3 border">{events.time}</td>
                  <td className="p-3 border">{events.venue}</td>
                  <td className="p-3 border">{events.maxSlots}</td>
                  <td className="p-3 border">{events.registrationFee}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center space-x-3">
                      <Link
                        to={`/event/edit/${events._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        /* onClick={() => handleDelete(event._id)} */
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
      <Link
        to="/CreateEvent"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create New Event
      </Link>
    </div>
  );
};

export default MyEvents;
