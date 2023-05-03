const { User } = require("../models/model");

module.exports.getAllUser = async (req, res) => {
    await User.findAll().then((users) => {
        res.json({ users: users })
    })
}