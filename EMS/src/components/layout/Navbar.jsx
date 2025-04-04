// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Search, User, Bell, Mail, LogOut } from 'lucide-react';

// const AccountDropdown = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);}

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
// };

// export const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   /* useEffect(() => {
//     // Logic to check user authentication state
//     const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUser(decodedToken); // Set user state with decoded token
//       } catch (error) {
//         console.error('Invalid token:', error);
//       }
//     }
//   }, []); */
//   const token = localStorage.getItem('token');
//   const handleLogout = async () => {
//     try {
//       // Implement logout logic here
//       localStorage.removeItem('token'); // Remove token from local storage
//       setUser(null); // Immediately update state
//       navigate('/'); // Redirect to login page
//     } catch (error) {
//       console.error('Logout Error:', error);
//     }
//   };

//   return (
//     <nav className="bg-gray-900 border-b border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold text-purple-500">EMS</Link>
//           </div>
          
//           <div className="flex-1 max-w-xl mx-12">
//             <div className="relative">
//               <input
//                 type="search"
//                 placeholder="Search events..."
//                 className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {!token ? (
//               <div className="flex space-x-4">
//                 <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">Log in</Link>
//                 <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign up</Link>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Bell className="text-gray-400 cursor-pointer hover:text-white" size={20} />
//                 <Mail className="text-gray-400 cursor-pointer hover:text-white" size={20} />
//                 {/* <Link to="/account" className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
//                     <User size={18} />
//                   </div>
//                 </Link> */}
//                 <button onClick={toggleDropdown} className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
//                     <User size={18} className="text-white" />
//                   </div>
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
//                     <div className="p-4">
//                       <Link
//                         to="/account"
//                         className="block text-gray-800 hover:bg-gray-200 p-2 rounded"
//                       >
//                         Profile
//                       </Link>
//                       <Link
//                         to="/account/my-bookings"
//                         className="block text-gray-800 hover:bg-gray-200 p-2 rounded"
//                       >
//                         My Bookings
//                       </Link>
//                       <Link
//                         to="/account/settings"
//                         className="block text-gray-800 hover:bg-gray-200 p-2 rounded"
//                       >
//                         Settings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="block text-gray-800 hover:bg-gray-200 p-2 rounded w-full text-left"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 <button onClick={handleLogout} className="text-gray-300 hover:text-red-500">
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Bell, Mail, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Move state here
  const dropdownRef = useRef(null); // Reference for dropdown
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('userId'); // Remove token from local storage
      setUser(null); // Immediately update state
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Fetch search results with debouncing
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchKey.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await fetch(`http://localhost:7000/api/v1/event?key=${searchKey}&limit=5`);
        const data = await res.json();
        console.log(data.data);
        setSearchResults(data.data || []);
        setSearchOpen(true);
      } catch (error) {
        console.error("Search Error:", error);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounce);
  }, [searchKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-purple-500">EMS</Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-12 relative" ref={searchRef}>
            <div className="relative">
              <input
                type="search"
                placeholder="Search events..."
                className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Search Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute w-full bg-white rounded-lg shadow-lg mt-1 z-20 border border-gray-200">
                <ul>
                  {searchResults.map((event) => (
                    <li
                      key={event._id}
                      className="px-6 py-2 text-black-800 hover:bg-purple-100 transition duration-300 cursor-pointer"
                      onClick={() => {
                        navigate(`/event/${event._id}`);
                        setSearchOpen(false);
                      }}
                    >
                      {event.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>


          <div className="flex items-center space-x-4">
            {!token ? (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">Log in</Link>
                <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign up</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Bell className="text-gray-400 cursor-pointer hover:text-white" size={20} />
                <Mail className="text-gray-400 cursor-pointer hover:text-white" size={20} />

                {/* Account Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen) }
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center transition-transform hover:scale-105">
                      <User size={18} className="text-white" />
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
                      <div className="py-2">
                        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition duration-300">
                          Profile
                        </Link>
                        <Link to="/my-bookings" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition duration-300">
                          My Bookings
                        </Link>
                        <Link to="/reviews" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition duration-300">
                          My Reviews
                        </Link>
                        <Link to="/my-events" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition duration-300">
                          My Events
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition duration-300">
                          Settings
                        </Link>
                        <div className="border-t border-gray-200"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button onClick={handleLogout} className="text-gray-300 hover:text-red-500">
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
