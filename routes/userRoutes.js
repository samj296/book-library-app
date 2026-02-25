const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensuredLoggedIn = require("../middleware/ensureLoggedIn");

router.get("/protected", ensuredLoggedIn, userController.getProtected);

module.exports = router;