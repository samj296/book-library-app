const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {User, accountType} = require("../models/userModel");

//Strategy: how we verify credentials

passport.use(
    //As I am not using the username(passport default) I have to tell passport that my username field is email
    new LocalStrategy({usernameField: "email"},async(email, password, done) => {
        try{
            const user = await User.findOne({email});
            if (!user) return done(null, false);

            //only come back as a success if the hashed password the user 
            // is attempting to login with is equal to the hashedPassword saved in the database 
            const ok = await bcrypt.compare(password, user.passwordHash); 

            if(!ok) return done(null,false);

            return done(null, user);

        }catch(err){return done(err)};
    })
);

//define what is stored in the session cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id).select("passwordHash");
        done(null, user)
    }catch(err){
        done(err);
    }
});

module.exports = passport;