const db = require("../db/db.init");
const IngredientService = require("./Ingredient.service");
const InstructionService = require("./Instruction.service");
const RecipesIngredientsService = require("./RecipesIngredients.service");

const Recipe = db.recipes;

class RecipeService {
  static async countRecipes() {
    return await Recipe.count();
  }

  static async getRecipes(page) {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await this.countRecipes();

    const recipes = await Recipe.findAll({
      order: [["id", "ASC"]],
      offset: startIndex,
      limit: LIMIT,
    });

    return {
      data: recipes,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    };
  }

  static async getRecipeById(id) {
    return await Recipe.findOne({ where: { id } });
  }

  static async createRecipe(recipe, user_id, instructions, ingredients) {
    const recipeToAdd = {
      ...recipe,
      user_id,
    };
  
    await Recipe.create(recipeToAdd).then(async (newRecipe) => {
      
        const newInstructions = await InstructionService.createInstructions(instructions, newRecipe.id);
        const newIngredients = await IngredientService.createIngredients(ingredients, newRecipe.id);

        newIngredients.forEach(async ingredient => {
            await RecipesIngredientsService.createRecipeIngredient(ingredient.id, newRecipe.id, ingredient.quantity);
        });

        return { newRecipe, newIngredients, newInstructions };
      });
  }

  static async deleteRecipe(id) {
    return await Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeService;
