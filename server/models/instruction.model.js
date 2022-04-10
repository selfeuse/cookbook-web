module.exports = (sequelize, Sequelize) => {
    const Instruction = sequelize.define("t_instructions", {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      instruction_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeId: {
        type: Sequelize.INTEGER,
      },
      step: {
        type: Sequelize.INTEGER,
      },
      instruction: {
        type: Sequelize.TEXT,
      },
    });
  
    return Instruction;
  };