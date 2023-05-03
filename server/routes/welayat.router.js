const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


const WelayatController = require("../controllers/welayat.controller")

router.get("/", WelayatController.getAllWelayat);

router.post("/create", isAdmin, WelayatController.postCreateWelayat);

router.get("/edit/:welayatId", isAdmin, WelayatController.getEditWelayat);

router.post("/edit/:welayatId", isAdmin, WelayatController.postEditWelayat);

router.delete("/delete/:welayatId", isAdmin, WelayatController.deleteWelayat);

module.exports = router;