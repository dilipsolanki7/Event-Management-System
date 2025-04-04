
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronDown, Calendar, Package, Star } from 'lucide-react';

// const MenuItem = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className="relative group"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <button className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-white">
//         <span>{title}</span>
//         {children && <ChevronDown size={16} className={`transform ${isOpen ? 'rotate-180' : ''}`} />}
//       </button>

//       {children && isOpen && (
//         <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const SubMenuItem = ({ to, children }) => (
//   <Link to={to} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
//     {children}
//   </Link>
// );

// export const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-900">
//       <header className="bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             {/* Home Menu */}
//             <MenuItem title="Home">
//               <SubMenuItem to="/popular-events">Popular Events</SubMenuItem>
//               <SubMenuItem to="/discount-offers">Discount & Offers</SubMenuItem>
//               <SubMenuItem to="/packages">Packages</SubMenuItem>
//               <SubMenuItem to="/recent-events">Recent Events</SubMenuItem>
//               <SubMenuItem to="/trading-events">Trading Events</SubMenuItem>
//               <SubMenuItem to="/specialized-vendors">Specialized Vendors</SubMenuItem>
//             </MenuItem>

//             {/* Our Services Menu */}
//             <MenuItem title="Our Services">
//               <SubMenuItem to="/decoration">Decoration</SubMenuItem>
//               <SubMenuItem to="/food-catering">Food & Catering</SubMenuItem>
//               <SubMenuItem to="/cinematography">Cinematography</SubMenuItem>
//               <SubMenuItem to="/makeover">Makeover</SubMenuItem>
//               <SubMenuItem to="/venues">Venues</SubMenuItem>
//             </MenuItem>

//             {/* Event Menu */}
//             <MenuItem title="Event">
//               <SubMenuItem to="/corporate-events">Corporate Events</SubMenuItem>
//               <SubMenuItem to="/social-events">Social Events</SubMenuItem>
//               <SubMenuItem to="/cultural-events">Cultural Events</SubMenuItem>
//               <SubMenuItem to="/upcoming-events">Upcoming Events</SubMenuItem>
//               <SubMenuItem to="/create-event">Create Event</SubMenuItem>
//             </MenuItem>

//             {/* Gallery Menu */}
//             <MenuItem title="Gallery">
//               <SubMenuItem to="/images">Images</SubMenuItem>
//               <SubMenuItem to="/videos">Videos</SubMenuItem>
//               <SubMenuItem to="/blogs">Blogs</SubMenuItem>
//               <SubMenuItem to="/client-reviews">Client Reviews</SubMenuItem>
//               <SubMenuItem to="/favorites">Favorites</SubMenuItem>
//             </MenuItem>

//             {/* About Menu */}
//             <MenuItem title="About">
//               <SubMenuItem to="/why-choose-us">Why Choose Us</SubMenuItem>
//               <SubMenuItem to="/prev-clients">Previous Clients</SubMenuItem>
//               <SubMenuItem to="/our-team">Our Team</SubMenuItem>
//               <SubMenuItem to="/our-policies">Our Policies</SubMenuItem>
//             </MenuItem>

//             {/* Contact Us Menu */}
//             <MenuItem title="Contact Us">
//               <SubMenuItem to="/help-support">Help & Support</SubMenuItem>
//               <SubMenuItem to="/private-chat">Private Chat</SubMenuItem>
//               <SubMenuItem to="/mail">Mail</SubMenuItem>
//               <SubMenuItem to="/social-media">Social Media</SubMenuItem>
//             </MenuItem>
//           </div>
//         </div>
//       </header>

//       {/* Featured Section */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <FeaturedCard
//             icon={<Calendar className="w-8 h-8 text-purple-500" />}
//             title="Upcoming Events"
//             description="Discover and book tickets for the hottest upcoming events in your area."
//           />
//           <FeaturedCard
//             icon={<Package className="w-8 h-8 text-purple-500" />}
//             title="Event Packages"
//             description="Explore our comprehensive event planning packages for any occasion."
//           />
//           <FeaturedCard
//             icon={<Star className="w-8 h-8 text-purple-500" />}
//             title="Featured Services"
//             description="Premium services from our trusted and verified vendors."
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// const FeaturedCard = ({ icon, title, description }) => (
//   <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition duration-300">
//     <div className="flex items-center space-x-4 mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold text-white">{title}</h3>
//     </div>
//     <p className="text-gray-400">{description}</p>
//     <button className="mt-4 text-purple-500 hover:text-purple-400">Learn more →</button>
//   </div>
// );

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronDown, Calendar, Package, Star } from 'lucide-react';

// const MenuItem = ({ title, children }) => {
//   return (
//     <div className="relative group">
//       {/* Menu Button */}
//       <button className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-white">
//         <span>{title}</span>
//         {children && <ChevronDown size={16} />}
//       </button>

