module.exports = (app) => {
    const ingredients = require("../controllers/ingredients.controller.js");
    var router = require("express").Router();
  
    router.get("/:id", ingredients.getIngredientById);
    router.delete("/:id", ingredients.deleteIngredient);
  
    app.use("/ingredients", router);
  };
  