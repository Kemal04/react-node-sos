const express = require('express');
const { isAdmin,isUNIT } = require('../middlewares/authMiddleware');
const router = express.Router();

const sosSubmitController = require("../controllers/sosSubmit.controller")

router.get("/", sosSubmitController.getAllSubmit);

router.get("/unit", isUNIT, sosSubmitController.getSOSforUnit)

router.get("/create",  sosSubmitController.getCreateSubmit);

router.post("/create", sosSubmitController.postCreateSubmit);

router.get("/edit/:sossubmitId", sosSubmitController.getEditSubmit);

router.post("/edit/:sossubmitId", sosSubmitController.postEditSubmit);

router.delete("/delete/:sossubmitId", sosSubmitController.deleteSubmit);



module.exports = router;