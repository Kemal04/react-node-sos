const { Disaster } = require("../models/model");
const fs = require('fs')

module.exports.getAllDisaster = async (req, res) => {
    await Disaster.findAll().then((disaster) => {
        res.json({ disaster: disaster })
    })
}

module.exports.postCreateDisaster = async (req, res) => {
    await Disaster.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        disaster_img: req.file.filename
    }).then(() => {
        res.json({ success: "Adatdan daşary ýagdaý üstünlikli goşuldy" })
    }).catch((error) => {
        res.status(500).json({ error: error })
    })
}

module.exports.getEditDisaster = async (req, res) => {
    await Disaster.findOne({ where: { id: req.params.disasterId } })
        .then((disaster) => { res.json({ disaster: disaster }) })
}

module.exports.postEditDisaster = async (req, res) => {
    let img = req.body.disaster_img;
    if (req.file) {
        fs.unlink("/public/img/disaster/" + img, err => { console.log(err); })
        img = req.file.filename;
    }
    await Disaster.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        disaster_img: img
    }, { where: { id: req.params.disasterId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteDisaster = async (req, res) => {
    await Disaster.findOne({ where: { id: req.params.disasterId } }).then((disaster) => {
        if (disaster) {
            fs.unlink("/public/img/disaster/" + disaster.disaster_img, err => { })
            disaster.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}