//       {/* Submenu (Fixed disappearing issue) */}
//       {children && (
//         <div className="absolute left-0 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block transition duration-200 z-10">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const SubMenuItem = ({ to, children }) => (
//   <Link to={to} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
//     {children}
//   </Link>
// );

// export const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-900">
//       <header className="bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             {/* Home Menu */}
//             <MenuItem title="Home">
//               <SubMenuItem to="/popular-events">Popular Events</SubMenuItem>
//               <SubMenuItem to="/discount-offers">Discount & Offers</SubMenuItem>
//               <SubMenuItem to="/packages">Packages</SubMenuItem>
//               <SubMenuItem to="/recent-events">Recent Events</SubMenuItem>
//               <SubMenuItem to="/trading-events">Trading Events</SubMenuItem>
//               <SubMenuItem to="/specialized-vendors">Specialized Vendors</SubMenuItem>
//             </MenuItem>

//             {/* Our Services Menu */}
//             <MenuItem title="Our Services">
//               <SubMenuItem to="/decoration">Decoration</SubMenuItem>
//               <SubMenuItem to="/food-catering">Food & Catering</SubMenuItem>
//               <SubMenuItem to="/cinematography">Cinematography</SubMenuItem>
//               <SubMenuItem to="/makeover">Makeover</SubMenuItem>
//               <SubMenuItem to="/venues">Venues</SubMenuItem>
//             </MenuItem>

//             {/* Event Menu */}
//             <MenuItem title="Event">
//               <SubMenuItem to="/corporate-events">Corporate Events</SubMenuItem>
//               <SubMenuItem to="/social-events">Social Events</SubMenuItem>
//               <SubMenuItem to="/cultural-events">Cultural Events</SubMenuItem>
//               <SubMenuItem to="/upcoming-events">Upcoming Events</SubMenuItem>
//               <SubMenuItem to="/create-event">Create Event</SubMenuItem>
//             </MenuItem>

//             {/* Gallery Menu */}
//             <MenuItem title="Gallery">
//               <SubMenuItem to="/images">Images</SubMenuItem>
//               <SubMenuItem to="/videos">Videos</SubMenuItem>
//               <SubMenuItem to="/blogs">Blogs</SubMenuItem>
//               <SubMenuItem to="/client-reviews">Client Reviews</SubMenuItem>
//               <SubMenuItem to="/favorites">Favorites</SubMenuItem>
//             </MenuItem>

//             {/* About Menu */}
//             <MenuItem title="About">
//               <SubMenuItem to="/why-choose-us">Why Choose Us</SubMenuItem>
//               <SubMenuItem to="/prev-clients">Previous Clients</SubMenuItem>
//               <SubMenuItem to="/our-team">Our Team</SubMenuItem>
//               <SubMenuItem to="/our-policies">Our Policies</SubMenuItem>
//             </MenuItem>

//             {/* Contact Us Menu */}
//             <MenuItem title="Contact Us">
//               <SubMenuItem to="/help-support">Help & Support</SubMenuItem>
//               <SubMenuItem to="/private-chat">Private Chat</SubMenuItem>
//               <SubMenuItem to="/mail">Mail</SubMenuItem>
//               <SubMenuItem to="/social-media">Social Media</SubMenuItem>
//             </MenuItem>
//           </div>
//         </div>
//       </header>

//       {/* Featured Section */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <FeaturedCard
//             icon={<Calendar className="w-8 h-8 text-purple-500" />}
//             title="Upcoming Events"
//             description="Discover and book tickets for the hottest upcoming events in your area."
//           />
//           <FeaturedCard
//             icon={<Package className="w-8 h-8 text-purple-500" />}
//             title="Event Packages"
//             description="Explore our comprehensive event planning packages for any occasion."
//           />
//           <FeaturedCard
//             icon={<Star className="w-8 h-8 text-purple-500" />}
//             title="Featured Services"
//             description="Premium services from our trusted and verified vendors."
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// const FeaturedCard = ({ icon, title, description }) => (
//   <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition duration-300">
//     <div className="flex items-center space-x-4 mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold text-white">{title}</h3>
//     </div>
//     <p className="text-gray-400">{description}</p>
//     <button className="mt-4 text-purple-500 hover:text-purple-400">Learn more →</button>
//   </div>
// );



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Calendar, Package, Star, Settings } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // adjust path as needed
const isLoggedIn = !!localStorage.getItem('userId'); // Check if a user is logged in
const isAdmin = localStorage.getItem('isAdmin') === 'true';

const handleAdminLogin = () => {
  if (isAdmin) {
    navigate('/admin');
  } else {
    navigate('/admin/login');
  }
};

const MenuItem = ({ title, children }) => {
  return (
    <div className="relative group">
      {/* Menu Button */}
      <button className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-white">
        <span>{title}</span>
        {children && <ChevronDown size={16} />}
      </button>

      {/* Submenu (Fixed disappearing issue) */}
      {children && (
        <div className="absolute left-0 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block transition duration-200 z-10">
          {children}
        </div>
      )}
    </div>
  );
};

