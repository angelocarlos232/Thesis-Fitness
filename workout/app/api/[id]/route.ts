/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

// imports
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import MuscleWorkout from '@/utils/caulculators/muscle_workout';
import calculateCalories from '@/utils/caulculators/calories';
import CardiovascularWorkout from '@/utils/caulculators/cardiovascular_workout';
import getMuscleWorkout from '@/utils/caulculators/muscle';
import getCardiovascularWorkout, { WorkoutProgram } from '@/utils/caulculators/cardio';
import getFatBurnWorkout from '@/utils/caulculators/fatburn';
import ProgramPage from '@/app/(home)/program/[slug]/page'
import getBMI, { bmiType, responseType } from '@/utils/caulculators/bmi';


export async function POST(request: Request): Promise<any> {
  
  //const { id: userid } = request.query;

  let error: any = null;
  let result: any = {};
  await request
    .json()
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      error = err.toString();
    });

  // validate data
  if (error) {
    return NextResponse.json(
      {
        message: 'Bad Request',
        error,
      },
      { status: 400 },
    );
  }
  if (typeof result !== 'object') {
    return NextResponse.json(
      {
        message: 'Bad request',
      },
      { status: 400 },
    );
  }

  // overview data
  const overview = {
    name: result.name || null,
    age: result.age,
    gender: result.gender,
    weight: result.weight,
    height: result.height,
    is_fat_accurate: result.is_fat_accurate === 'yes',
    neck: result.neck,
    waist: result.waist,
    hip: result.hip,
    body_type: result.body_type,
    fitness_goal: result.fitness_goal,
    workout_days: result.workout_days,
    activity: result.activity,
  };
  // workout data
  let workout: WorkoutProgram[] = [];
  if (overview.fitness_goal === 'build_muscle') {
    workout = getMuscleWorkout(overview.workout_days);
  } else if (overview.fitness_goal === 'cardiovascular') {
    workout = getCardiovascularWorkout(overview.workout_days);
  } else if (overview.fitness_goal === 'burn_fats') {
    workout = getFatBurnWorkout(overview.workout_days);
  }

  // get data from request
  const url = new URL(request.url);
  // Extract the pathname
  const pathname = url.pathname;
  // Split the pathname by '/' and get the last segment
  const segments = pathname.split('/');
  const userID = segments[segments.length - 1];

  //const userID = url.searchParams.get('id');
  console.log(userID)

    // Get diet macros
    const bmiData: responseType = getBMI({
      height: overview.height,
      weight: overview.weight,
      gender: overview.gender,
      fitness_goal: overview.fitness_goal,
    });
  
    const { ideal_weight } = bmiData;
  
    const calory_data = calculateCalories({
      activity: overview.activity,
      age: overview.age,
      current_weight: overview.weight,
      fitness_goal: overview.fitness_goal,
      gender: overview.gender,
      height: overview.height,
      ideal_weight,
      workout_days: overview.workout_days,
    });
  
  // Diet Macros
  const diet = {
    maintaining_weight: calory_data.calories,
    lose_weight: calory_data.lose_05,
    gain_weight: calory_data.gain_05,
    protein_min: calory_data.protein_1,
    protein_max: calory_data.protein_2,
    fat_min: calory_data.fats_1,
    fat_max: calory_data.fats_2,
    carbs_min: calory_data.carbs_1,
    carbs_max: calory_data.carbs_2,

  };
  // save data to DB
  //const userID = "asd"
  const prisma = new PrismaClient();
  const slug = result.name
    ? result.name + uuidv4().substring(0, 4)
    : uuidv4().substring(0, 5);
  await prisma.program
    .create({
      data: {
        slug,
        diet: {},
        overview,
        workout,
      },
    })
    .then(() => console.log('DATA ADDED TO DB'))
    .catch((err) => console.log(err));

    await prisma.user.update({
      where: { id: userID },
      data: {
        slug,
        diet,
        overview,
        workout,
      }
    }
  )
    
    
    await prisma.combine
    .create({
      data: {
        slug,
        diet: {},
        overview,
        workout,
        userID,
      },
    })
    .then(() => console.log('DATA ADDED TO Combine'))
    .catch((err) => console.log(err));

    
  return NextResponse.json({
    slug,
    userID,
  });
}
