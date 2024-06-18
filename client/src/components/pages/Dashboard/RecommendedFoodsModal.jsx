import React from 'react';
import { useSelector } from 'react-redux';

const RecommendedFoodsModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const { currentUser } = useSelector((state) => state.user);

  const fitnessGoalMapping = {
    burn_fats: 'Burning Fats',
    cardiovascular: 'Cardiovascular',
    build_muscle: 'Building Muscle'
  };

  const recommendedFoods = {
    burn_fats: [
      { name: 'Avocado', calories: 160 },
      { name: 'Green Tea', calories: 0 },
      { name: 'Salmon', calories: 208 },
      { name: 'Eggs', calories: 78 },
      { name: 'Chicken Breast', calories: 165 },
      { name: 'Turkey', calories: 125 },
      { name: 'Tuna', calories: 179 },
      { name: 'Broccoli', calories: 55 },
      { name: 'Cauliflower', calories: 25 },
      { name: 'Kale', calories: 33 },
      { name: 'Spinach', calories: 7 },
      { name: 'Brussels Sprouts', calories: 38 },
      { name: 'Berries', calories: 85 },
      { name: 'Lentils', calories: 230 },
      { name: 'Quinoa', calories: 222 },
      { name: 'Greek Yogurt', calories: 100 },
      { name: 'Chia Seeds', calories: 138 },
      { name: 'Almonds', calories: 164 },
      { name: 'Walnuts', calories: 185 },
      { name: 'Olive Oil', calories: 119 }
    ],
    cardiovascular: [
      { name: 'Oats', calories: 154 },
      { name: 'Berries', calories: 85 },
      { name: 'Nuts', calories: 173 },
      { name: 'Spinach', calories: 7 },
      { name: 'Fish', calories: 206 },
      { name: 'Oranges', calories: 62 },
      { name: 'Carrots', calories: 41 },
      { name: 'Apples', calories: 95 },
      { name: 'Bananas', calories: 105 },
      { name: 'Sweet Potatoes', calories: 112 },
      { name: 'Beets', calories: 44 },
      { name: 'Celery', calories: 6 },
      { name: 'Salad Greens', calories: 5 },
      { name: 'Tomatoes', calories: 22 },
      { name: 'Brown Rice', calories: 216 },
      { name: 'Quinoa', calories: 222 },
      { name: 'Chickpeas', calories: 269 },
      { name: 'Sunflower Seeds', calories: 204 },
      { name: 'Flaxseeds', calories: 150 },
      { name: 'Salmon', calories: 208 }
    ],
    build_muscle: [
      { name: 'Chicken Breast', calories: 165 },
      { name: 'Greek Yogurt', calories: 100 },
      { name: 'Quinoa', calories: 222 },
      { name: 'Eggs', calories: 78 },
      { name: 'Almonds', calories: 164 },
      { name: 'Tofu', calories: 88 },
      { name: 'Cottage Cheese', calories: 163 },
      { name: 'Milk', calories: 103 },
      { name: 'Whey Protein', calories: 120 },
      { name: 'Salmon', calories: 208 },
      { name: 'Beef', calories: 250 },
      { name: 'Pork', calories: 242 },
      { name: 'Turkey', calories: 125 },
      { name: 'Chickpeas', calories: 269 },
      { name: 'Lentils', calories: 230 },
      { name: 'Peanut Butter', calories: 188 },
      { name: 'Brown Rice', calories: 216 },
      { name: 'Potatoes', calories: 161 },
      { name: 'Whole Grain Bread', calories: 247 },
      { name: 'Pasta', calories: 131 }
    ]
  };


  const foods = recommendedFoods[currentUser.overview.fitness_goal];
  const halfLength = Math.ceil(foods.length / 2);
  const firstHalf = foods.slice(0, halfLength);
  const secondHalf = foods.slice(halfLength);

  const renderFoodList = (list) => (
    <ul className="flex flex-col mr-8">
      {list.map((food, index) => (
        <li key={index} className="mb-2">
          <span className='font-black text-lg mr-3'>{food.name}</span>- {food.calories} calories
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-defaultGray p-6 rounded-lg shadow-lg text-white">
          <h1 className="text-2xl font-bold mb-4">Recommended Foods for {fitnessGoalMapping[currentUser.overview.fitness_goal]}</h1>
          <div className='flex'>
        <div>
          {renderFoodList(firstHalf)}
        </div>
        <div>
          {renderFoodList(secondHalf)}
        </div>
        
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RecommendedFoodsModal;