const SubMenuItem = ({ to, children }) => (
  <Link to={to} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
    {children}
  </Link>
);

export const HomePage = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleAdminLogin = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex space-x-8">
              {/* Home Menu */}
              <MenuItem title="Home">
                <SubMenuItem to="/recent-events">Recent Events</SubMenuItem>
                <SubMenuItem to="/discount-offers">Discount & Offers</SubMenuItem>
                <SubMenuItem to="/packages">Packages</SubMenuItem>
                <SubMenuItem to="/specialized-vendors">Specialized Vendors</SubMenuItem>
                <SubMenuItem to="/CreateEvent">Create Event</SubMenuItem>
              </MenuItem>

              {/* Our Services Menu */}
              <MenuItem title="Our Services">
                <SubMenuItem to="/decoration">Decoration</SubMenuItem>
                <SubMenuItem to="/food-catering">Food & Catering</SubMenuItem>
                <SubMenuItem to="/cinematography">Cinematography</SubMenuItem>
                <SubMenuItem to="/venues">Venues</SubMenuItem>
              </MenuItem>

              {/* Event Menu
              <MenuItem title="Event">
                <SubMenuItem to="/corporate-events">Corporate Events</SubMenuItem>
                <SubMenuItem to="/social-events">Social Events</SubMenuItem>
                <SubMenuItem to="/cultural-events">Cultural Events</SubMenuItem>
                <SubMenuItem to="/upcoming-events">Upcoming Events</SubMenuItem>
                
              </MenuItem> */}

              {/* Gallery Menu */}
              <MenuItem title="Gallery">
                <SubMenuItem to="/images">Images</SubMenuItem>
                <SubMenuItem to="/videos">Videos</SubMenuItem>
                <SubMenuItem to="/blogs">Blogs</SubMenuItem>
                <SubMenuItem to="/client-reviews">Client Reviews</SubMenuItem>
                <SubMenuItem to="/favorites">Favorites</SubMenuItem>
              </MenuItem>

              {/* About Menu */}
              <MenuItem title="About">
                <SubMenuItem to="/why-choose-us">Why Choose Us</SubMenuItem>
                <SubMenuItem to="/prev-clients">Previous Clients</SubMenuItem>
                <SubMenuItem to="/our-team">Our Team</SubMenuItem>
                <SubMenuItem to="/our-policies">Our Policies</SubMenuItem>
              </MenuItem>

              {/* Contact Us Menu */}
              <MenuItem title="Contact Us">
                <SubMenuItem to="/help-support">Help & Support</SubMenuItem>
                <SubMenuItem to="/private-chat">Private Chat</SubMenuItem>
                <SubMenuItem to="/mail">Mail</SubMenuItem>
                <SubMenuItem to="/social-media">Social Media</SubMenuItem>
              </MenuItem>
            </div>

            {/* Admin Button
            <button 
              onClick={handleAdminLogin}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700"
            >
              <Settings size={16} className="mr-2" />
              {isAdmin ? 'Admin Login' : ''}
            </button> */}
            {/* Show Admin Login button only if user is not logged in or is an admin */}
            {(!isLoggedIn || isAdmin) && (
              <button 
                onClick={handleAdminLogin}
                className="flex items-center px-4 py-2 text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700"
              >
                <Settings size={16} className="mr-2" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Admin Banner - Only visible to admin users */}
      {isAdmin && (
        <div className="bg-purple-900 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p>You are logged in as Admin</p>
            <div className="flex space-x-4">
              <Link to="/admin" className="text-white hover:underline">Dashboard</Link>
              <Link to="/admin/users" className="text-white hover:underline">User Management</Link>
              <Link to="/admin/settings" className="text-white hover:underline">Settings</Link>
              <button 
                onClick={() => {
                  signOut(auth).then(() => {
                    localStorage.removeItem('isAdmin');
                    window.location.reload();
                  });
                }}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedCard
            icon={<Calendar className="w-8 h-8 text-purple-500" />}
            title="Upcoming Events"
            description="Discover and book tickets for the hottest upcoming events in your area."
            link="/recent-events"
          />
          <FeaturedCard
            icon={<Package className="w-8 h-8 text-purple-500" />}
            title="Event Packages"
            description="Explore our comprehensive event planning packages for any occasion."
            link="/event-packages"
          />
          <FeaturedCard
            icon={<Star className="w-8 h-8 text-purple-500" />}
            title="Featured Services"
            description="Premium services from our trusted and verified vendors."
            link="/featured-services"
          />
        </div>
      </main>
    </div>
  );
};

const FeaturedCard = ({ icon, title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
      <button 
        onClick={() => navigate(link)} 
        className="mt-4 text-purple-500 hover:text-purple-400"
      >
        Learn more →
      </button>
    </div>
  );
};

export default HomePage;