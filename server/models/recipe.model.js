module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("t_recipes", {
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    dishType: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.TEXT,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    rate: {
      type: Sequelize.INTEGER,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
  });

  return Recipe;
};
