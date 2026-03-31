// Mock Database for Recommendations
const recommendationsDb = {
    'weight-loss': {
        'vegetarian': {
            'breakfast': { meal: 'Oats with Almond Milk and Berries', calories: 350, tip: 'Berries are high in antioxidants and fiber, perfect for starting the day lean.' },
            'lunch': { meal: 'Grilled Tofu and Quinoa Salad', calories: 450, tip: 'Quinoa is a complete protein, essential for maintaining muscle while losing fat.' },
            'dinner': { meal: 'Zucchini Noodles with Pesto', calories: 300, tip: 'Zucchini noodles are a fantastic low-carb alternative to pasta.' }
        },
        'non-vegetarian': {
            'breakfast': { meal: 'Scrambled Egg Whites with Spinach', calories: 250, tip: 'Egg whites provide pure protein to keep you satiated without extra fat.' },
            'lunch': { meal: 'Grilled Chicken Breast with Steamed Broccoli', calories: 400, tip: 'Broccoli is nutrient-dense and highly filling for its low caloric count.' },
            'dinner': { meal: 'Baked Salmon with Asparagus', calories: 450, tip: 'Salmon provides Omega-3 fatty acids which support metabolic health.' }
        }
    },
    'muscle-gain': {
        'vegetarian': {
            'breakfast': { meal: 'Protein Pancakes with Peanut Butter', calories: 600, tip: 'Peanut butter adds healthy fats and extra calories needed for bulking.' },
            'lunch': { meal: 'Lentil Stew with Brown Rice', calories: 700, tip: 'Lentils paired with grains form a complete protein crucial for muscle repair.' },
            'dinner': { meal: 'Paneer Tikka with Whole Wheat Roti', calories: 650, tip: 'Paneer (cottage cheese) is rich in casein protein, ideal before sleep.' }
        },
        'non-vegetarian': {
            'breakfast': { meal: 'Whole Eggs and Oatmeal', calories: 550, tip: 'Whole eggs provide cholesterol necessary for testosterone production.' },
            'lunch': { meal: 'Steak with Sweet Potato Mash', calories: 800, tip: 'Red meat is rich in iron and B-vitamins for optimal energy levels.' },
            'dinner': { meal: 'Chicken Thighs with Quinoa and Avocado', calories: 750, tip: 'Chicken thighs have slightly more fat, great for caloric surplus.' }
        }
    },
    'maintain': {
        'vegetarian': {
            'breakfast': { meal: 'Greek Yogurt with Honey and Walnuts', calories: 400, tip: 'Walnuts provide brain-boosting fats to kickstart your day.' },
            'lunch': { meal: 'Chickpea Salad Wrap', calories: 500, tip: 'Chickpeas offer a balanced ratio of carbs to protein.' },
            'dinner': { meal: 'Vegetable Stir-fry with Tofu', calories: 450, tip: 'A colorful stir-fry ensures you get a wide spectrum of micronutrients.' }
        },
        'non-vegetarian': {
            'breakfast': { meal: 'Avocado Toast with Poached Egg', calories: 450, tip: 'Avocado contains healthy monounsaturated fats for sustained energy.' },
            'lunch': { meal: 'Turkey Sandwich on Whole Grain Bread', calories: 550, tip: 'Turkey is a lean protein that prevents post-lunch sluggishness.' },
            'dinner': { meal: 'Shrimp Curry with Basmati Rice', calories: 500, tip: 'Shrimp is highly protein-dense and rich in iodine.' }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const outputSection = document.getElementById('output-section');
    const mealNameOutput = document.getElementById('output-meal-name');
    const caloriesOutput = document.getElementById('output-calories');
    const tipOutput = document.getElementById('output-tip');
    const descriptionOutput = document.getElementById('output-description');

    form.addEventListener('submit', (e) => {
        // Prevent default page reload
        e.preventDefault();

        // Get Input Values
        const goal = document.getElementById('fitness-goal').value;
        const diet = document.getElementById('diet-preference').value;
        const time = document.getElementById('meal-time').value;

        if (goal && diet && time) {
            // Retrieve recommendation with fallbacks
            let recommendation = {
                meal: 'Custom Balanced Meal',
                calories: 500,
                tip: 'Stay hydrated and listen to your body\'s hunger cues.'
            };

            try {
                // Map 'vegan' to 'vegetarian' for simplicity in this mock DB
                const mappedDiet = diet === 'vegan' ? 'vegetarian' : diet;
                
                // If time is 'snack', provide a generalized healthy snack
                if (time === 'snack') {
                    recommendation = { 
                        meal: mappedDiet === 'vegetarian' ? 'Apple with Almond Butter' : 'Boiled Eggs and Nuts',
                        calories: 250,
                        tip: 'Snacks should be nutrient-dense to maintain energy levels between major meals.'
                    };
                } else {
                    recommendation = recommendationsDb[goal][mappedDiet][time];
                }
            } catch (error) {
                console.warn("Could not find exact match, using fallback.");
            }

            // Update UI
            mealNameOutput.textContent = recommendation.meal;
            caloriesOutput.textContent = `${recommendation.calories} kcal`;
            tipOutput.textContent = recommendation.tip;
            descriptionOutput.textContent = `Based on your goal to ${goal.replace('-', ' ')} on a ${diet} diet.`;

            // Reveal and animate the output section
            outputSection.classList.remove('hidden');
            
            // Re-trigger CSS animation
            outputSection.style.animation = 'none';
            outputSection.offsetHeight; // trigger reflow
            outputSection.style.animation = null;

            // Smooth scroll to output on mobile
            if (window.innerWidth <= 900) {
                outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
