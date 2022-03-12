import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    dishType: {
        type: String,
        enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
    },
    image: {
        type: String,
        default: 'urlImg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: {
        type: String
    },
    name: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    rate: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String]
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;