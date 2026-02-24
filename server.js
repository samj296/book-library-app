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


app.use(express.json());


connectionDB()

app.use("/api/auth", authRoutes)

app.use(errorHandler);


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`App is running on the http://localhost:${PORT}`);
});

