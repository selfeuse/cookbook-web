const RecipeService = require("../services/Recipe.service.js");

exports.getRecipes = async (req, res) => {
  const { page } = req.query;

  try {
    const result = await RecipeService.getRecipes(page)

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeService.getRecipeById(id);

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
  const user_id = req.userId;

  try {
    const result = await RecipeService.createRecipe(recipe, user_id, req.body.instructions, req.body.ingredients)
    
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};