const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
const passport = require("../auth/passport");

router.post("/signup", authController.signUp);

router.post("/login", passport.authenticate("local"), (req, res) => {
    // I will add the EJS here later
    res.status(200).json({
        message: "Login successful",
        user: req.user
    })
});

module.exports = router;