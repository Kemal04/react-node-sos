const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { Contact } = require("../models/model");

const ContactController = require("../controllers/contact.controller.js")

router.get("/", ContactController.getAllContact);

router.post("/create", ContactController.postCreateContact);

router.get("/edit/:contactId", isAdmin, ContactController.getEditContact);

router.post("/edit/:contactId", isAdmin, ContactController.postEditContact);

router.delete("/delete/:contactId", isAdmin, ContactController.deleteContact);

module.exports = router;