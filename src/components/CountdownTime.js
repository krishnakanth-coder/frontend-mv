import React, { useState, useEffect, useMemo } from 'react';

// Function to calculate the remaining time
const calculateTimeLeft = (targetDateTime) => {
  const now = new Date();
  const targetDate = new Date(targetDateTime);
  const difference = targetDate - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

// List of colors to cycle through
const colorCycle = {
  days: ['bg-indigo-300', 'bg-purple-300', 'bg-green-300', 'bg-red-300'],
  hours: ['bg-teal-300', 'bg-blue-300', 'bg-yellow-300', 'bg-orange-300'],
  minutes: ['bg-orange-300', 'bg-pink-300', 'bg-gray-300', 'bg-lime-300'],
  seconds: ['bg-pink-300', 'bg-cyan-300', 'bg-fuchsia-300', 'bg-emerald-300'],
};

const CountdownTimer = ({ upcomingEvent }) => {
  const { marriageDate, marriageTime, brideName, groomName } = upcomingEvent;

  const targetDateTime = useMemo(
    () => `${marriageDate}T${marriageTime}`,
    [marriageDate, marriageTime],
  );

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDateTime));

  const [state, setState] = useState({
    colors: {
      days: colorCycle.days[3],
      hours: colorCycle.hours[1],
      minutes: colorCycle.minutes[0],
      seconds: colorCycle.seconds[3],
    },
    bounce: {
      days: false,
      hours: false,
      minutes: false,
      seconds: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTimeLeft = calculateTimeLeft(targetDateTime);
        const newState = { ...state };

        // Check for changes and update colors and bounce states
        Object.keys(newTimeLeft).forEach((key) => {
          if (newTimeLeft[key] !== prevTime[key]) {
            // Trigger bounce effect
            newState.bounce[key] = true;

            // Cycle through the next color in the color array
            const colorIndex = colorCycle[key].indexOf(newState.colors[key]);
            newState.colors[key] = colorCycle[key][(colorIndex + 1) % colorCycle[key].length];
          } else {
            newState.bounce[key] = false; // Reset bounce if no change
          }
        });

        // Reset bounce after a short delay
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            bounce: { days: false, hours: false, minutes: false, seconds: false },
          }));
        }, 300); // Duration of the bounce effect

        setState(newState); // Update state
        return newTimeLeft; // Return new time left for the next render
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDateTime, state]);

  const renderTimeBlock = (label, value, colorKey) => {
    // {renderTimeBlock('Seconds', timeLeft.seconds, 'seconds')}

    return (
      <div className="flex flex-col items-center">
        <div
          className={`${
            state.colors[colorKey]
          } border-4 border-${colorKey}-500 h-32 w-32 flex flex-col justify-center items-center transition-transform transform hover:scale-110 duration-300 ease-in-out ${
            state.bounce[colorKey] ? 'animate-bounce rounded-lg' : 'rounded-full'
          }`}
        >
          <p className="text-lg text-gray-600">{label}</p>
          <p className={`text-5xl font-bold text-${colorKey}-700`}>{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-5000 ease-in-out">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center animate-pulse">
        {`${brideName} Weds ${groomName}`}
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-6 items-center">
        {renderTimeBlock('Days', timeLeft.days, 'days')}
        {renderTimeBlock('Hours', timeLeft.hours, 'hours')}
        {renderTimeBlock('Minutes', timeLeft.minutes, 'minutes')}
        {renderTimeBlock('Seconds', timeLeft.seconds, 'seconds')}
      </div>
    </div>
  );
};

export default CountdownTimer;
