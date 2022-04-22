const db = require("../db/db.init");
const IngredientService = require("./Ingredient.service");
const InstructionService = require("./Instruction.service");
const RecipesIngredientsService = require("./RecipesIngredients.service");

const Recipe = db.recipes;

class RecipeService {
  static async countAll() {
    return await Recipe.count();
  }

  static async getAll(page) {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await this.countAll();

    const recipes = await Recipe.findAll({
      order: [["id", "ASC"]],
      offset: startIndex,
      limit: LIMIT,
    }).then((data) => {
      return data?.toJSON();
    });

    return {
      data: recipes,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    };
  }

  static async getById(id) {
    return await Recipe.findOne({ where: { id } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async create(recipeData) {
    const recipeToAdd = {
      ...recipeData.recipe,
      user_id: recipeData.user_id,
    };

    const newRecipe = await Recipe.create(recipeToAdd).then((data) => {
      return data?.toJSON();
    });
    
    const newInstructions = await InstructionService.createAll(
      recipeData.instructions,
      newRecipe.id
    );
    const newIngredients = await IngredientService.createAll(
      recipeData.ingredients,
      newRecipe.id
    );

    newIngredients.forEach(async (ingredient) => {
      await RecipesIngredientsService.create(
        ingredient.id,
        newRecipe.id,
        ingredient.quantity
      );
    });

    return { newRecipe, newIngredients, newInstructions };
  }

  static async delete(id) {
    return await Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeService;
