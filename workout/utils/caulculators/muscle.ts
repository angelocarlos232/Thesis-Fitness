export type Exercise = {
  name: string;
  sets: string;
  reps: string;
};

export type WorkoutProgram = {
  workout_type: string;
  exercises: Exercise[];
};

type MuscleWorkoutData = {
  days_2: WorkoutProgram[];
  days_3: WorkoutProgram[];
  [key: string]: WorkoutProgram[];
};

const programs: MuscleWorkoutData = {
  days_2: [
    {
      workout_type: 'Upper Body',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Bent Over Barbell Rows', sets: '3', reps: '8 - 10' },
        { name: 'Shoulder Press', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Tricep Extensions', sets: '3', reps: '8 - 10' },
      ],
    },
    {
      workout_type: 'Lower Body',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lunges', sets: '3', reps: '10 - 12' },
        { name: 'Deadlift', sets: '3', reps: '8 - 10' },
        { name: 'Calf Raises', sets: '3', reps: '12 - 15' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12 - 15' },
      ],
    },
  ],

  days_3: [
    {
      workout_type: 'Chest and Triceps',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Flyes', sets: '3', reps: '10 - 12' },
        { name: 'Close Grip Bench Press', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dumbbell Kickbacks', sets: '3', reps: '10 - 12' },
        { name: 'Tricep Dips', sets: '3', reps: 'until failure' },
      ],
    },
    {
      workout_type: 'Back and Biceps',
      exercises: [
        { name: 'Deadlifts', sets: '4', reps: '6 - 8' },
        { name: 'Bent-Over Rows', sets: '3', reps: '8 - 10' },
        { name: 'One-Arm Dumbbell Rows', sets: '3', reps: '8 - 10' },
        { name: 'Barbell Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Hammer Curls', sets: '3', reps: '10 - 12' },
        { name: 'Concentration Curls', sets: '3', reps: '10 - 12' },
      ],
    },
    {
      workout_type: 'Legs and shoulders',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Shoulders Press', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lunges', sets: '3', reps: '10 - 12' },
        { name: 'Deadlift', sets: '3', reps: '8 - 10' },
        { name: 'Calf Raises', sets: '3', reps: '12 - 15' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12 - 15' },
      ],
    },
  ],

  days_4: [
    {
      workout_type: 'Chest and Triceps',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Flyes', sets: '3', reps: '10 - 12' },
        { name: 'Close Grip Bench Press', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dumbbell Kickbacks', sets: '3', reps: '10 - 12' },
        { name: 'Tricep Dips', sets: '3', reps: 'until failure' },
      ],
    },
    {
      workout_type: 'Back and Biceps',
      exercises: [
        { name: 'Deadlifts', sets: '4', reps: '6 - 8' },
        { name: 'Bent-Over Rows', sets: '3', reps: '8 - 10' },
        { name: 'One-Arm Dumbbell Rows', sets: '3', reps: '8 - 10' },
        { name: 'Barbell Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Hammer Curls', sets: '3', reps: '10 - 12' },
        { name: 'Concentration Curls', sets: '3', reps: '10 - 12' },
      ],
    },
    {
      workout_type: 'Shoulders and Abs',
      exercises: [
        { name: 'Shoulder Press', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lateral Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Front Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Shrugs', sets: '3', reps: '10 - 12' },
        { name: 'Plank', sets: '3', reps: '30 - 60 seconds' },
      ],
    },
    {
      workout_type: 'Legs',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lunges', sets: '3', reps: '10 - 12' },
        { name: 'Deadlift', sets: '3', reps: '8 - 10' },
        { name: 'Calf Raises', sets: '3', reps: '12 - 15' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12 - 15' },
      ],
    },
  ],

  days_5: [
    {
      workout_type: 'Chest and Triceps',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Flyes', sets: '3', reps: '10 - 12' },
        { name: 'Close Grip Bench Press', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dumbbell Kickbacks', sets: '3', reps: '10 - 12' },
        { name: 'Tricep Dips', sets: '3', reps: 'until failure' },
      ],
    },
    {
      workout_type: 'Back and Biceps',
      exercises: [
        { name: 'Deadlifts', sets: '4', reps: '6 - 8' },
        { name: 'Bent-Over Rows', sets: '3', reps: '8 - 10' },
        { name: 'One-Arm Dumbbell Rows', sets: '3', reps: '8 - 10' },
        { name: 'Barbell Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Hammer Curls', sets: '3', reps: '10 - 12' },
        { name: 'Concentration Curls', sets: '3', reps: '10 - 12' },
      ],
    },
    {
      workout_type: 'Shoulders and Abs',
      exercises: [
        { name: 'Shoulder Press', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lateral Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Front Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Shrugs', sets: '3', reps: '10 - 12' },
        { name: 'Plank', sets: '3', reps: '30 - 60 seconds' },
      ],
    },
    {
      workout_type: 'Legs',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lunges', sets: '3', reps: '10 - 12' },
        { name: 'Deadlift', sets: '3', reps: '8 - 10' },
        { name: 'Calf Raises', sets: '3', reps: '12 - 15' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12 - 15' },
      ],
    },
    {
      workout_type: 'Full Body',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Bent-Over Rows', sets: '4', reps: '8 - 10' },
        { name: 'Shoulder Press', sets: '3', reps: '8 - 10' },
        { name: 'Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dips', sets: '3', reps: '10 - 12' },
      ],
    },
  ],

  days_6: [
    {
      workout_type: 'Chest and Triceps',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '8 - 10' },
        { name: 'Dumbbell Flyes', sets: '3', reps: '10 - 12' },
        { name: 'Close Grip Bench Press', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dumbbell Kickbacks', sets: '3', reps: '10 - 12' },
        { name: 'Tricep Dips', sets: '3', reps: 'until failure' },
      ],
    },
    {
      workout_type: 'Back and Biceps',
      exercises: [
        { name: 'Deadlifts', sets: '4', reps: '6 - 8' },
        { name: 'Bent-Over Rows', sets: '3', reps: '8 - 10' },
        { name: 'One-Arm Dumbbell Rows', sets: '3', reps: '8 - 10' },
        { name: 'Barbell Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Hammer Curls', sets: '3', reps: '10 - 12' },
        { name: 'Concentration Curls', sets: '3', reps: '10 - 12' },
      ],
    },
    {
      workout_type: 'Legs',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lunges', sets: '3', reps: '10 - 12' },
        { name: 'Deadlift', sets: '3', reps: '8 - 10' },
        { name: 'Calf Raises', sets: '3', reps: '12 - 15' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12 - 15' },
      ],
    },
    {
      workout_type: 'Shoulders and Abs',
      exercises: [
        { name: 'Shoulder Press', sets: '4', reps: '8 - 10' },
        { name: 'Dumbbell Lateral Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Front Raises', sets: '3', reps: '10 - 12' },
        { name: 'Dumbbell Shrugs', sets: '3', reps: '10 - 12' },
        { name: 'Plank', sets: '3', reps: '30 - 60 seconds' },
      ],
    },
    {
      workout_type: 'Full Body',
      exercises: [
        { name: 'Barbell Squats', sets: '4', reps: '8 - 10' },
        { name: 'Bench Press', sets: '4', reps: '8 - 10' },
        { name: 'Bent-Over Rows', sets: '4', reps: '8 - 10' },
        { name: 'Shoulder Press', sets: '3', reps: '8 - 10' },
        { name: 'Bicep Curls', sets: '3', reps: '8 - 10' },
        { name: 'Tricep Dips', sets: '3', reps: '10 - 12' },
      ],
    },
    {
      workout_type: 'Cardio',
      exercises: [
        { name: 'Cardio', sets: '1', reps: '20 - 30 Min (gradually increase the duration and intensity over time)' },
      ],
    },
  ],
};

const getMuscleWorkout = (workout_days: number): WorkoutProgram[] => {
  const program = programs[`days_${workout_days}`] || [];
  console.log(`Workout program for ${workout_days} days:`, program);
  return program;
};

export default getMuscleWorkout;
