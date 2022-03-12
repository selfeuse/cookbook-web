import mongoose from "mongoose";
import Recipe from "../models/recipe.js";

export const getRecipes = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Recipe.countDocuments({});

    const recipes = await Recipe.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: recipes,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getRecipesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const recipes = await Recipe.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new Recipe({
    ...recipe,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const recipe = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(500).send("No recipe with that id.");

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      _id,
      { ...recipe, _id },
      { new: true }
    );

    res.status(201).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(500).send("No recipe with that id.");

    await Recipe.findByIdAndRemove(id);

    res.status(201).json({ message: "Recipe deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
