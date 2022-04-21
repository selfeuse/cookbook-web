const db = require("../db/db.init");

const Ingredient = db.ingredients;

class IngredientService {
    static async getIngredientById(id) {
        return await Ingredient.findOne({ where: { id } }).then(data => {
            if (data) return (data.toJSON());
          });
    }

    static async getIngredientByName(name) {
        return await Ingredient.findOne({ where: { name } }).then(data => {
            if (data) return (data.toJSON());
          });
    }

    static async createIngredient(ingredient) {
        const alreadyExist = await this.getIngredientByName(ingredient.name);

        if (!alreadyExist) {
            return await Ingredient.create(ingredient).then(data => {
                if (data) return (data.toJSON());
              });
        }

        return alreadyExist;
    }

    static async createIngredients(ingredients) {
        let promises = ingredients.map(async (ingredient) => {
            const result = await this.createIngredient(ingredient)
            const quantity = ingredient.quantity;
 
            return {
                ...result,
                quantity
            };
        });

        return Promise.all(promises);
    }

    static async deleteIngredient(id) {
        return await Ingredient.destroy({ where: { id } });
    }
}

module.exports = IngredientService;