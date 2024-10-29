import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
  exit: { opacity: 0, y: 20 }, // Define exit animation
};

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger children animations by 0.3 seconds
    },
  },
};

// Card Component with Framer Motion
const EventCard = ({ eachEvn }) => {
  return (
    <motion.div
      key={eachEvn.marriageTime}
      className="bg-white p-6 rounded-lg shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      exit="exit" // Apply exit animation
      transition={{ duration: 0.3, type: 'spring' }}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {eachEvn.brideName} Weds {eachEvn.groomName}
      </h3>
      <p className="text-gray-600 text-sm mb-1">
        <strong>Date:</strong> {eachEvn.marriageDate}
      </p>
      <p className="text-gray-600 text-sm">
        <strong>Time:</strong> {eachEvn.marriageTime}
      </p>
    </motion.div>
  );
};

// Card List Component with Framer Motion
const EventCardList = ({ events }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {events.length === 0 ? (
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg text-gray-600 animate-bounce">No events available.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event) => (
            <EventCard key={event.marriageTime} eachEvn={event} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default EventCardList;
