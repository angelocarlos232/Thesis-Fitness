export type Exercise = {
  name: string;
  sets: string;
  reps: string;
};

export type WorkoutProgram = {
  workout_type: string;
  exercises: Exercise[];
};

type FatBurnWorkoutData = {
  days_2: WorkoutProgram[];
  days_3: WorkoutProgram[];
  [key: string]: WorkoutProgram[];
};

const programs: FatBurnWorkoutData = {
  days_2: [
    {
      workout_type: 'Strength Training and Cardio',
      exercises: [
        {
          name: 'Bodyweight Squats',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Push-ups ',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Jumping Jacks',
          sets: '3',
          reps: '1 minute',
        },
        {
          name: 'Lunges',
          sets: '3',
          reps: '10 - 12 per leg',
        },
        {
          name: 'Plank',
          sets: '3',
          reps: '30 - 45 seconds',
        },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '20 - 30 minutes',
        },
      ],
    },
    {
      workout_type: 'HIIT',
      exercises: [
        { name: 'Burpees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Mountain climbers', sets: '3 - 4', reps: '30 seconds' },
        { name: 'High knees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Jump squats', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Bicycle crunches', sets: '3 - 4', reps: '30 seconds' },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '10 - 15 minutes',
        },
      ],
    },
  ],

  days_3: [
    {
      workout_type: 'Strength Training and Cardio',
      exercises: [
        {
          name: 'Bodyweight Squats',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Push-ups ',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Jumping Jacks',
          sets: '3',
          reps: '1 minute',
        },
        {
          name: 'Lunges',
          sets: '3',
          reps: '10 - 12 per leg',
        },
        {
          name: 'Plank',
          sets: '3',
          reps: '30 - 45 seconds',
        },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '20 - 30 minutes',
        },
      ],
    },
    {
      workout_type: 'HIIT',
      exercises: [
        { name: 'Burpees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Mountain climbers', sets: '3 - 4', reps: '30 seconds' },
        { name: 'High knees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Jump squats', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Bicycle crunches', sets: '3 - 4', reps: '30 seconds' },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '10 - 15 minutes',
        },
      ],
    },
    {
      workout_type: 'Active Recovery',
      exercises: [
        {
          name: 'Low-Intensity Cardio (walking, light cycling)',
          sets: '1',
          reps: '30 - 45 Minutes',
        },
        { name: 'Stretching', sets: '1', reps: '10 - 15 Minutes' },
      ],
    },
  ],

  days_4: [
    {
      workout_type: 'Strength Training and Cardio',
      exercises: [
        {
          name: 'Bodyweight Squats',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Push-ups ',
          sets: '3',
          reps: '15 - 20',
        },
        {
          name: 'Jumping Jacks',
          sets: '3',
          reps: '1 minute',
        },
        {
          name: 'Lunges',
          sets: '3',
          reps: '10 - 12 per leg',
        },
        {
          name: 'Plank',
          sets: '3',
          reps: '30 - 45 seconds',
        },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '20 - 30 minutes',
        },
      ],
    },
    {
      workout_type: 'HIIT',
      exercises: [
        { name: 'Burpees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Mountain climbers', sets: '3 - 4', reps: '30 seconds' },
        { name: 'High knees', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Jump squats', sets: '3 - 4', reps: '30 seconds' },
        { name: 'Bicycle crunches', sets: '3 - 4', reps: '30 seconds' },
        {
          name: 'Cardio (Running, Rowing, Cycling, Swimming ...)',
          sets: '1',
          reps: '10 - 15 minutes',
        },
      ],
    },
    {
      workout_type: 'Active Recovery',
      exercises: [
        {
          name: 'Low-Intensity Cardio (walking, light cycling)',
          sets: '1',
          reps: '30 - 45 Minutes',
        },
        { name: 'Stretching', sets: '1', reps: '10 - 15 Minutes' },
      ],
    },
    {
      workout_type: 'Light Cardio',
      exercises: [
        {
          name: 'light cardio (brisk walking, cycling, or swimming)',
          sets: '1',
          reps: '30 Minutes',
        },
      ],
    },
  ],
};

const getFatBurnWorkout = (workout_days: number): WorkoutProgram[] => {
  const program = programs[`days_${workout_days}`] || [];
  console.log(`Workout program for ${workout_days} days:`, program);
  return program;
};

export default getFatBurnWorkout;
