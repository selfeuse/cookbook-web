import React from 'react';
import Recipe from './Recipe/Recipe';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

const Recipes = ({ setCurrentId }) => {
    const classes = useStyles();
    const { recipes, isLoading } = useSelector((state) => state.recipes);

    if (!recipes.length && !isLoading) return 'No recipes';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {recipes.map((recipe) => (
                    <Grid item key={recipe._id} xs={12} sm={6}>
                        <Recipe recipe={recipe} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Recipes;