import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { getRecipe, getRecipesBySearch } from "../../../actions/recipes";

const RecipeDetails = () => {
  const { recipe, recipes, isLoading } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id]);

  useEffect(() => {
    if (recipe) {
      dispatch(
        getRecipesBySearch({ search: "none", tags: recipe?.tags.join(",") })
      );
    }
  }, [recipe]);

  if (!recipe) return null;

  const openRecipe = (_id) => navigate(`/recipes/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedRecipes = recipes.filter(({ _id }) => _id !== recipe._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {recipe.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {recipe.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant="h6">Created by: {recipe.name}</Typography>
          <Typography variant="body1">
            {moment(recipe.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              recipe.image ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={recipe.title}
          />
        </div>
      </div>
      {!!recommendedRecipes.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <div className={classes.recommendedRecipes}>
            {recommendedRecipes.map(({ title, name, image, _id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openRecipe(_id)}
                key={_id}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <img src={image} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default RecipeDetails;
