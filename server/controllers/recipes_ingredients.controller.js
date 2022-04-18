const db = require("../db/db.init");

const RecipesIngredients = db.recipesIngredients;

exports.getIngredientsByRecipeId = async (req, res) => {

}

exports.createRecipesIngredients = async (ingredient_id, recipe_id, quantity) => {
    const recipesIngredientsToAdd = {
        ingredient_id,
        recipe_id,
        quantity
    }

    RecipesIngredients.create(recipesIngredientsToAdd);
}

