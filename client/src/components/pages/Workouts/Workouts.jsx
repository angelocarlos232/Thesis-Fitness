import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const fitnessGoalMapping = {
  burn_fats: "BURN FATS",
  cardiovascular_health: "CARDIOVASCULAR HEALTH",
  build_muscle: "BUILD MUSCLES",
  // Add other mappings as needed
};

const Workouts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isWeekExpanded, setIsWeekExpanded] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const fitnessGoalKey = currentUser.overview ? currentUser.overview.fitness_goal : null;
  const fitnessGoal = fitnessGoalKey ? fitnessGoalMapping[fitnessGoalKey] || "No fitness goal set" : "No fitness goal set";

  const toggleWeek = () => {
    setIsWeekExpanded(!isWeekExpanded);
  };

  const handleCheckboxChange = (dayIndex, exerciseIndex) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    setCompletedExercises((prevCompletedExercises) => ({
      ...prevCompletedExercises,
      [key]: !prevCompletedExercises[key],
    }));
  };

  return (
    <div className='workout-logging-container text-xs'>
      <div className='workout-logging-semicontainer h-full bg-[#2b2b2b] rounded-2xl p-6 m-4'>
        <h1 className='text-3xl font-bold text-red-600'>Workout Logging</h1>
        <div className='text-white'>
          <h3 className='text-xl font-bold'>GOAL: {fitnessGoal}</h3>
          <h2 className='mt-6 text-xl font-bold cursor-pointer' onClick={toggleWeek}>
            Week 1 {isWeekExpanded ? 'v' : '^'}
          </h2>

          {isWeekExpanded && currentUser.workout?.length > 0 && currentUser.workout.map((workout, dayIndex) => (
            <div key={dayIndex} className='mt-4 mx-6'>
              <h3 className='text-xl'>Day {dayIndex + 1}: {workout.workout_type.toUpperCase()}</h3>
              <table className='w-full text-white mt-2 border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-white'>No</th>
                    <th className='border border-white'>Exercise name</th>
                    <th className='border border-white'>Sets</th>
                    <th className='border border-white'>Reps</th>
                    <th className='border border-white'>Status</th>
                    <th className='border border-white'>Check</th>
                  </tr>
                </thead>
                <tbody>
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <tr key={exercise.name}>
                      <td className='px-2 border border-white h-12'>{exerciseIndex + 1}</td>
                      <td className='px-2 border border-white h-12'>{exercise.name}</td>
                      <td className='px-2 border border-white h-12'>{exercise.sets}</td>
                      <td className='px-2 border border-white h-12'>{exercise.reps}</td>
                      <td className='px-2 border border-white h-12'>{completedExercises[`${dayIndex}-${exerciseIndex}`] ? 'Completed' : 'Not Completed'}</td>
                      <td className='px-4 border border-white h-12'>
                        <input
                          type='checkbox'
                          checked={completedExercises[`${dayIndex}-${exerciseIndex}`] || false}
                          onChange={() => handleCheckboxChange(dayIndex, exerciseIndex)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
