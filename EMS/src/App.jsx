import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import EventPackages from './components/home/EventPackages';
import FeaturedServices from './components/home/FeaturedServices';
import AdminRouter from './components/admin/AdminRouter';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import Profile from './components/profile/Profile';
import MyEvents from './components/profile/MyEvents';
import MyBookings from './components/profile/MyBookings';
import ReviewEvent from './components/events/ReviewEvent';
// import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import RecentEvents from './components/events/RecentEvents';
import EventRegistrationPage from "./components/events/EventRegistrationPage";
import { EventDetail } from './components/events/EventDetail';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/event-packages" element={<EventPackages />} />
                <Route path="/featured-services" element={<FeaturedServices />} />
                <Route path="/CreateEvent" element={<CreateEvent />} />
                <Route path="/event/edit/:id" element={<EditEvent />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/review-event/:id" element={<ReviewEvent />} />
                <Route path="/recent-events" element={<RecentEvents />} />
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/event/register/:eventId" element={<EventRegistrationPage />}/>
                <Route path="/event/:id" element={<EventDetail />} />

            </Routes>
            
        </Router>
    );
}

export default App;
