const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

const NotificationController = require("../controllers/notification.controller")

router.get("/", NotificationController.getAllNotification);

router.get("/create", NotificationController.getCreatNotification);

router.post("/create", NotificationController.postCreateNotification);

router.get("/edit/:notificationId", isAdmin, NotificationController.getEditNotification);

router.post("/edit/:notificationId", isAdmin, NotificationController.postEditNotification);

router.delete("/delete/:notificationId", NotificationController.deleteNotification);

module.exports = router;