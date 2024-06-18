import React, { useState, useEffect } from 'react';

const Modal = ({ show, onClose, data, fetchData }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [heightInDecimal, setHeightInDecimal] = useState(null);
  const [weightInDecimal, setWeightInDecimal] = useState(null);

  useEffect(() => {
    if (data.height && data.weight) {
      setHeightInDecimal(parseInt(data.height, 2));
      setWeightInDecimal(parseInt(data.weight, 2));
    }
  }, [data]);

  const weightFormatted = weightInDecimal + " kg"
  const heightFormatted = heightInDecimal + " cm"

  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Cleanup function to clear interval when component unmounts
    };
  }, [intervalId]);

  const startFetchingData = () => {
    setIsLoading(true); // Set loading state to true
    const id = setInterval(() => {
      fetchData();
      setIsLoading(true); // Set loading state to true on every fetch attempt
    }, 3000);
    setIntervalId(id); // Save interval ID to state
  };

  const stopFetchingData = () => {
    setIsLoading(false); // Set loading state to false
    clearInterval(intervalId); // Clear the interval
  };

  const handleButtonClick = () => {
    if (isLoading) {
      stopFetchingData();
    } else {
      startFetchingData();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="full-screen-window p-6 rounded-lg shadow-lg w-80 text-white">
        <h2 className="text-xl font-bold mb-4">Height and Weight</h2>
        <p>Height: {heightFormatted}</p>
        <p>Weight: {weightFormatted}</p>
        <div className="mt-4">
          <button
            className={`bg-${isLoading ? 'yellow' : 'red'}-600  text-white font-bold py-2 px-4 rounded mr-2 relative`}
            onClick={handleButtonClick}
          >
            {isLoading ? 'Stop' : 'Get'}
          </button>
          <button
            className="bg-gray-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
