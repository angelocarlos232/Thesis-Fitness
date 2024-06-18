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
import RecommendedFoodsModal from "./RecommendedFoodsModal";

const Dashboard = () => {
  const mealsData = "4/6 meals done";
  const sleepData = "5hrs sleep";
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const weeklyProgress = useSelector((state) => {
    const progress = state.user.weeklyProgress;
    return progress !== undefined ? progress.toFixed(2) : "0";
  });
  const [data, setData] = useState({ height: '', weight: '' });
  const [showModal, setShowModal] = useState(false);
  const [showFoodsModal, setShowFoodsModal] = useState(false);


  const startButton = () => {
    window.location.href = "http://localhost:3000/start/" + userId;
  };

  const fetchData = async () => {
    const documentId = 'deviceData';
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

  const openFoodsModal = () => {
    setShowFoodsModal(true);
  };

  const closeFoodsModal = () => {
    setShowFoodsModal(false);
  };




  const workoutItems = currentUser.workout;

  return (
    <div className="mx-3 my-3">
      <div>
        <div className="minor-details">
          <div className="column">
            <div className="ml-3">
              <h2 className="font-black">Week`s progress:</h2>
              <h2>{weeklyProgress}%</h2>
            </div>
          </div>
          <div className="column">
            <div className="ml-3">
              {!currentUser.slug ? <></> : <button
                className="bg-red-700 rounded-2xl text-sm ml-1 px-2 py-1 h-10 text-white"
                onClick={openFoodsModal}
              >
                Recommended Foods
              </button>}
            
            </div>
          </div>
          <div className="column">
            <button
              className="bg-red-700 rounded-2xl text-sm ml-3 px-2 py-1 h-10"
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
      <RecommendedFoodsModal show={showFoodsModal} onClose={closeFoodsModal} />

    </div>
  );
};

export default Dashboard;
