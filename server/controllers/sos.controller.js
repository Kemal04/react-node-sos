const { SOS, Welayat } = require("../models/model");
const bcrypt = require('bcrypt');

module.exports.getAllSOS = async (req, res) => {
    await SOS.findAll({ include: { model: Welayat } }).then((sos) => {
        res.json({ sos: sos })
    })
}

module.exports.getCreateSOS = async (req, res) => {
    await Welayat.findAll().then((welayat) => {
        res.json({ welayat: welayat })
    })
}

module.exports.postCreateSOS = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await SOS.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        phone_num: req.body.phone_num,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        password: hash,
        welayatId: req.body.welayatId,
        checked: "1",
    })
        .then(() => { res.json({ success: "SOS edarasy üstünlikli goşuldy" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.getEditSOS = async (req, res) => {
    await SOS.findOne({ where: { id: req.params.sosId } }).then((sos) => {
        res.json({ sos: sos })
    })
}

module.exports.postEditSOS = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await SOS.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        phone_num: req.body.phone_num,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        password: hash,
        welayatId: req.body.welayatId,
        role: req.body.role,
        checked: req.body.checked
    }, { where: { id: req.params.sosID } }).then(() => {
        res.json({ success: "Üstünlikli üytgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteSOS = async (req, res) => {
    await SOS.findOne({ where: { id: req.params.sosId } }).then((sos) => {
        if (sos) {
            sos.destroy()
            res.json({ success: "Üstünlikli pozuldy" })
        } else (
            res.json({ error: "Tapylmady" })
        )
    })
}

