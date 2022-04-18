const db = require("../db/db.init");
const recipesIngredients = require("../controllers/recipes_ingredients.controller.js");

const Ingredient = db.ingredients;

exports.getIngredientById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findOne({ where: { id } });

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient doesn't exists." });
    }

    res.status(200).json(ingredient);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.getIngredientByName = async (name) => {
  try {
    const ingredient = await Ingredient.findOne({ where: { name } });

    if (!ingredient) {
      return null;
    }

    return ingredient;
  } catch (error) {
    console.log(error);
  }
};

exports.createIngredient = async (ingredientToAdd) => {
  try {
    let result = this.getIngredientByName(ingredientToAdd.name);
    if (result) {
      Ingredient.create(ingredientToAdd).then((newIngredient) => {
        return newIngredient;
      });
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createIngredients = async (ingredientsToAdd, recipeId) => {
  try {
    let newIngredients = ingredientsToAdd.map((ingredient) => {
        const result = this.createIngredient(ingredient)
        const quantity = ingredient.quantity;
        
        recipesIngredients.createRecipesIngredients(result.id, recipeId, quantity);
      
        return {
            ...result,
            quantity
        };
    });

    return newIngredients;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteIngredient = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Ingredient.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
    }
};
