import React, { useRef, useEffect, useState } from 'react';

const HomeProleCarouser = () => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Sample data for cards
  const profiles = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Chris Johnson',
      role: 'UX Designer',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Sara Williams',
      role: 'DevOps Engineer',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        scrollRight(); // Auto scroll right if not hovered
      }
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isHovered]);

  return (
    <div
      className="mt-3 lg:mt-0 relative w-full py-10 bg-gradient-to-r from-blue-500 to-indigo-600"
      style={{ maxHeight: '300px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h6 className="text-center text-white  font-bold ">Meet Our Team</h6>

      {/* Previous Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
      >
        &lt;
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto py-4 px-6 snap-x scroll-smooth transition-all duration-300 ease-in-out"
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white shadow-md rounded-lg p-4 w-56 flex-shrink-0 snap-center hover:scale-105 transform transition duration-300 ease-in-out"
            style={{ maxHeight: '250px' }} // Ensure the card fits within 300px container
          >
            <img
              src={profile.image}
              alt={`${profile.name} profile`}
              className="w-16 h-16 rounded-full mx-auto shadow-sm"
            />
            <h3 className="text-lg font-bold text-center mt-2 text-gray-800">{profile.name}</h3>
            <p className="text-gray-500 text-center text-sm">{profile.role}</p>
            <div className="mt-2 flex justify-center">
              <button className="bg-blue-500 text-white text-sm py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default HomeProleCarouser;
