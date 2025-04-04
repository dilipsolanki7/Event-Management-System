import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { GoogleAuthProvider } from 'firebase/auth'; // Add missing import

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:7000/api/v1/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            })
        });

        /* if (!response.ok) {
            throw new Error('Registration failed');
        } */

        const data = await response.json();
        console.log(data.data);
        if (!data.data.success) {
          throw new Error(data.data.message);
        }
        setSuccessMessage("User registered successfully! Redirecting...");
        //setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 sec
        const token = data?.data?.user?.loginToken?.[0]?._id;
        const userId = data?.data?.user?._id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token); // Store token in localStorage
    
        if (token) {
          console.log("Token saved to localStorage:", token);
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        }

    } catch (error) {
        console.error('Registration Error:', error);
        setError(error.message);
    }
  };

  // const handleGoogleSignup = async () => {
  //   try {
  //     console.log("Signing up with Google...");
  //     const result = await signInWithPopup(auth, provider);

  //     await setDoc(doc(db, 'users', result.user.uid), {
  //       name: result.user.displayName || "",
  //       email: result.user.email,
  //       phone: result.user.phoneNumber || "",
  //       createdAt: new Date().toISOString(),
  //     });

  //     console.log("Google Signup Success:", result.user);
  //     navigate('/', { replace: true });
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Google Signup Error:', error);
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-2 rounded">{successMessage}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="w-full p-2 rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email Address" className="w-full p-2 rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="text" placeholder="Phone Number" className="w-full p-2 rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input type="password" placeholder="Enter Password" className="w-full p-2 rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password" className="w-full p-2 rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

          <button type="submit" className="w-full p-2 bg-purple-500 rounded text-white hover:bg-purple-600">Sign Up</button>
        </form>

        {/* <button onClick={handleGoogleSignup} className="w-full mt-2 p-2 bg-blue-500 rounded text-white hover:bg-blue-600">
          Continue with Google
        </button> */}

        <p className="text-gray-400 text-center">
          Already have an account? <a href="/login" className="text-purple-400">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
