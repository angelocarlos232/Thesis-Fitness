import React, { useState } from "react";
import { useSelector } from "react-redux";
import YoutubeLogo from "./Youtube_logo.png";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material UI

const DashRoutine = () => {
  // const sampletext = "here is from database";
  const { currentUser } = useSelector((state) => state.user);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const fitnessGoalMapping = {
    burn_fats: "BURN FATS",
    cardiovascular: "CARDIOVASCULAR HEALTH",
    build_muscle: "BUILD MUSCLES",
    // Add other mappings as needed
  };

  const overallProgress = useSelector((state) => state.user.overallProgress);

  const fitnessGoalKey = currentUser.overview
    ? currentUser.overview.fitness_goal
    : null;
  const fitnessGoal = fitnessGoalKey
    ? fitnessGoalMapping[fitnessGoalKey] || "No fitness goal set"
    : "No fitness goal set";

  // FOR THE WORKOUT ROUTINE GENERATOR
  const workoutItems = currentUser.workout ? (
    <div className="h-full overflow-auto">
      <div className="flex flex-col items-center pt-3 pb-3">
        <p className="text-lg font-bold text-red-600 ">GOAL:</p>
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

  // FOR THE WORKOUT ROUTINE GENERATOR FULL SCREEN
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

  return (
    <div className="w-full">
      <div className="dash-contents">
        {/* Workout Routine Generation */}
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

        {/* Progress Chart */}
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
                      {overallProgress}%
                    </div>
                  </div>
                  </div>
                  <div>

                  <p>Overall Monthly Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Diet */}
          <div className="dash-2-2">
            <div>
              <p className="text-sm">Calorie Tracking:</p>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashRoutine;
