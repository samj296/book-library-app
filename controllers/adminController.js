const {User, accountType} = require("../models/userModel")
const bcrypt = require("bcrypt");

function getDashBoard(req, res){
    res.render("admin/dashBoard", {
        user: req.user
    });
};

function manageStaff(req, res){
    res.render("admin/staff", {
        user: req.user
    });
};


async function ensuredAdminExists(){
    let admin = await User.findOne({role: accountType[2] }); //["user", "staff", "admin"]; 

    if(!admin){
        const passwordHashed =  await bcrypt.hash("PASSWORD123",10);
        admin =  await User.create({
                        email: "admin@admin.com",
                        passwordHash: passwordHashed,
                        role: "admin",
                        mustChangePassword: true
                    });
        };
    return admin
};


module.exports = {getDashBoard, manageStaff, ensuredAdminExists}