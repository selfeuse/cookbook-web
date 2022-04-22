module.exports = (app) => {
  const recipes = require("../controllers/recipe.controller.js");
  const auth = require("../middleware/auth.js");
  var router = require("express").Router();

  router.get("/", recipes.getRecipes);
  router.get("/:id", recipes.getRecipeById);
  router.post("/", auth, recipes.createRecipe);

  app.use("/recipes", router);
};
