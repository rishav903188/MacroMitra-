export function calculateMeal(
  selectedFoods,
  targetProtein,
  targetCarbs,
  targetFat,
) {
  if (selectedFoods.length === 0) return null;

  let result = [];

  // ---- STEP 1: Protein Priority ----
  const sortedByProtein = [...selectedFoods].sort(
    (a, b) => b.protein - a.protein,
  );

  const proteinSource = sortedByProtein[0];

  const proteinQty = (targetProtein / proteinSource.protein) * 100;

  result.push({
    food: proteinSource,
    quantity: proteinQty,
  });

  // ---- STEP 2: Carb Priority ----
  const carbFoods = selectedFoods.filter((food) => food.carbs > 5);

  if (carbFoods.length > 0) {
    const carbSource = carbFoods.sort((a, b) => b.carbs - a.carbs)[0];

    const carbQty = (targetCarbs / carbSource.carbs) * 100;

    result.push({
      food: carbSource,
      quantity: carbQty,
    });
  }

  // ---- STEP 3: Calculate Totals ----
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  result.forEach((item) => {
    const multiplier = item.quantity / 100;

    totalProtein += item.food.protein * multiplier;
    totalCarbs += item.food.carbs * multiplier;
    totalFat += item.food.fat * multiplier;
  });

  const totalCalories = totalProtein * 4 + totalCarbs * 4 + totalFat * 9;

  const targetCalories = targetProtein * 4 + targetCarbs * 4 + targetFat * 9;

  return {
    items: result,
    totals: {
      protein: totalProtein.toFixed(1),
      carbs: totalCarbs.toFixed(1),
      fat: totalFat.toFixed(1),
      calories: totalCalories.toFixed(0),
    },
    gap: {
      protein: (totalProtein - targetProtein).toFixed(1),
      carbs: (totalCarbs - targetCarbs).toFixed(1),
      fat: (totalFat - targetFat).toFixed(1),
      calories: (totalCalories - targetCalories).toFixed(0),
    },
  };
}
