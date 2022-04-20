const db = require("../db/db.init");

const Instruction = db.instructions;

class InstructionService {
  static async getInstructionById(id) {
    return await Instruction.findOne({ where: { id } });
  }

  static async getInstructionsByRecipeId(recipe_id) {
    return await Instruction.findAll({ where: { recipe_id } });
  }

  static async createInstruction(instruction, recipeId) {
    const instructionToAdd = {
      ...instruction,
      recipe_id: recipeId,
    };

    return await Instruction.create(instructionToAdd);
  }

  static async createInstructions(instructions, recipe_id) {
    let newInstructions = instructions.map(async (instruction) => {
      return await this.createInstruction(instruction, recipe_id);
    });

    return newInstructions;
  }

  static async deleteInstruction(id) {
    return await Instruction.destroy({ where: { id } });
  }
}

module.exports = InstructionService;
