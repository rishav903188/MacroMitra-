import { useState } from "react";
import { foods } from "./data/foods";
import { calculateMeal } from "./utils/calcMacros";

function App() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [targetProtein, setTargetProtein] = useState(50);
  const [targetCarbs, setTargetCarbs] = useState(60);
  const [targetFat, setTargetFat] = useState(15);
  const [result, setResult] = useState(null);

  const toggleFood = (food) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== food));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const generateMeal = () => {
    if (selectedFoods.length === 0) {
      alert("Select at least one food item.");
      return;
    }

    const meal = calculateMeal(
      selectedFoods,
      Number(targetProtein),
      Number(targetCarbs),
      Number(targetFat),
    );

    setResult(meal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white flex justify-center p-6">
      <div className="w-full max-w-4xl bg-zinc-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6">MacroMitra 💪</h1>

        {/* Target Inputs */}
        <div className="mb-8">
          <h className="text-lg font-semibold tracking-wide">
            Target Macros (per meal)
          </h>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-1 text-zinc-400">
                Protein (g)
              </label>
              <input
                type="number"
                value={targetProtein}
                onChange={(e) => setTargetProtein(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-400">
                Carbs (g)
              </label>
              <input
                type="number"
                value={targetCarbs}
                onChange={(e) => setTargetCarbs(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-400">
                Fat (g)
              </label>
              <input
                type="number"
                value={targetFat}
                onChange={(e) => setTargetFat(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Food Selection */}
        <div className="mb-6">
          <h2 className="mb-3 font-semibold">Select Available Foods</h2>
          <div className="flex flex-wrap gap-3">
            {foods.map((food) => (
              <button
                key={food.name}
                onClick={() => toggleFood(food)}
                className={`px-4 py-2 rounded-xl border transition ${
                  selectedFoods.includes(food)
                    ? "bg-green-600 border-green-400 shadow-md"
                    : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                {food.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateMeal}
          className="bg-linear-to-r from-blue-600 to-blue-500 hover:scale-105 transition transform px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Generate Meal
        </button>
        <button
          onClick={() => {
            setSelectedFoods([]);
            setResult(null);
          }}
          className="ml-4 bg-zinc-700 px-6 py-2 rounded"
        >
          Reset
        </button>

        {/* Result */}

        {result && (
          <div className="mt-8 bg-zinc-800/80 p-6 rounded-2xl border border-zinc-700 shadow-lg">
            <h2 className="font-semibold mb-3">Suggested Quantities</h2>

            {result.items.map((item, index) => (
              <p key={index}>
                {item.food.name} → {item.quantity.toFixed(0)} g
              </p>
            ))}
            <p className="text-zinc-400 text-sm mt-2">
              Engine used top macro sources from selected foods.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-900 p-4 rounded-xl text-center">
                <p className="text-sm text-zinc-400">Protein</p>
                <p className="text-lg font-bold">{result.totals.protein} g</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl text-center">
                <p className="text-sm text-zinc-400">Carbs</p>
                <p className="text-lg font-bold">{result.totals.carbs} g</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl text-center">
                <p className="text-sm text-zinc-400">Fat</p>
                <p className="text-lg font-bold">{result.totals.fat} g</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl text-center">
                <p className="text-sm text-zinc-400">Calories</p>
                <p className="text-lg font-bold">{result.totals.calories}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-600 pt-3">
              <p>Protein: {result.totals.protein} g</p>
              <p>Carbs: {result.totals.carbs} g</p>
              <p>Fat: {result.totals.fat} g</p>
              <p className="font-semibold">
                Calories: {result.totals.calories} kcal
              </p>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Macro Gap</h3>
                <p
                  className={
                    result.gap.protein >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  Protein Gap: {result.gap.protein} g
                </p>
                <p
                  className={
                    result.gap.carbs >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  Carbs Gap: {result.gap.carbs} g
                </p>
                <p
                  className={
                    result.gap.fat >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  Fat Gap: {result.gap.fat} g
                </p>
                <p
                  className={
                    result.gap.calories >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  Calories Gap: {result.gap.calories} kcal
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
