const { SOSSubmit, Disaster, Unit, Welayat } = require("../models/model");
const ip = require('ip')
module.exports.getAllSubmit = async (req, res) => {
    await SOSSubmit.findAll({ include: [{ model: Disaster }, { model: Unit }] }).then((sossubmit) => {
        res.json({ sossubmit: sossubmit })
    })
}

module.exports.getCreateSubmit = async (req, res) => {
    await Disaster.findAll().then((disaster) => { res.json({ disaster: disaster }) })
}

module.exports.postCreateSubmit = async (req, res) => {
    console.log(req.body);
    await SOSSubmit.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ip_address: ip.address(),
        disasterId: req.body.disasterId,
        unitId: req.body.unitId
    }).then((submit) => {
        res.json({
            success: "Sizin maglumatlarynyz ugradyldy!", submit: submit
        })
    }).catch((error) => {
        res.status(500).json({ error: error })
    })
}

module.exports.getEditSubmit = async (req, res) => {
    await SOSSubmit.findOne({ include: [{ model: Disaster }, { model: Unit }],  where: { id: req.params.sossubmitId } })
        .then((sossubmit) => { res.json({ sossubmit: sossubmit }) })
}

module.exports.postEditSubmit = async (req, res) => {
    await SOSSubmit.update({
        status: req.body.status
    }, { where: { id: req.params.sossubmitId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteSubmit = async (req, res) => {
    await SOSSubmit.findOne({ where: { id: req.params.sossubmitId } }).then((sossubmit) => {
        if (sossubmit) {
            sossubmit.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}


module.exports.getSOSforUnit = async (req, res) => {
    await SOSSubmit.findAll({ include: [{ model: Unit }, {model:Disaster}], where: { unitId: req.user.id } }).then((sossubmit) => {
        res.json({ sossubmit: sossubmit })
    })
}