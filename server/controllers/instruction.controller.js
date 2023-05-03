const { Instruction, Disaster } = require("../models/model");
const fs = require('fs')
module.exports.getAllInstruction = async (req, res) => {
    await Instruction.findAll({ include: { model: Disaster } }).then((instruction) => {
        res.json({ instruction: instruction })
    })
}

module.exports.getSingleInstruction = async (req, res) => {
    await Instruction.findOne({ where: { id: req.params.instructionId } }).then((instruction) => {
        res.json({ instruction: instruction })
    })
}

module.exports.getCreateInstruction = async (req, res) => {
    await Disaster.findAll().then((disaster) => { res.json({ disaster: disaster }) })
}

module.exports.postCreateInstruction = async (req, res) => {
    await Instruction.create({
        title_tm: req.body.title_tm,
        title_en: req.body.title_en,
        title_ru: req.body.title_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        disasterId: req.body.disasterId,
        instruction_img: req.file.filename
    })
        .then(() => { res.json({ success: " üstünlikli goşuldy" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.getEditInstruction = async (req, res) => {
    await Instruction.findOne({ where: { id: req.params.instructionId } })
        .then((instruction) => { res.json({ instruction: instruction }) })
}

module.exports.postEditInstruction = async (req, res) => {
    let img = req.body.instruction_img;
    if (req.file) {
        fs.unlink("/public/img/instruction/" + img, err => { console.log(err); })
        img = req.file.filename;
    }
    await Instruction.update({
        title_tm: req.body.title_tm,
        description_tm: req.body.description_tm,
        title_en: req.body.title_en,
        description_en: req.body.description_en,
        title_ru: req.body.title_ru,
        description_ru: req.body.description_ru,
        disasterId: req.body.disasterId,
        instruction_img: img
    }, { where: { id: req.params.instructionId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteInstruction = async (req, res) => {
    await Instruction.findOne({ where: { id: req.params.instructionId } }).then((instruction) => {
        if (instruction) {
            instruction.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}