import React from 'react';
import { useSelector } from 'react-redux';

const fitnessGoalMapping = {
  burn_fats: "BURN FATS",
  cardiovascular_health: "CARDIOVASCULAR HEALTH",
  build_muscle: "BUILD MUSCLES",
  // Add other mappings as needed
};

const Workouts = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const fitnessGoalKey = currentUser.overview ? currentUser.overview.fitness_goal : null;
  const fitnessGoal = fitnessGoalKey ? fitnessGoalMapping[fitnessGoalKey] || "No fitness goal set" : "No fitness goal set";

  return (
    <div className='workout-logging-container text-xs'>
      <div className='workout-logging-semicontainer h-full bg-[#2b2b2b] rounded-2xl p-6 m-4'>
        <h1 className='text-3xl font-bold text-white'>Workout Logging</h1>
        <div className='text-white'>
          <h2 className='text-2xl'>Week 1</h2>
          <h3 className='text-xl'>Goal: {fitnessGoal}</h3>
          {currentUser.workout.map((workout, dayIndex) => (
            <div key={dayIndex} className='mt-4'>
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
                    <tr  key={exercise.name}>
                      <td className='px-2 border border-white'>{exerciseIndex + 1}</td>
                      <td className='border border-white'>{exercise.name}</td>
                      <td className='border border-white'>{exercise.sets}</td>
                      <td className='border border-white'>{exercise.reps}</td>
                      <td className='border border-white'>Not Completed</td>
                      <td className='border border-white'>
                        <input type='checkbox' />
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
  )
}

export default Workouts;
