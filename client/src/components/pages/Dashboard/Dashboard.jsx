// Dashboard.js
import React, { useState } from "react";
import "./Dashboard.css";
import DashRoutine from "./DashRoutine";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Modal from './Modal';

const Dashboard = () => {
  const mealsData = "4/6 meals done";
  const sleepData = "5hrs sleep";
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [data, setData] = useState({ height: '', weight: '' });
  const [showModal, setShowModal] = useState(false);

  const startButton = () => {
    window.location.href = "http://localhost:3000/start/" + userId;
  };

  const fetchData = async () => {
    const documentId = '2024061014';
    try {
      const docRef = doc(db, 'Sensors', documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const workoutItems = currentUser.workout;

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
            <button
              className="bg-red-700 rounded-2xl text-sm mr-3 px-2 py-1"
              onClick={openModal}
            >
              Get Height and Weight
            </button>
          </div>
          <div className="column-button ml-3">
            {!workoutItems ? (
              <>
                <button onClick={startButton}>START</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
          <DashRoutine />
        </div>
      </div>
      <Modal show={showModal} onClose={closeModal} data={data} fetchData={fetchData} />
    </div>
  );
};

export default Dashboard;
