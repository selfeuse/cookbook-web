const db = require("../db/db.init");

const Ingredient = db.ingredients;

class IngredientService {
    static async getIngredientById(id) {
        return await Ingredient.findOne({ where: { id } });
    }

    static async getIngredientByName(name) {
        return await Ingredient.findOne({ where: { name } });
    }

    static async createIngredient(ingredient) {
        const alreadyExist = await this.getIngredientByName(ingredient.name);

        if (!alreadyExist) {
            return await Ingredient.create(ingredient);
        }

        return alreadyExist;
    }

    static async createIngredients(ingredients) {
        let newIngredients = ingredients.map(async (ingredient) => {
            const result = await this.createIngredient(ingredient)
            const quantity = ingredient.quantity;
 
            return {
                ...result,
                quantity
            };
        });

        return newIngredients;
    }

    static async deleteIngredient(id) {
        return await Ingredient.destroy({ where: { id } });
    }
}

module.exports = IngredientService;