const { Admin, User, SOS, Unit } = require("../models/model")
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.rootman = async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        success: "Login etdiniz",
                        token: sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
}

module.exports.register = async (req, res) => {
    const { name, surname, phone_num, password } = req.body;
    const user = await User.findOne({ where: { phone_num: phone_num } });
    if (!user) {
        var hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                name: name,
                surname: surname,
                phone_num: phone_num,
                password: hashedPassword
            });
            res.json({
                token: sign({ id: user.id, name: user.name, surname: user.surname, phone_num: user.phone_num, role: user.role }, process.env.JWT_key, {
                    expiresIn: '24h'
                })
            });
        }
        catch (err) {
            console.log(err)
        }
    } else {
        res.json({ error: "Sizin nomeriniz bilen on hasap acylypdyr" })
    }
}

module.exports.login = async (req, res) => {
    const { phone_num, password } = req.body;
    await User.findOne({ where: { phone_num: phone_num } })
        .then((user) => {
            if (!user || user.phone_num !== phone_num) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: user.id, name: user.name, surname: user.surname, phone_num: user.phone_num, role: user.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
}


module.exports.sos_login = async (req, res) => {
    const { phone_num, password } = req.body;
    await SOS.findOne({ where: { phone_num: phone_num } })
        .then((sos_admin) => {
            if (!sos_admin || sos_admin.phone_num !== phone_num) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, sos_admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: sos_admin.id, phone_num: sos_admin.phone_num, latitude: sos_admin.latitude, longitude: sos_admin.longitude, welayatId: sos_admin.welayatId, role: sos_admin.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
}

module.exports.unit_login = async (req, res) => {
    const { phone_num, password } = req.body;
    await Unit.findOne({ where: { phone_num: phone_num } })
        .then((unit_admin) => {
            if (!unit_admin || unit_admin.phone_num !== phone_num) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, unit_admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: unit_admin.id, name_tm: unit_admin.name_tm, phone_num: unit_admin.phone_num, latitude: unit_admin.latitude, longitude: unit_admin.longitude, soId: unit_admin.soID, role: unit_admin.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
}

module.exports.current_user = async (req, res) => {
    res.json(req.user)
}

module.exports.infoGet = async (req, res) => {
    const id = req.params.id;
    const basicInfo = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    res.json({ basicInfo: basicInfo });
}