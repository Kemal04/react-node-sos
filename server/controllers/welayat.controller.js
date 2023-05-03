const { Welayat } = require("../models/model");

module.exports.getAllWelayat = async (req, res) => {
    await Welayat.findAll().then((welayat) => {
        res.json({ welayat: welayat })
    })
}

module.exports.postCreateWelayat = async (req, res) => {
    await Welayat.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru
    })
        .then(() => { res.json({ success: "Welayat üstünlikli goşuldy" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.getEditWelayat = async (req, res) => {
    await Welayat.findOne({ where: { id: req.params.welayatId } })
        .then((welayat) => { res.json({ welayat: welayat }) })
}

module.exports.postEditWelayat = async (req, res) => {
    await Welayat.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru
    }, { where: { id: req.params.welayatId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteWelayat = async (req, res) => {
    await Welayat.findOne({ where: { id: req.params.welayatId } }).then((welayat) => {
        if (welayat) {
            welayat.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}