import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { createRecipe } from "../../../actions/recipes";

const dishTypes = [
  {
    value: "Breakfast",
  },
  {
    value: "Dish",
  },
  {
    value: "Snack",
  },
  {
    value: "Drink",
  },
  {
    value: "Dessert",
  },
  {
    value: "Other",
  },
];

const RecipeCreate = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [recipeData, setRecipeData] = useState({
    title: "",
    dishType: "",
    image: "",
    duration: "",
    rate: 0,
    tags: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

      dispatch(
        createRecipe({ ...recipeData, name: user?.result?.name }, navigate)
      );

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create recipes.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setRecipeData({
      title: "",
      dishType: "",
      image: "",
      duration: "",
      rate: 0,
      tags: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          Creating a recipe
        </Typography>
        <TextField
          name="title"
          margin="normal"
          variant="outlined"
          label="Title"
          fullWidth
          value={recipeData.title}
          onChange={(e) =>
            setRecipeData({ ...recipeData, title: e.target.value })
          }
        />
        <TextField
          name="duration"
          margin="normal"
          variant="outlined"
          label="Duration"
          type="number"
          fullWidth
          value={recipeData.duration}
          onChange={(e) =>
            setRecipeData({ ...recipeData, duration: e.target.value })
          }
        />
        <TextField
          name="tags"
          margin="normal"
          variant="outlined"
          label="Tags"
          fullWidth
          value={recipeData.tags}
          onChange={(e) =>
            setRecipeData({ ...recipeData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="dishType"
          margin="normal"
          variant="outlined"
          label="Dish type"
          select
          fullWidth
          value={recipeData.dishType}
          onChange={(e) =>
            setRecipeData({ ...recipeData, dishType: e.target.value })
          }
        >
          {dishTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <Rating
          name="rate"
          value={recipeData.rate}
          onChange={(e) =>
            setRecipeData({ ...recipeData, rate: e.target.value })
          }
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setRecipeData({ ...recipeData, image: base64 })
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default RecipeCreate;
