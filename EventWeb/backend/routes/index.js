const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UsersControllers");

//router user   
router.post("/register", UserController.uploadProfileImage, UserController.register);
router.post("/login", UserController.login);

module.exports = router;