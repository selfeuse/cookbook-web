const db = require("../db/db.init");

const Instruction = db.instructions;

exports.getInstructionsByRecipeId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const instruction = await Instruction.findOne({ where: { recipe_id: id } });
  
      if (!instruction) {
        return res.status(404).json({ message: "Instruction doesn't exists." });
      }
  
      res.status(200).json(instruction);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
}

exports.getInstructionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const instruction = await Instruction.findOne({ where: { id } });
  
      if (!instruction) {
        return res.status(404).json({ message: "Instruction doesn't exists." });
      }
  
      res.status(200).json(instruction);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
}

exports.createInstruction = async (instruction, recipeId) => {
    try {
        const instructionToAdd = {
            ...instruction,
            recipe_id: recipeId
        }

        Instruction.create(instructionToAdd).then((newInstruction) => {
          return newInstruction;
        });
    } catch (error) {
      console.log(error);
    }
}

exports.createInstructions = async (instructionsToAdd, recipeId) => {  
    try {
        let newInstructions = instructionsToAdd.map((instruction) => {
            return this.createInstruction(instruction, recipeId);
        });
  
      return(newInstructions);
    } catch (error) {
      console.log(error);
    }
}

exports.deleteInstruction = async (req, res) => {
  const { id } = req.params;

  try {
    await Instruction.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
}