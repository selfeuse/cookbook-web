module.exports = (app) => {
  const recipes = require("../controllers/recipe.controller.js");
  var router = require("express").Router();

 // router.get("/search", recipes.getRecipesBySearch);
  router.get("/", recipes.getRecipes);
  router.get("/:id", recipes.getRecipeById);
  router.post("/", recipes.createRecipe);

  app.use("/recipes", router);
};
