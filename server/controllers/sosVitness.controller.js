const { SOSvitness, Disaster, Unit, Welayat } = require("../models/model");
const ip = require('ip')
module.exports.getAllVitness = async (req, res) => {
    await SOSvitness.findAll({ include: [{ model: Disaster }, { model: Unit }] }).then((sosvitness) => {
        res.json({ sosvitness: sosvitness })
    })
}

module.exports.getCreateVitness = async (req, res) => {
    await Disaster.findAll().then((disaster) => { res.json({ disaster: disaster }) })
}

module.exports.postCreateVitness = async (req, res) => {
    console.log(req.body);
    await SOSvitness.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ip_address: ip.address(),
        description: req.body.description,
        unitId: req.body.unitId,
        vitness_img: req.file.filename
    }).then((sosvitness) => {
        res.json({
            success: "Sizin maglumatlarynyz ugradyldy!", sosvitness: sosvitness
        })
    }).catch((error) => {
        res.status(500).json({ error: error })
    })
}

module.exports.getEditVitness = async (req, res) => {
    await SOSvitness.findOne({ where: { id: req.params.sosvitnessId } })
        .then((sosvitness) => { res.json({ sosvitness: sosvitness }) })
}

module.exports.postEditVitness = async (req, res) => {
    await SOSvitness.update({
        status: req.body.status
    }, { where: { id: req.params.sosvitnessId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteVitness = async (req, res) => {
    await SOSvitness.findOne({ where: { id: req.params.sosvitnessId } }).then((sosvitness) => {
        if (sosvitness) {
            sosvitness.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}


module.exports.getSOSforVitness = async (req, res) => {
    await SOSvitness.findAll({ include: [{ model: Unit }, { model: Disaster }], where: { unitId: req.user.id } }).then((sossubmit) => {
        res.json({ sossubmit: sossubmit })
    })
}