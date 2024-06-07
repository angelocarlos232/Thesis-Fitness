import React, { useState } from "react";
import "./Dashboard.css";
import { useEffect } from "react";
import DashRoutine from "./DashRoutine";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const mealsData = "4/6 meals done";
  const sleepData = "5hrs sleep";
  const { userId } = useParams();
  const [heightWeight, setHeightWeight] = useState(null);


  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const startButton = () => {
    window.location.href = "http://localhost:3000/start/" + userId;
  };

  const workoutItems = currentUser.workout

  const getHeightWeight = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/getHeightWeight');
      setHeightWeight(response.data);
    } catch (error) {
      console.error('Error fetching height and weight:', error);
    }
  };

  return (
    <div className="mx-3 my-3">
      <div>
        <div className="minor-details">
          <div className="column">
            <div className="ml-3">
              <h2 className="font-bold">Exercises today:</h2>
              <p className="">{sleepData}</p>
            </div>
          </div>
          <div className="column">
            <div className="ml-3">
              <h2 className="font-bold">Meals:</h2>
              <p>{mealsData}</p>
            </div>
          </div>
          <div className="column">
            <div>
      <button className="bg-red-600 rounded-2xl text-sm mr-3 px-2 py-1" onClick={getHeightWeight}>Get Height and Weight</button>
      {heightWeight && (
        <div className="popup">
          <h2>Height and Weight</h2>
          <p>{heightWeight}</p>
        </div>
      )}
    </div>
          </div>
          <div className="column-button ml-3">
            {!workoutItems ? <><button onClick={startButton}>START</button></> : <></>}
          </div>
        </div>

        <div>
          <DashRoutine />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
