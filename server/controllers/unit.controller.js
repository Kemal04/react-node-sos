const { SOS, Unit } = require("../models/model");
const bcrypt = require('bcrypt');

module.exports.getAllUnit = async (req, res) => {
    await Unit.findAll({ include: { model: SOS } }).then((unit) => {
        res.json({ unit: unit })
    })
}

module.exports.postCreateUnit = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await Unit.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        phone_num: req.body.phone_num,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        password: hash,
        soId: req.body.soId,
        checked: "1"
    })
        .then(() => { res.json({ success: "Ulagynyz üstünlikli goşuldy" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.getEditUnit = async (req, res) => {
    await Unit.findOne({ where: { id: req.params.unitId } }).then((unit) => {
        res.json({ unit: unit })
    })
}

module.exports.postEditUnit = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await Unit.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        phone_num: req.body.phone_num,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        password: hash,
        checked: req.body.checked,
        soId: req.body.soId
    }, { where: { id: req.params.unitId } }).then(() => {
        res.json({ success: "Üstünlikli üytgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteUnit = async (req, res) => {
    await Unit.findOne({ where: { id: req.params.unitId } }).then((unit) => {
        if (unit) {
            unit.destroy();
            res.json({ success: "Üstünlikli pozuldy" })
        } res.json({ error: "Tapylmady" })
    })
}