const {accountType} = require("../models/userModel"); //["user", "staff", "admin"];

module.exports = function ensuredAdmin(req, res, next){
    if(req.isAuthenticated && req.isAuthenticated() 
        && req.user && req.user.role === accountType[2]){
        return next();
    }

    return res.status(403).send("Access denied.");
};