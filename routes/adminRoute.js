const express = require("express");
const router = express.Router()

const ensuredAdmin = require("../middleware/ensureAdmin");
const {getDashBoard, manageStaff} = require("../controllers/adminController")

router.get("/dashboard", ensuredAdmin, getDashBoard);
router.get("/staff", ensuredAdmin, manageStaff);

module.exports = router;

