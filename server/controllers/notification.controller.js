const { Notification, SOS } = require("../models/model");

module.exports.getAllNotification = async (req, res) => {
    await Notification.findAll({include: {model: SOS}}).then((notification) => {
        res.json({ notification: notification })
    })
}

module.exports.getCreatNotification = async (req, res) => {
    await Notification.findAll().then((sos) => {res.json({ sos: sos })})
}

module.exports.postCreateNotification = async (req, res) => {
    await Notification.create({
        title_tm: req.body.title_tm,
        title_en: req.body.title_en,
        title_ru: req.body.title_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        soId: req.body.soId
    })
        .then(() => { res.json({ success: "Adatdan daşary ýagdaý üstünlikli goşuldy" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.getEditNotification = async (req, res) => {
    await Notification.findOne({ where: { id: req.params.notificationId } })
        .then((notification) => { res.json({ notification: notification }) })
}

module.exports.postEditNotification = async (req, res) => {
    await Notification.update({
        title_tm: req.body.title_tm,
        description_tm: req.body.description_tm,
        title_en: req.body.title_en,
        description_en: req.body.description_en,
        title_ru: req.body.title_ru,
        description_ru: req.body.description_ru,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        soId: req.body.soId
    }, { where: { id: req.params.notificationId } }).then(() => {
        res.json({ success: "Üstünlikli üýtgedildi" })
    }).catch((error) => { res.status(500).json({ error: error }) })
}

module.exports.deleteNotification = async (req, res) => {
    await Notification.findOne({ where: { id: req.params.notificationId } }).then((notification) => {
        if (notification) {
            notification.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
}