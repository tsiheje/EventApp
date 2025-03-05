const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UsersControllers");
const PrestataireController = require("../controllers/PrestataireControllers");
const ServiceController = require("../controllers/ServiceController");

//router user   
router.post("/register", UserController.uploadProfileImage, UserController.register);
router.post("/login", UserController.login);

//router prestataire
router.get("/getAllPrestataire", PrestataireController.getAll);

//router service
router.get("/getAllService", ServiceController.getAll)

module.exports = router;