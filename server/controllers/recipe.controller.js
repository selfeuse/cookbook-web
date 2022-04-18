const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Recipe = db.recipes;

exports.getRecipes = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Recipe.Count();

    const recipes = Recipe.findAll({
      order: [["id", "ASC"]],
      offset: startIndex,
      limit: LIMIT,
    });

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

exports.getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findOne({ where: { id: id } });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe doesn't exists." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  const { id } = req.params;

  const recipeToAdd = {
    userId: req.userId,
    title: req.body.title,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    rate: req.body.rate,
    tags: req.body.tags,
  };

  try {
    Recipe.create(recipeToAdd).then((newRecipe) => {
      return res.status(200).json({ newRecipe });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
