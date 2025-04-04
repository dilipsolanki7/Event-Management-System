// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EventRegistrationPage = () => {
//   const { eventId } = useParams(); // Get event ID from URL
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required! Please log in.");
//       }
//       const userId = localStorage.getItem("userId");

//       const response = await fetch("http://localhost:7000/api/v1/event/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ 
//           eventId, 
//           userId, 
//           name: userData.name, 
//           email: userData.email, 
//           phone: userData.phone 
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Registration failed");
//       }

//       alert("Registration successful!");
//       navigate(`/event/${eventId}`); // Redirect to event page
//     } catch (error) {
//       alert(`⚠️ ${error.message}`);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Register for Event</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter your name"
//           value={userData.name}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={userData.email}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Enter your phone number"
//           value={userData.phone}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EventRegistrationPage;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm"

const EventRegistrationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // const handleSuccess = () => {
  //   navigate(`/`); // Redirect to event page after successful registration
  // };

  return (
    <div>
      <RegistrationForm eventId={eventId} /* onSuccess={handleSuccess} */ />
    </div>
  );
};

export default EventRegistrationPage;
