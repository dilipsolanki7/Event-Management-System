import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import catering from '../../assets/catering.jpeg'
import venue from '../../assets/venue.jpg'
import photography from '../../assets/photography.jpeg'
import decoration from '../../assets/decoration.jpg'

const services = [
  { id: 1, name: 'Luxury Catering', description: 'Premium food and beverages from top chefs.', image: catering },
  { id: 2, name: 'Exclusive Venues', description: 'Handpicked luxurious venues for your event.', image: venue },
  { id: 3, name: 'Professional Photography', description: 'Capture every moment with expert photographers.', image: photography },
  { id: 4, name: 'Event Decoration', description: 'Stunning décor tailored to your theme.', image: decoration }
];

const FeaturedServices = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
          <Star className="w-8 h-8 text-purple-500 mr-2" /> Featured Services
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Premium services from our trusted and verified vendors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <Link to="/book-service" className="text-purple-500 hover:text-purple-400">
                  Book Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;