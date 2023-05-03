const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

const DisasterController = require("../controllers/disaster.controller")

router.get("/", DisasterController.getAllDisaster);

router.post("/create", isAdmin, imageUpload.upload.single("disaster_img"), DisasterController.postCreateDisaster);

router.get("/edit/:disasterId", isAdmin, DisasterController.getEditDisaster);

router.post("/edit/:disasterId", isAdmin, imageUpload.upload.single("disaster_img"), DisasterController.postEditDisaster);

router.delete("/delete/:disasterId", isAdmin, DisasterController.deleteDisaster);

module.exports = router;