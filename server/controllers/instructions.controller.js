const InstructionService = require("../services/Instruction.service.js");

exports.getInstructionsByRecipeId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const instruction = await InstructionService.getByRecipeId(id);
  
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
      const instruction = await InstructionService.getById(id);
  
      if (!instruction) {
        return res.status(404).json({ message: "Instruction doesn't exists." });
      }
  
      res.status(200).json(instruction);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
}

exports.deleteInstruction = async (req, res) => {
  const { id } = req.params;

  try {
    await InstructionService.delete(id);

    res.status(200);
  } catch (error) {
    console.log(error);
  }
}