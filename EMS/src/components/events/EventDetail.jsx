import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EventDetail = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/v1/event/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        console.log(data.data);
        setEvent(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-4">Organizer: {event.organizer}</p>
      <p className="text-gray-600 mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Time: {event.time}</p>
      <p className="text-gray-600 mb-4">Venue: {event.venue}</p>
      <p className="text-gray-600 mb-4">Registration Fee: ${event.registrationFee}</p>
      <p className="text-gray-600 mb-4">Max Slots: {event.maxSlots}</p>
    </div>
  );
};
