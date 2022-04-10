module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("t_ingredients", {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      ingredient_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
    });
  
    return Ingredient;
  };