import React, { useState, useEffect } from 'react';
import image1 from '../assets/img1.jpeg';
import image2 from '../assets/img2.jpeg';
import image3 from '../assets/im3.jpeg';
import image4 from '../assets/img4.jpeg';

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative mb-2  w-full h-[50vh] lg:h-[70vh] overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Card ${index + 1}`}
              className="w-full h-full bg-cover object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
