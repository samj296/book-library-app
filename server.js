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

app.use(express.json());

//for now I dont need the below code so that I can use postman
// lets express read in the data as form submissions which is what passport expects
//app.use(express.urlencoded({extended: false}))

//session middleware sets up the login state on the server and it gives the browser 
// a cookie to reference it
app.use(
    session({
        secret: process.env.Session_Secret,
        resave: false,
        saveUninitialized: false
    })
)

connectionDB()

app.use("/api/auth", authRoutes)

app.use(errorHandler);


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`App is running on the http://localhost:${PORT}`);
});

