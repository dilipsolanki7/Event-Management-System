// // src/components/events/EventCard.js
// import React from 'react';
// import RegistrationForm from './RegistrationForm';


// import { Link } from 'react-router-dom';
// import image4 from "../../assets/Holi.jpg";  // Adjust path as needed

// const EventCard = ({ event }) => {
//   const [isRegistering, setIsRegistering] = useState(false);

//   const handleRegister = async () => {
//     setIsRegistering(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required! Please log in.");
//       }
//       const userId = localStorage.getItem('userId');
//       const response = await fetch("http://localhost:7000/api/v1/event/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ eventId: event._id ,userId}),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Registration failed");
//       }

//       alert("🎉 Registration successful!");
//     } catch (error) {
//       alert(`⚠️ ${error.message}`);
//     } finally {
//       setIsRegistering(false);
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img
//         // src={event.photoURL || "https://via.placeholder.com/300"}
//         src= {image4}
//         alt={event.title}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
//         <p className="text-gray-600 mb-4">{event.description}</p>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-sm text-gray-500">
//             {new Date(event.date).toLocaleDateString()} at {event.time}
//           </span>
//           <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
//             {event.registrationFee > 0 ? `$${event.registrationFee}` : "Free"}
//           </span>
//         </div>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-sm text-gray-500">{event.venue}</span>
//           <span className="text-sm text-gray-500">
//             Slots: {event.maxSlots}
//           </span>
//         </div>
//         <div className="flex justify-between items-center">
//           <Link
//             to={`/event/${event._id}`}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             View Details
//           </Link>
//           {/* <button
//             onClick={handleRegister}
//             disabled={isRegistering}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ml-2"
//           >
//             {isRegistering ? 'Registering...' : 'Register'}
//           </button> */}
//           <RegistrationForm event={event} />


//         </div>

//       </div>
//     </div>
//   );
// };

// export default EventCard;

// src/components/events/EventCard.js
import React from 'react';
import RegistrationForm from './EventRegistrationPage';
import { Link } from 'react-router-dom';
import image4 from "../../assets/back.webp";  // Adjust path as needed

//const isOwner = userId && userId === event.createdBy;

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image4}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </span>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {event.registrationFee > 0 ? `$${event.registrationFee}` : "Free"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{event.venue}</span>
          <span className="text-sm text-gray-500">
            Slots: {event.maxSlots}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/event/${event._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          {/* <RegistrationForm event={event} /> */}
          <Link to={`/event/register/${event._id}`} className="bg-green-600 text-white px-4 py-2 rounded-md">
            Register
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default EventCard;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import image4 from "../../assets/Holi.jpg";

// const EventCard = ({ event }) => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // Fetch user ID from localStorage
//     const storedUser = localStorage.getItem("userId");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUserId(parsedUser.userId);
//     }
//   }, []);

//   const isOwner = userId && userId === event.createdBy;

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;

//     try {
//       const token = JSON.parse(localStorage.getItem("userId"))?.token;
//       const response = await fetch(`/api/events/${event._id}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": {token}
//         }
//       });

//       if (response.ok) {
//         alert("Event deleted successfully");
//         window.location.reload();
//       } else {
//         alert("Failed to delete event");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("Error occurred while deleting event");
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img src={image4} alt={event.title} className="w-full h-48 object-cover" />
//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
//         <p className="text-gray-600 mb-4">{event.description}</p>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
//           <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
//             {event.registrationFee > 0 ? `$${event.registrationFee}` : "Free"}
//           </span>
//         </div>
//         <div className="flex justify-between items-center">
//           <Link to={`/event/${event._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md">View Details</Link>
//           {isOwner && (
//             <>
//               <Link to={`/event/edit/${event._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</Link>
//               <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
