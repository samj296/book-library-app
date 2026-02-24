const bcrypt = require("bcrypt");
const {accountType, User} = require("../models/userModel");



 async function signUp (req, res){ // this will be unprotected
    //Only the User can SignUp this way
    
    const {name, email, password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password || !name){
        return res.status(400).send("Unable to sign up invalid or missing data");
    };

    if(!emailRegex.test(email)){
        return res.status(400).send("Invalid email");
    };

    //checking if the email already exist in db
    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).send("Unable to sign up: invalid or duplicate data")
    };

    // using bcrypt to hash the password immediately
    const passwordHash = await bcrypt.hash(password, 10);
    
    //results in a hash that can be saved in the DB
    
    try{
        await User.create({name: name, email: email, passwordHash: passwordHash, role: accountType[0]}) // User
        return res.status(201).send(`You are signed up  ${name}`)
        // we can redirect to ("/login")
    }catch(err){
        return res.status(400).send("Unable to sign up");
    };
};


module.exports = {signUp}