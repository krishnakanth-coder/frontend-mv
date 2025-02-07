// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-radius: 50%;
          border-top: 6px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
