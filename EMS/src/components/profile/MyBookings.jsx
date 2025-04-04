import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/events/EventCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log("UserId-->",userId);  
      if (!token) {
        console.error("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:7000/api/v1/event/mybookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        
      });

      const data = await response.json();
      console.log("Fetched Bookings:", data);
      //console.log("data.items-->", data.data.items);
      if (response.ok) {
        setBookings(data.data?.items || []);
      } else {
        console.error("Error fetching bookings:", data.message);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {loading ? (
        <p>Loading booked events...</p>
      ) : !Array.isArray(bookings) || bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3 border">Event</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Venue</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{event.title}</td>
                  <td className="p-3 border">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-3 border">{event.time}</td>
                  <td className="p-3 border">{event.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link
        to="/events"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Explore More Events
      </Link>
    </div>
  );
};

export default MyBookings;
