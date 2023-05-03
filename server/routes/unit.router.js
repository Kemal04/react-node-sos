const express = require('express');
const { isAdmin, isSOS } = require('../middlewares/authMiddleware');
const router = express.Router();

const UnitController = require("../controllers/unit.controller")

router.get("/",  UnitController.getAllUnit);

router.post("/create", UnitController.postCreateUnit);

router.get("/edit/:unitId", isSOS, UnitController.getEditUnit);

router.post("/edit/:unitId", isSOS, UnitController.postEditUnit);

router.delete("/delete/:unitId", isSOS, UnitController.deleteUnit);

module.exports = router;