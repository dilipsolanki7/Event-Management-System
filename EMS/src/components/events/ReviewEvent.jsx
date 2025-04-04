import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`http://localhost:7000/events/${id}`); // Fetch event by ID
            if (!response.ok) {
                navigate('/login'); // Redirect to login if not authenticated
            }
            const data = await response.json();
            setEvent(data);
            setLoading(false);
        };
        fetchEvent();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{event.title}</h1>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
        </div>
    );
};

export default ReviewEvent;
