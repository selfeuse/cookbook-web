const IngredientService = require("../services/Ingredient.service.js");

exports.getIngredientById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await IngredientService.getIngredientById(id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient doesn't exists." });
    }

    res.status(200).json(ingredient);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.deleteIngredient = async (req, res) => {
    const { id } = req.params;
  
    try {
      await IngredientService.destroy(id);

      res.status(200);
    } catch (error) {
      console.log(error);
    }
};
