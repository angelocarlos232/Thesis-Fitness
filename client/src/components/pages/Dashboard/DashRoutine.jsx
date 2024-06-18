import React, { useState } from "react";
import { useSelector } from "react-redux";
import YoutubeLogo from "./Youtube_logo.png";
import CircularProgress from "@mui/material/CircularProgress";
import { Progress } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import toast from "react-hot-toast";

const DashRoutine = () => {
  const { currentUser } = useSelector((state) => state.user);
  const targetWeight = currentUser?.diet?.gain_weight ?? 0;
  const loseweight = currentUser?.diet?.lose_weight ?? 0;
  const currentValue = 1000;
  const remainingValue = targetWeight - currentValue;
  const color = remainingValue > 0 ? "red" : "black";

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calories, setCalories] = useState("");
  const [isWeightLogOpen, setIsWeightLogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenWeightLog = () => {
    setIsWeightLogOpen(true);
  };

  const handleCloseWeightLog = () => {
    setIsWeightLogOpen(false);
  };

  const handleSaveCalories = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/addcalories",
        {
          userId: currentUser.id,
          date: selectedDate,
          calories: parseInt(calories),
        }
      );
      console.log(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving calories:", error);
      alert("Error saving calories");
    }
  };

  const handleSaveWeight = async () => {
    try {
      await axios.post("http://localhost:8000/api/users/weightLog", {
        userId: currentUser.id,
        weight: parseFloat(newWeight),
      });
      // Optionally, you can update the currentUser state here to reflect the new weight
      // For example, if your state structure allows:
      // updateUserWeight(parseFloat(newWeight));
      setIsWeightLogOpen(false);
      toast.success("Weight saved successfully");
    } catch (error) {
      console.error("Error saving weight:", error);
      alert("Error saving weight");
    }
  };

  const fitnessGoalMapping = {
    burn_fats: "BURN FATS",
    cardiovascular: "CARDIOVASCULAR HEALTH",
    build_muscle: "BUILD MUSCLES",
  };

  const overallProgress1 = "300";

  const overallProgress = useSelector((state) => state.user.overallProgress);
  const formattedOverallProgress = overallProgress
    ? overallProgress.toFixed(2)
    : null;

  const fitnessGoalKey = currentUser.overview
    ? currentUser.overview.fitness_goal
    : null;
  const fitnessGoal = fitnessGoalKey
    ? fitnessGoalMapping[fitnessGoalKey] || "No fitness goal set"
    : "No fitness goal set";

  const workoutItems = currentUser.workout ? (
    <div className="h-full overflow-auto">
      <div className="flex flex-col items-center pt-3 pb-3">
        <p className="text-lg font-bold text-red-600">GOAL:</p>
        <p
          className="text-lg font-bold"
          style={{ wordWrap: "break-word", textAlign: "center" }}
        >
          {fitnessGoal}
        </p>
      </div>
      {currentUser.workout.map((workout, index) => (
        <div key={index}>
          <p className={`font-bold ${index !== 0 ? "pt-6" : "pt-2"}`}>
            DAY {index + 1}: {workout.workout_type.toUpperCase()}
          </p>
          <div>
            {workout.exercises.map((exercise, exerciseIndex) => (
              <div key={exercise.name}>
                <p className="text-sm font-bold pt-1">
                  {exerciseIndex + 1}. {exercise.name}
                </p>
                <ul>
                  <li className="text-sm">
                    <span className="bullet">&#8226;</span> sets:{" "}
                    {exercise.sets}
                  </li>
                  <li className="text-sm">
                    <span className="bullet">&#8226;</span> reps:{" "}
                    {exercise.reps}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;

  const workoutItemsFullScreen = currentUser.workout ? (
    <div className="h-full overflow-auto">
      <div>
        <div className="flex justify-center items-center">
          <div
            className="flex justify-center items-center pb-3 border-b-2 border-red-600"
            style={{ width: "60%" }}
          >
            <p className="text-2xl font-bold text-white pt-3">
              GOAL: {fitnessGoal}
            </p>
          </div>
        </div>
      </div>

      {currentUser.workout.map((workout, index) => (
        <div key={index}>
          <div className="flex justify-center">
            <p
              className={`font-bold pt-${
                index === 0 ? "3" : "10"
              } text-lg text-white`}
            >
              Day {index + 1}:{" "}
              <span className="text-white">{workout.workout_type}</span>
            </p>
          </div>
          <div className="exercise-container grid grid-cols-2 gap-4 mx-20">
            {workout.exercises.map((exercise, exerciseIndex) => (
              <div key={exercise.name} className="exercise-item">
                <p className="text-base font-semibold pt-2">
                  <a
                    href={`https://www.youtube.com/results?search_query=${exercise.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <span>
                      {exerciseIndex + 1}. {exercise.name}
                    </span>
                    <span style={{ marginLeft: "5px" }}>
                      <img
                        src={YoutubeLogo}
                        alt="YouTube Logo"
                        style={{ width: "20px", height: "15px" }}
                      />
                    </span>
                  </a>
                </p>
                <ul>
                  <li className="text-base font-light">
                    <span className="bullet">&#8226;</span> sets:{" "}
                    {exercise.sets}
                  </li>
                  <li className="text-base font-light">
                    <span className="bullet">&#8226;</span> reps:{" "}
                    {exercise.reps}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;

  const CustomLabel = () => (
    <div className="flex-col">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#2b2b2b",
          fontSize: "11px",
        }}
      >
        <span>Lose Weight</span>
        <span>Gain Weight</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#2b2b2b",
        }}
      >
        <span>{loseweight}</span>
        <span>{targetWeight}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="dash-contents">
        <div className="dash-1">
          <div>
            <p className="text-sm">Workout Routine Recommendation:</p>
          </div>
          <div className="workout-container flex-grow">
            {workoutItems ? (
              <div className="workout-items">{workoutItems}</div>
            ) : (
              <>No data yet</>
            )}
          </div>
          <div className="div-2 flex justify-center items-center pt-6">
            <div className="h-full ">
              <button onClick={handleFullScreen}>View in Full Screen</button>
            </div>
          </div>

          {isFullScreen && (
            <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="full-screen-window  p-6 rounded-md w-11/12 h-5/6 overflow-auto">
                <button
                  className="absolute top-0 right-0 p-2 text-lg font-bold"
                  onClick={handleCloseFullScreen}
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-2 text-red-600">
                  Workout Routine Recommendation:
                </h2>
                <div className="text-white">{workoutItemsFullScreen}</div>
              </div>
            </div>
          )}
        </div>

        <div className="dash-2">
          <div className="dash-2-1">
            <div>
              <p className="text-sm">Progress Chart:</p>
              <div className="flex justify-center mt-6">
                <div className="flex-col justify-center ">
                  <div className="flex justify-center mb-3">
                    <div
                      className="flex justify-center items-center"
                      style={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                      }}
                    >
                      {/* Main CircularProgress component */}
                      <CircularProgress
                        variant="determinate"
                        value={overallProgress} // Pass overall progress percentage
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent", // Make the background transparent
                          color: "#cc0000", // Set the color to #cc0000 (red)
                        }}
                      />

                      {/* Secondary CircularProgress component for incomplete progress */}
                      <CircularProgress
                        variant="determinate"
                        value={100} // Set to 100 to show full black track
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent", // Make the background transparent
                          color: "black", // Set the color to black
                          opacity: 0.1, // Adjust opacity if necessary
                        }}
                      />

                      {/* Progress text */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          width: "100%",
                          color: "white",
                          fontWeight: 700, // Set font weight to bold
                          fontSize: "25px",
                        }}
                      >
                        {formattedOverallProgress}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Diet */}
          <div className="dash-2-2">
            <div>
              <p className="text-sm">Calorie Tracking:</p>
              <div className="mt-6">
                <Progress
                  total={targetWeight}
                  value={currentValue}
                  label={<CustomLabel />}
                  color={color}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <button
                className="px-3 py-1 bg-defaultRed rounded-3xl w-full"
                onClick={handleOpenModal}
              >
                Input Calories
              </button>
              <button
                className="px-3 py-1 bg-defaultRed rounded-3xl w-full h-9"
                onClick={handleOpenWeightLog}
              >
                Weight Log
              </button>
            </div>
          </div>

          {/* Modal for Inputting Calories */}
          {isModalOpen && (
            <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="modal-window p-6 bg-defaultGray text-black  rounded-md w-1/3">
                <h2 className="text-xl text-red-600 font-bold mb-4">
                  Add Calories
                </h2>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Select Date:</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="w-full p-2 border rounded-md"
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                    maxDate={
                      new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">
                    Add calories for today:
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
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
          )}

          {/* Modal for Weight Logging */}
          {isWeightLogOpen && (
            <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="modal-window p-6 bg-defaultGray rounded-md w-1/3 text-black">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                  Weight Logging
                </h2>
                <div className="flex-col mb-3">
                  <p className="text-white">Weight before generating:</p>
                  <p className="text-white">{currentUser.overview.weight}</p>
                </div>
                <div className="flex-col">
                  <label className="w-full text-white">Weight now:</label>
                  <input
                    type="number"
                    id="newWeight"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="text-black h-6 p-2 border rounded-md mb-6"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-600-500 text-white rounded-md bg-red-600"
                    onClick={handleSaveWeight}
                  >
                    Save to database
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-md"
                    onClick={handleCloseWeightLog}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashRoutine;
