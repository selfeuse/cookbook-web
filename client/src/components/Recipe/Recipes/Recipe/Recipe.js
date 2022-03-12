import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Rating } from "@material-ui/lab";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { deleteRecipe } from "../../../../actions/recipes";

const Recipe = ({ recipe, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const openRecipe = () => navigate(`/recipes/${recipe._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openRecipe}>
        <CardMedia
          component="img"
          className={classes.media}
          image={recipe.image}
          title={recipe.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{recipe.title}</Typography>
          <Typography variant="body2">{recipe.name}</Typography>
          <Typography variant="body2">
            {moment(recipe.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === recipe?.creator ||
            user?.result?._id === recipe?.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(recipe._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {recipe.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" className={classes.title} gutterBottom>
            {recipe.dishType} - {recipe.duration} minutes
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {(user?.result?.googleId === recipe?.creator ||
            user?.result?._id === recipe?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deleteRecipe(recipe._id))}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
          <Rating name="rate" value={recipe.rate} readOnly />
        </CardActions>
      </ButtonBase>
    </Card>
  );
};

export default Recipe;
