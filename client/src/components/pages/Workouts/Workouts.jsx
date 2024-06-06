import React, { useState } from "react";
import { useSelector } from "react-redux";

const fitnessGoalMapping = {
  burn_fats: "BURN FATS",
  cardiovascular_health: "CARDIOVASCULAR HEALTH",
  build_muscle: "BUILD MUSCLES",
  // Add other mappings as needed
};

const Workouts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState({});

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const fitnessGoalKey = currentUser.overview
    ? currentUser.overview.fitness_goal
    : null;
  const fitnessGoal = fitnessGoalKey
    ? fitnessGoalMapping[fitnessGoalKey] || "No fitness goal set"
    : "No fitness goal set";

  const handleCheckboxChange = (week, dayIndex, exerciseIndex) => {
    const key = `${week}-${dayIndex}-${exerciseIndex}`;
    setCompletedExercises((prevCompletedExercises) => ({
      ...prevCompletedExercises,
      [key]: !prevCompletedExercises[key],
    }));
  };

  const renderDayDropdown = (weekNumber) => (
    <select
      className="bg-gray-700 text-white rounded px-2 py-1"
      value={selectedDay}
      onChange={(e) => setSelectedDay(Number(e.target.value))}
    >
      {currentUser.workout &&
        currentUser.workout.map((_, dayIndex) => (
          <option key={dayIndex} value={dayIndex + 1}>
            Day {dayIndex + 1}
          </option>
        ))}
    </select>
  );

  const renderExercisesTable = (weekNumber, dayIndex) => (
    <table className="w-full text-white mt-2 border-collapse">
      <thead>
        <tr>
          <th className="border border-white">No</th>
          <th className="border border-white">Exercise name</th>
          <th className="border border-white">Sets</th>
          <th className="border border-white">Reps</th>
          <th className="border border-white">Status</th>
          <th className="border border-white">Check</th>
        </tr>
      </thead>
      <tbody>
        {currentUser.workout[dayIndex] &&
          currentUser.workout[dayIndex].exercises.map(
            (exercise, exerciseIndex) => (
              <tr key={exercise.name}>
                <td className="px-2 border border-white h-12">
                  {exerciseIndex + 1}
                </td>
                <td className="px-2 border border-white h-12">
                  {exercise.name}
                </td>
                <td className="px-2 border border-white h-12">
                  {exercise.sets}
                </td>
                <td className="px-2 border border-white h-12">
                  {exercise.reps}
                </td>
                <td className="px-2 border border-white h-12">
                  {completedExercises[`${weekNumber}-${dayIndex}-${exerciseIndex}`]
                    ? "Completed"
                    : "Not Completed"}
                </td>
                <td className="px-4 border border-white h-12">
                  <input
                    type="checkbox"
                    checked={
                      completedExercises[
                        `${weekNumber}-${dayIndex}-${exerciseIndex}`
                      ] || false
                    }
                    onChange={() =>
                      handleCheckboxChange(
                        weekNumber,
                        dayIndex,
                        exerciseIndex
                      )
                    }
                  />
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );

  return (
    <div className="workout-logging-container text-xs">
      <div className="workout-logging-semicontainer h-full bg-[#2b2b2b] rounded-2xl p-6 m-4">
        <h1 className="text-3xl font-bold text-red-600">Workout Logging</h1>
        <div className="text-white">
          <h3 className="text-xl font-bold">GOAL: {fitnessGoal}</h3>
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                className={`px-4 py-2 rounded ${
                  selectedWeek === week ? "bg-red-600" : "bg-gray-700"
                }`}
                onClick={() => setSelectedWeek(week)}
              >
                Week {week}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {renderDayDropdown(selectedWeek)}
            {renderExercisesTable(selectedWeek, selectedDay - 1)}
          </div>
          <div className="pt-3 flex justify-end">
            <button className="text-sm px-4 py-2 bg-red-600 rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
