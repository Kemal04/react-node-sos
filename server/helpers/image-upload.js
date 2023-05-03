const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "disaster_img") {
            cb(null, './public/img/disaster/');
        }
        else if (file.fieldname === "instruction_img") {
            cb(null, './public/img/instruction/');
        }
        else if (file.fieldname === "vitness_img") {
            cb(null, './public/img/vitness/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, path.parse(file.fieldname).name + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}); 

module.exports.upload = upload;