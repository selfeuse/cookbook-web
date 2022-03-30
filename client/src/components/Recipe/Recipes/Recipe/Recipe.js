import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { deleteRecipe } from "../../../../actions/recipes";

const Recipe = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const openRecipe = () => navigate(`/recipes/${recipe._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        component="img"
        className={classes.media}
        image={
          recipe.image
            ? recipe.image
            : process.env.PUBLIC_URL + "/image/no-img.jpg"
        }
        title={recipe.title}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          {recipe.dishType} - {recipe.duration} minutes
        </Typography>
        <Typography variant="h6" className={classes.title}>{recipe.title}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === recipe?.creator ||
          user?.result?._id === recipe?.creator) && (
          <Button
            size="small"
            onClick={() => dispatch(deleteRecipe(recipe._id))}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
        <IconButton onClick={openRecipe} className={classes.goToButton} style={{ position: "absolute" }}>
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Recipe;
