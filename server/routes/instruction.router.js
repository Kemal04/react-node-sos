const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const InstructionController = require("../controllers/instruction.controller")

router.get("/", InstructionController.getAllInstruction);

router.get("/:instructionId", InstructionController.getSingleInstruction);

router.get("/create", InstructionController.getCreateInstruction);

router.post("/create", imageUpload.upload.single("instruction_img"), InstructionController.postCreateInstruction);

router.get("/edit/:instructionId", isAdmin, InstructionController.getEditInstruction);

router.post("/edit/:instructionId", isAdmin,imageUpload.upload.single("instruction_img"), InstructionController.postEditInstruction);

router.delete("/delete/:instructionId", InstructionController.deleteInstruction);

module.exports = router;