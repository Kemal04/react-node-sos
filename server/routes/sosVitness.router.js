const express = require('express');
const { isAdmin,isUNIT } = require('../middlewares/authMiddleware');
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

const sosVitnessController = require("../controllers/sosVitness.controller")

router.get("/", sosVitnessController.getAllVitness);

router.get("/create",  sosVitnessController.getCreateVitness);

router.post("/create",imageUpload.upload.single("vitness_img"), sosVitnessController.postCreateVitness);

router.get("/edit/:sosvitnessId", sosVitnessController.getEditVitness);

router.post("/edit/:sosvitnessId", sosVitnessController.postEditVitness);

router.delete("/delete/:sosvitnessId", sosVitnessController.deleteVitness);

router.get("/unit/:unitId", sosVitnessController.getSOSforVitness)


module.exports = router;