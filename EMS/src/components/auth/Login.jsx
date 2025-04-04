import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess('');

    try {
      const response = await fetch('http://localhost:7000/api/v1/user/login', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Server responded with an error (e.g., 400 Bad Request)
        throw new Error(data.message || 'Login failed');
      }
  
      const token = data?.data?.token;
      const userId = data?.data?.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token); // Store token in localStorage
  
      if (token) {
        console.log("Token saved to localStorage:", token);
        console.log("Login Successful!");
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
  
    } catch (err) {
      console.error('Login Error:', err.message);
      setError(err.message); // Display error message in UI
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Log In</h2>
        {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
        {success && <div className="bg-green-500 text-white p-2 rounded">{success}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-2 rounded bg-gray-700 text-white" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter Password" 
            className="w-full p-2 rounded bg-gray-700 text-white" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            className="w-full p-2 bg-purple-500 rounded text-white hover:bg-purple-600"
          >
            Log In
          </button>
        </form>
        <a href="/forgot-password" className="text-blue-400 text-center block mt-2">Forgot Password?</a>
        <p className="text-gray-400 text-center">
          Don't have an account? <a href="/register" className="text-purple-400">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
