import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {setOverallProgress, setWeeklyProgress} from '../../../redux/user/userSlice'

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
  const [completedExercises, setCompletedExercises] = useState(currentUser.progress || {
    week1: {},
    week2: {},
    week3: {},
    week4: {},
  });

  useEffect(() => {
    setSelectedDay(1); // Reset to day 1 when changing weeks
  
    // Fetch user's progress data from the server if currentUser exists and has progress
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/progress/${currentUser.id}`);
        if (response.data.progress) {
          setCompletedExercises(response.data.progress);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
        // Handle error fetching progress data
      }
    };
  
    if (currentUser) {
      fetchProgress();
    }
  }, [currentUser]);

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
    const weekKey = `week${week}`;
    const key = `${dayIndex}-${exerciseIndex}`;
    setCompletedExercises((prevCompletedExercises) => ({
      ...prevCompletedExercises,
      [weekKey]: {
        ...prevCompletedExercises[weekKey],
        [key]: !prevCompletedExercises[weekKey][key],
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/saveprogress', {
        userId: currentUser.id,
        completedExercises,
      });
      alert(response.data);
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Error saving progress');
    }
  };

  const renderDayDropdown = () => {
    const numDaysPerWeek = currentUser.overview ? currentUser.overview.workout_days : 7; // Default to 7 if not specified
    const days = Array.from({ length: numDaysPerWeek }, (_, i) => i + 1); // Create an array of days from 1 to numDaysPerWeek
  
    return (
      <select
        className="bg-gray-700 text-white rounded px-2 py-1"
        value={selectedDay}
        onChange={(e) => setSelectedDay(Number(e.target.value))}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            Day {day}
          </option>
        ))}
      </select>
    );
  };

  const renderExercisesTable = (weekNumber, dayIndex) => {
    const exercises = currentUser.workout[dayIndex].exercises; // Update to use the selected day's exercises
    const weekKey = `week${weekNumber}`;
  
    return (
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
          {exercises.map((exercise, exerciseIndex) => (
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
                {completedExercises[weekKey]?.[`${dayIndex}-${exerciseIndex}`]
                  ? "Completed"
                  : "Not Completed"}
              </td>
              <td className="px-4 border border-white h-12">
                <input
                  type="checkbox"
                  checked={
                    completedExercises[weekKey]?.[`${dayIndex}-${exerciseIndex}`] || false
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
          ))}
        </tbody>
      </table>
    );
  };

  const calculateProgress = (weekNumber) => {
    const weekKey = `week${weekNumber}`;
    const numDaysPerWeek = currentUser.overview ? currentUser.overview.workout_days : 7;
    let totalExercises = 0;
    let completedExercisesCount = 0;

    for (let dayIndex = 0; dayIndex < numDaysPerWeek; dayIndex++) {
      const exercises = currentUser.workout[dayIndex].exercises;
      totalExercises += exercises.length;

      exercises.forEach((exercise, exerciseIndex) => {
        if (completedExercises[weekKey]?.[`${dayIndex}-${exerciseIndex}`]) {
          completedExercisesCount++;
        }
      });
    }

    return totalExercises ? (completedExercisesCount / totalExercises) * 100 : 0;
  };

  const calculateOverallProgress = () => {
    const progressArray = [1, 2, 3, 4].map(calculateProgress);
    const totalProgress = progressArray.reduce((acc, weekProgress) => acc + weekProgress, 0);
    return totalProgress / progressArray.length;
  };

  const progress = calculateProgress(selectedWeek);
  const overallProgress = calculateOverallProgress();

  const dispatch = useDispatch();
  dispatch(setOverallProgress(overallProgress));
  dispatch(setWeeklyProgress(progress));
  

  return (
    <div className="workout-logging-container text-xs">
      <div className="workout-logging-semicontainer h-full bg-[#2b2b2b] rounded-2xl p-6 m-4">
        <h1 className="text-3xl font-bold text-red-600">Workout Logging</h1>
        <div className="text-white">
          <h3 className="text-xl font-bold">GOAL: {fitnessGoal}</h3>
          <div className="flex justify-between mt-6">
          <h3 className="text-xl font-medium">Weekly Progress: <span className="text-red-600 font-black">{progress.toFixed(2)}%</span></h3>
          <h3 className="text-xl font-medium">Overall Progress: <span className="text-red-600 font-black">{overallProgress.toFixed(2)}%</span></h3>
          </div>
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
            {renderDayDropdown()}
            {renderExercisesTable(selectedWeek, selectedDay - 1)}
          </div>
          <div className="pt-3 flex justify-end">
            <button
              className="text-sm px-4 py-2 bg-red-600 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
