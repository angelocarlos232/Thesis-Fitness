export type Exercise = {
  name: string;
  sets: string;
  reps: string;
};

export type WorkoutProgram = {
  workout_type: string;
  exercises: Exercise[];
};

type CardiovascularWorkoutData = {
  days_2: WorkoutProgram[];
  days_3: WorkoutProgram[];
  [key: string]: WorkoutProgram[];
};

const programs: CardiovascularWorkoutData = {
  days_2: [
    {
      workout_type: 'Aerobic',
      exercises: [
        { name: 'Cycling / brisk walking / swimming / running', sets: '1', reps: '20-30 minutes' },
      ],
    },
    {
      workout_type: 'HIIT',
      exercises: [{ name: 'Sprint', sets: '6 - 8', reps: '30 seconds' }],
    },
  ],
  days_3: [
    {
      workout_type: 'Aerobic',
      exercises: [
        { name: 'Cycling / brisk walking / swimming / running', sets: '1', reps: '20-30 minutes' },
      ],
    },
    {
      workout_type: 'HIIT',
      exercises: [{ name: 'Sprint', sets: '6 - 8', reps: '30 seconds' }],
    },
    {
      workout_type: 'Circuit Training',
      exercises: [
        { name: 'Jumping jacks', sets: '3 - 4', reps: '1 minute' },
        { name: 'Bodyweight squats', sets: '3 - 4', reps: '10 - 15' },
        { name: 'Push-ups', sets: '3 - 4', reps: '10 - 15' },
        { name: 'Burpees', sets: '3 - 4', reps: '10 - 15' },
      ],
    },
  ],

  days_4: [
    {
      workout_type: 'Aerobic',
      exercises: [
        { name: 'Cycling', sets: '2', reps: '20-30 minutes' },
      ],
    },
    {
      workout_type: 'sample',
      exercises: [{ name: 'Sprint', sets: '6 - 8', reps: '30 seconds' }],
    },
  ],
};

const getCardiovascularWorkout = (workout_days: number): WorkoutProgram[] => {
  const program = programs[`days_${workout_days}`] || [];
  console.log(`Workout program for ${workout_days} days:`, program);
  return program;
};

export default getCardiovascularWorkout;
