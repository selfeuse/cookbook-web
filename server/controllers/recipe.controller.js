const db = require("../db/db.init");
const ingredients = require("../controllers/ingredients.controller.js");
const instructions = require("../controllers/instructions.controller.js");

const Recipe = db.recipes;

exports.getRecipes = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Recipe.count();

    const recipes = Recipe.findAll({
      order: [["id", "ASC"]],
      offset: startIndex,
      limit: LIMIT,
    });

    res.status(200).json({
      data: recipes,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findOne({ where: { id } });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe doesn't exists." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  const recipe = req.body.recipe;

  const recipeToAdd = {
    ...recipe,
    user_id: req.userId,
  };

  try {
    Recipe.create(recipeToAdd).then((newRecipe) => {
      
      const newInstructions = instructions.createInstructions(req.body.instructions, newRecipe.id)
      const newIngredients = ingredients.createIngredients(req.body.ingredients, newRecipe.id)
      
      return res.status(200).json({ newRecipe, newIngredients, newInstructions });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};