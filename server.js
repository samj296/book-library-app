require("dotenv").config();
const express = require("express");
const app = express();
const connectionDB = require("./mongoDb/connection")
const errorHandler = require("./middleware/errorHandler")

app.use(express.json());

connectionDB()

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`App is running on the http://localhost:${PORT}`);
});