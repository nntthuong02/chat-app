const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller");

router.post("/create", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/find/:userId", authController.findUser);
router.get("/", authController.getUser);
router.post("/friends", authController.getFriends);
router.post("/online/", authController.updateOnline);
router.post("/profile", authController.updateProfile);
module.exports = router;
