module.exports = (app) => {
    const instructions = require("../controllers/instructions.controller.js");
    var router = require("express").Router();
  
    router.get("/:id", instructions.getInstructionsByRecipeId);
    router.get("/:id", instructions.getInstructionById);
    router.delete("/:id", instructions.deleteInstruction);
  
    app.use("/instructions", router);
  };
  