import React from 'react';

const Modal = ({ show, onClose, data, fetchData }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="full-screen-window p-6 rounded-lg shadow-lg w-80 text-white">
        <h2 className="text-xl font-bold mb-4">Height and Weight</h2>
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <div className="mt-4">
          <button
            className="bg-red-600  text-white font-bold py-2 px-4 rounded mr-2"
            onClick={fetchData}
          >
            Get
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