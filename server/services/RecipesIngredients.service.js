const db = require("../db/db.init");

const RecipesIngredients = db.recipesIngredients;

class RecipesIngredientsService {
  static async createRecipeIngredient(ingredient_id, recipe_id, quantity) {
    const recipesIngredientsToAdd = {
        ingredient_id,
        recipe_id,
        quantity
    }

    return await RecipesIngredients.create(recipesIngredientsToAdd).then(data => {
      if (data) return (data.toJSON());
    });
  }
}

module.exports = RecipesIngredientsService;