import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/user/', {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    /* try {
      const response = await fetch('http://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for session-based authentication
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null); // Clear user state
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout Error:', error);
    } */
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  return (
    <div className="container mx-auto p-6 text-white">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Account</h1>
        {token ? (
          <div className="relative group">
            <img
              src="https://via.placeholder.com/40" // Replace with the user's profile image URL
              alt="Account"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
              <div className="p-4">
                <p className="text-gray-800">{user.username}</p>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Login
          </button>
        )}
      </div> */}

      <ul className="mt-4 space-y-2">
        <li><Link to="/account/profile" className="text-purple-400 hover:underline">Profile</Link></li>
        <li><Link to="/account/my-bookings" className="text-purple-400 hover:underline">My Bookings</Link></li>
        <li><Link to="/account/settings" className="text-purple-400 hover:underline">Settings</Link></li>
        <li><Link to="/account/reviews" className="text-purple-400 hover:underline">My Reviews</Link></li>
        <li><Link to="/account/security" className="text-purple-400 hover:underline">Security & Privacy</Link></li>
      </ul>
    </div>
  );
};

export default Account;

