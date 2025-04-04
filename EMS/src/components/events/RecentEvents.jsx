import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
const recentEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:7000/api/v1/event/getevent',
                { method: 'POST' }

            ); // Update to the correct endpoint
            //console.log("response-->", response);
            console.log("res->", response);

            if (!response.ok) {
                // navigate('/login'); // Redirect to login if not authenticated
            }
            const data = await response.json();
            //console.log("data-->", data);
            //console.log("data.items-->", data.data.items);

            setEvents(data.data.items);
            setLoading(false);
        };
        fetchEvents();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
            {events.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">There is no any events yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <EventCard key={event?._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default recentEvents;
