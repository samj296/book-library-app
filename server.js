require("dotenv").config();
const express = require("express");
const app = express();
const connectionDB = require("./mongoDb/connection");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
console.log("Loaded autRoutes");
//const userRoutes = require("./routes/userRoutes");
console.log("Loaded userRoutes");
//const libraryRoutes = require("./routes/libraryRoutes");
console.log("Loaded libraryRoutes");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const adminController = require("./controllers/adminController")

app.use(express.json());

// lets express read in the data as form submissions which is what passport expects
app.use(express.urlencoded({extended: false}))

//session middleware sets up the login state on the server and it gives the browser 
// a cookie to reference it
app.use(
    session({
        secret: process.env.Session_Secret || "dev_secret_change_me",
        resave: false,
        saveUninitialized: false
    })
)

//made sure the order is proper as taught in our class
app.use(passport.initialize());
app.use(passport.session());




app.use("/api/auth", authRoutes)

app.use("/api/user", userRoutes)

app.use(errorHandler);


const PORT = process.env.PORT ?? 3000;

//according to copilot creating connection and then only the server will run
// because it prevents server from starting if the DB fails 
// and it ensures Passport + session have DB access
connectionDB().then(async () => {
    await adminController.ensuredAdminExists();
    app.listen(PORT, () => {
        console.log(`App is running on the http://localhost:${PORT}`);
    });

});

