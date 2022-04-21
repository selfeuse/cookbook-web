const db = require("../db/db.init");

const Instruction = db.instructions;

class InstructionService {
  static async getInstructionById(id) {
    return await Instruction.findOne({ where: { id } }).then(data => {
      if (data) return (data.toJSON());
    });
  }

  static async getInstructionsByRecipeId(recipe_id) {
    return await Instruction.findAll({ where: { recipe_id } }).then(data => {
      if (data) return (data.toJSON());
    });
  }

  static async createInstruction(instruction, recipeId) {
    const instructionToAdd = {
      ...instruction,
      recipe_id: recipeId,
    };

    return await Instruction.create(instructionToAdd).then(data => {
      if (data) return (data.toJSON());
    });
  }

  static async createInstructions(instructions, recipe_id) {
    let promises = instructions.map(async (instruction) => {
      return await this.createInstruction(instruction, recipe_id);
    });

    return Promise.all(promises);
  }

  static async deleteInstruction(id) {
    return await Instruction.destroy({ where: { id } });
  }
}

module.exports = InstructionService;
