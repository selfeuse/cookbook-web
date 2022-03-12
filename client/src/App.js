import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/recipes" exact element={<Home />} />
                    <Route path="/recipes/search" exact element={<Home />} />
                    <Route path="/recipes/:id" element={<RecipeDetails />} />
                    <Route path="/auth" exact element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;