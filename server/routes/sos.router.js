const express = require('express');
const { isAdmin, isSOS, isUNIT } = require('../middlewares/authMiddleware');
const router = express.Router();

const SOSController = require("../controllers/sos.controller")

router.get("/", SOSController.getAllSOS);

router.get("/create", isAdmin, SOSController.getCreateSOS);

router.post("/create", isAdmin, SOSController.postCreateSOS);

router.get("/edit/:sosId", isAdmin, SOSController.getEditSOS);

router.post("/edit/:sosId", isAdmin, SOSController.postEditSOS);

router.delete("/delete/:sosId", isAdmin, SOSController.deleteSOS);


module.exports = router;