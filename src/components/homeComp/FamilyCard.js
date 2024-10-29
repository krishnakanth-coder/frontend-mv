import React from 'react';
import gMap from '../../assets/map.jpeg';
import '../../App.css';

const FamilyCard = () => {
  return (
    <div className="mt-8 bg-white lg:mt-0 w-full h-[40vh] lg:h-[36.5vh] rounded-lg shadow-lg flex overflow-hidden transition-transform transform hover:scale-105">
      {/* Event organization section */}
      <div className="w-[60%] bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 rounded-l-lg text-white">
        <h1 className="text-3xl font-bold mb-4">Invitations By</h1>
        <ul className="space-y-2 text-lg">
          <li>Family Name 1</li>
          <li>Family Name 2</li>
          <li>Family Name 3</li>
          <li>Family Name 4</li>
        </ul>
      </div>

      {/* Place and Date section */}
      <div className="w-[40%] flex flex-col bg-gray-800 text-white rounded-r-lg">
        {/* Map Section */}
        <div className="relative flex-grow rounded-tr-lg">
          <img className="w-full h-full object-cover rounded-tr-lg" src={gMap} alt="Google map" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xl font-bold bg-black bg-opacity-40">
            <p className="leading-relaxed text-center">
              xyz Function Hall <br /> CKB Layout <br /> E-City <br /> Bangalore
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
              View Map
            </button>
          </div>
        </div>

        {/* Date Section */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold">Date: 01/01/2025</h1>
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
