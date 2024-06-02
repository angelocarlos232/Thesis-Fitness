import { AiFillYoutube } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GiHotMeal } from 'react-icons/gi';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';

import getCardiovascularWorkout, { WorkoutProgram, Exercise } from '@/utils/caulculators/cardio';

export default function CardiovascularWorkout({
  workout_days,
}: {
  workout_days: number;
}) {
  const workoutProgram: WorkoutProgram[] = getCardiovascularWorkout(workout_days);
  console.log('workoutProgram:', workoutProgram);

  if (workoutProgram.length === 0) {
    return (
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-4xl flex-shrink-0">Workout Plan</h2>
          <span className="text-neutral-400 text-sm font-normal">
            No specific workout program available for
            {' '}
            {workout_days}
            {' '}
            days. Please adjust your selection.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-4xl flex-shrink-0">Workout Plan</h2>
        <span className="text-neutral-400 text-sm font-normal">
          Tailored Workout Program for You (
          {workout_days}
          {' '}
          days workout as you requested)
        </span>
      </div>

      {/* Days - details */}
      <div className="flex flex-col gap-16">
        {workoutProgram.map((day: WorkoutProgram, i: number) => (
          <div key={day.workout_type} className="flex flex-col gap-6">
            {/* day */}
            <h3 className="text-xl font-semibold">
              Day
              {' '}
              {i + 1}
              {' '}
              -
              {' '}
              {day.workout_type}
            </h3>

            {/* exercises */}
            <div className="flex flex-col gap-6">
              {day.exercises.map((exercise: Exercise) => (
                <div
                  key={exercise.name}
                  className="flex gap-3 relative h-fit items-stretch"
                >
                  <div className="flex flex-col pt-1">
                    <div className="w-4 h-4 bg-neutral-300 rounded-full" />
                    <div className="h-full w-0.5 bg-gradient-to-b from-neutral-300 mx-auto" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{exercise.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sets:</span>
                      <span>{exercise.sets}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Reps:</span>
                      <span>{exercise.reps}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Help:</span>
                      <div className="flex gap-6 items-center">
                        <Link
                          target="_blank"
                          className="flex gap-1 items-center text-sm text-sky-500 hover:underline underline-offset-4"
                          href={`https://www.youtube.com/results?search_query=${exercise.name}`}
                        >
                          <span>Watch Videos</span>
                          <span className="text-red-500 text-xl">
                            <AiFillYoutube />
                          </span>
                        </Link>
                        <Link
                          target="_blank"
                          className="flex gap-1 items-center text-sm text-sky-500 hover:underline underline-offset-4"
                          href={`https://www.google.com/search?q=${exercise.name}&tbm=isch`}
                        >
                          <span>See Images</span>
                          <span className="text-xl">
                            <FcGoogle />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
