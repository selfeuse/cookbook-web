import express from "express";

import {
  getRecipes,
  getRecipesBySearch,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
} from "../controllers/recipes.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getRecipesBySearch);
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", auth, createRecipe);
router.patch("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;
