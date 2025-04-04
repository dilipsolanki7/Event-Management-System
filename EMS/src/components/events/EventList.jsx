// import React from 'react';
// import EventCard from './EventCard';

// // Dummy event data (replace with API or database fetch)
// const events = [
//   {
//     id: 1,
//     title: 'Tech Conference 2025',
//     date: '2025-03-15',
//     location: 'New York, NY',
//     description: 'Join industry leaders to discuss the future of technology.',
//   },
//   {
//     id: 2,
//     title: 'Music Festival',
//     date: '2025-04-20',
//     location: 'Los Angeles, CA',
//     description: 'A weekend full of live music performances.',
//   },
//   {
//     id: 3,
//     title: 'Startup Meetup',
//     date: '2025-05-05',
//     location: 'San Francisco, CA',
//     description: 'Connect with entrepreneurs and investors.',
//   },
// ];

// const EventList = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {events.map((event) => (
//           <EventCard key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventList;
// components/events/EventList.jsx
import React from 'react';
import { Plus, Mail } from 'lucide-react';

export const EventList = () => {
  const events = [
    {
      id: '#536994',
      name: 'Imagine Dragons Concert',
      date: '30/09/2023',
      time: '07:00 AM',
      venue: 'Baku Olympic Stadium',
      tickets: 50
    },
    // Add more events as needed
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">12,345 Events</h1>
          <select className="bg-gray-900 rounded-lg px-3 py-2">
            <option>All Events</option>
          </select>
          <select className="bg-gray-900 rounded-lg px-3 py-2">
            <option>Sort by</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={20} className="mr-2" />
            Create New Event
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Mail size={20} className="mr-2" />
            Send email
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="px-6 py-3 text-left">Event ID</th>
              <th className="px-6 py-3 text-left">Event name</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Venue</th>
              <th className="px-6 py-3 text-left">Tickets</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-800">
                <td className="px-6 py-4 text-gray-300">{event.id}</td>
                <td className="px-6 py-4 text-white">{event.name}</td>
                <td className="px-6 py-4 text-gray-300">{event.date}</td>
                <td className="px-6 py-4 text-gray-300">{event.time}</td>
                <td className="px-6 py-4 text-gray-300">{event.venue}</td>
                <td className="px-6 py-4">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${event.tickets}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
