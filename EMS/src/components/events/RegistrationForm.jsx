import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
// toast.configure();

const RegistrationForm = ({ eventId, onSuccess }) => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");  
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");  // Reset message on new submission

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("⚠️ Authentication required! Please log in.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const userId = localStorage.getItem("userId");
      console.log("userId--->",userId);

      const response = await fetch("http://localhost:7000/api/v1/event/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          eventId,
          userId,
          ...userData, // Includes name, email, phone
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data.data);
      // ✅ Use backend message for success/failure
      setMessage(data.data.message);
      setMessageType(data.data.success ? "success" : "error");

      if (data.data.success) {
        setTimeout(() => {
          navigate("/my-bookings"); // ✅ Redirect after success
        }, 1500); // Wait 1.5s before navigating
      }

    } catch (error) {
      setMessage("❌ Server error. Please try again later.");
      setMessageType("error");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register for Event</h2>

      {/* ✅ Display message alert */}
      {message && (
        <div className={`p-2 mb-4 text-white ${messageType === "success" ? "bg-green-500" : "bg-red-500"} rounded`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={userData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={userData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  );
};

export default RegistrationForm;
