const db = require("../db/db.init");

const Instruction = db.instructions;

class InstructionService {
  static async getById(id) {
    return await Instruction.findOne({ where: { id } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async getByRecipeId(recipe_id) {
    return await Instruction.findAll({ where: { recipe_id } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async create(instruction, recipe_id) {
    const instructionToAdd = {
      ...instruction,
      recipe_id,
    };

    return await Instruction.create(instructionToAdd).then((data) => {
      return data?.toJSON();
    });
  }

  static async createAll(instructions, recipe_id) {
    let promises = instructions.map(async (instruction) => {
      return await this.create(instruction, recipe_id);
    });

    return Promise.all(promises);
  }

  static async delete(id) {
    return await Instruction.destroy({ where: { id } });
  }
}

module.exports = InstructionService;
