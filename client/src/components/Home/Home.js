import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Recipes from '../Recipe/Recipes/Recipes';
import { getRecipesBySearch } from '../../actions/recipes';
import useStyles from './styles';
import Pagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchRecipe();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchRecipe = () => {
        if (search.trim() || tags) {
            dispatch(getRecipesBySearch({ search, tags: tags.join(',') }))

            navigate(`/recipes/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Recipes />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search recipes" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search tags" variant="outlined" />
                            <Button onClick={searchRecipe} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;