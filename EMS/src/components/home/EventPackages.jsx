import React from "react";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      title: "Basic Package",
      price: "$499",
      features: ["Venue Selection", "Basic Decoration", "Catering for 50 guests"],
      bgColor: "bg-blue-500",
    },
    {
      title: "Premium Package",
      price: "$999",
      features: ["Customized Decoration", "Photography", "Catering for 100 guests"],
      bgColor: "bg-purple-500",
    },
    {
      title: "Luxury Package",
      price: "$1999",
      features: ["Luxury Venue", "Live Music", "Catering for 200 guests"],
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Package className="w-10 h-10 text-purple-400" />
          <h1 className="text-3xl font-bold">Event Packages</h1>
        </div>

        <p className="text-gray-400 mb-8">
          Choose from our specially designed event packages that suit your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 shadow-lg ${pkg.bgColor} text-gray-900`}
            >
              <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
              <p className="text-lg font-bold">{pkg.price}</p>
              <ul className="mt-4 mb-4 space-y-2">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="text-gray-100">• {feature}</li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/book-package")}
                className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPackages;
