const db = require("../db/db.init");

const Ingredient = db.ingredients;

class IngredientService {
  static async getById(id) {
    return await Ingredient.findOne({ where: { id } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async getByName(name) {
    return await Ingredient.findOne({ where: { name } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async create(ingredient) {
    const ingredientAlreadyExists = await this.getByName(ingredient.name);

    if (!ingredientAlreadyExists) {
      return await Ingredient.create(ingredient).then((data) => {
        return data?.toJSON();
      });
    }

    return ingredientAlreadyExists;
  }

  static async createAll(ingredients) {
    let promises = ingredients.map(async (ingredient) => {
      const result = await this.create(ingredient);
      const quantity = ingredient.quantity;

      return {
        ...result,
        quantity,
      };
    });

    return Promise.all(promises);
  }

  static async delete(id) {
    return await Ingredient.destroy({ where: { id } });
  }
}

module.exports = IngredientService;
