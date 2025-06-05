const express = require("express");
const {
  sendingMessages,
  sendLoginNotification,
} = require("../controllers/sendEmail.controllers.js");

const senderMailRoute = express.Router();

// Regular email sending route
senderMailRoute.route("/sendEmail").post(sendingMessages);

// Login notification route
senderMailRoute.route("/login").post(sendLoginNotification);

module.exports = senderMailRoute;
