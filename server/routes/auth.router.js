const express = require('express');
const router = express.Router();
const { validateToken,isAdmin } = require("../middlewares/authMiddleware");

const AuthController = require("../controllers/auth.controller");

router.post("/rootman", AuthController.rootman);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post("/sos_login", AuthController.sos_login);

router.post("/unit_login", AuthController.unit_login);

router.get("/current_user", validateToken, AuthController.current_user);

router.get("/basicinfo/:id", AuthController.infoGet);

module.exports = router;