const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

const UserController = require("../controllers/user.controller")

router.get("/", UserController.getAllUser);

module.exports = router;