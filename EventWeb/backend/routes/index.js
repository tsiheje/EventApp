const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UsersControllers");
const PrestataireController = require("../controllers/PrestataireControllers");
const ServiceController = require("../controllers/ServiceController");
const EvenementController = require("../controllers/EvenementController");
const EvaluationController = require("../controllers/EvaluationController");

//router user   
router.post("/register", UserController.uploadProfileImage, UserController.register);
router.post("/login", UserController.login);

//router prestataire
router.get("/getAllPrestataire", PrestataireController.getAll);

//router service
router.get("/getAllService", ServiceController.getAll);
router.post("/addService", ServiceController.create);

//router evenement
router.get("/getAllEvenement", EvenementController.getAll);
router.post("/addEvenement", EvenementController.create);

//router evaluation
router.post("/addEvaluation", EvaluationController.create);

module.exports = router;