const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    phone_num: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "1" },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const Disaster = sequelize.define("disaster", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu adatdan daşary ýagdaý önem bar!" } },
    name_en: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu adatdan daşary ýagdaý önem bar!" } },
    name_ru: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu adatdan daşary ýagdaý önem bar!" } },
    disaster_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Surat giriziň!" }
        }
    }
});

const Welayat = sequelize.define("welayat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu welaýat önem bar!" } },
    name_en: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu welaýat önem bar!" } },
    name_ru: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu welaýat önem bar!" } }
});

const SOS = sequelize.define("sos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu edara önem bar!" } },
    name_en: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu edara önem bar!" } },
    name_ru: { type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu edara önem bar!" } },
    phone_num: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Telefon nomerini giriziň!" }
        }
    },
    latitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    longitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Açar sözini giriziň!" }
        }
    },
    role: { type: DataTypes.STRING, defaultValue: "SOS", allowNull: false },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" }
});

const Notification = sequelize.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title_tm: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    title_en: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    title_ru: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    description_tm: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    description_en: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    description_ru: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    latitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    longitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" }
});

const Instruction = sequelize.define("instruction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title_tm: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    title_en: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    title_ru: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    description_tm: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    description_en: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    description_ru: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Mazmunyny giriziň!" }
        }
    },
    instruction_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Surat giriziň!" }
        }
    },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" }
});

const SOSSubmit = sequelize.define("sossubmit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    latitude: { type: DataTypes.STRING, allowNull: false },
    longitude: { type: DataTypes.STRING, allowNull: false },
    ip_address: { type: DataTypes.STRING, allowNull: false },
    status: {
        type: DataTypes.ENUM('Pending', 'On-road', 'Helped', 'Blocked', 'Canceled'), allowNull: false, defaultValue: "Pending"
    }
});

const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyňyzy giriziň!", msg_ru: "Поле имени не может быть пустым!", msg_en: "Name field cannot be empty!" }
        }
    },
    email: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "E-poçtaňyzy giriziň!", msg_ru: "Поле электронной почты не может быть пустым!", msg_en: "Email field cannot be empty!" }
        }
    },
    subject: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Teswiriňiziň temasyny giriziň!", msg_ru: "Поле темы не может быть пустым!", msg_en: "Subject field cannot be empty!" }
        }
    },
    comment: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Teswiriňizi giriziň!", msg_ru: "Поле комментария не может быть пустым!", msg_en: "Comment field cannot be empty!" }
        }
    }

});

const Unit = sequelize.define("unit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    name_en: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    name_ru: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyny giriziň!" }
        }
    },
    phone_num: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Nomerini giriziň!" }
        }
    },
    latitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Coordinatasyny giriziň!" }
        }
    },
    longitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Coordinatasyny giriziň!" }
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Açar sözini giriziň!" }
        }
    },
    role: { type: DataTypes.STRING, defaultValue: "UNIT", allowNull: false },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" }
});

const SOSvitness = sequelize.define("sosvitness", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    latitude: { type: DataTypes.STRING, allowNull: false },
    longitude: { type: DataTypes.STRING, allowNull: false },
    ip_address: { type: DataTypes.STRING, allowNull: false },
    status: {
        type: DataTypes.ENUM('Pending', 'On-road', 'Helped', 'Blocked', 'Canceled'), allowNull: false, defaultValue: "Pending"
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    vitness_img: { type: DataTypes.STRING, allowNull: false }
});


Welayat.hasMany(SOS, { onDelete: "cascade", onUpdate: "cascade" });
SOS.belongsTo(Welayat);

SOS.hasMany(Notification, { onDelete: "cascade", onUpdate: "cascade" })
Notification.belongsTo(SOS);

Disaster.hasMany(SOSSubmit, { onDelete: "cascade", onUpdate: "cascade" });
SOSSubmit.belongsTo(Disaster);

SOS.hasMany(Unit, { onDelete: "cascade", onUpdate: "cascade" });
Unit.belongsTo(SOS);

Disaster.hasMany(Instruction, { onDelete: "cascade", onUpdate: "cascade" })
Instruction.belongsTo(Disaster);

Unit.hasMany(SOSSubmit, { onDelete: "cascade", onUpdate: "cascade" });
SOSSubmit.belongsTo(Unit);

Unit.hasMany(SOSvitness, { onDelete: "cascade", onUpdate: "cascade" });
SOSvitness.hasOne(Unit);

Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", role: "Admin" } })

module.exports = {
    Admin,
    Disaster,
    Welayat,
    User,
    SOS,
    Notification,
    SOSSubmit,
    Contact,
    Unit,
    Instruction,
    SOSvitness
};
