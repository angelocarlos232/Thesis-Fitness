import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from 'react-hot-toast'

const AddCaloriesModal = ({ isModalOpen, handleCloseModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calories, setCalories] = useState("");

  const handleSaveCalories = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/users/addcalories", {
        userId: currentUser.id,
        date: selectedDate,
        calories: parseInt(calories),
      });
      
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving calories:", error);
      alert("Error saving calories");
    }
  };

  return (
    isModalOpen && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="modal-window p-6 bg-white rounded-md w-1/3">
          <h2 className="text-xl font-bold mb-4">Add Calories</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full p-2 border rounded-md"
              dateFormat="yyyy/MM/dd"
              maxDate={new Date()}
              minDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Add calories for today:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSaveCalories}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleCloseModal}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddCaloriesModal;
