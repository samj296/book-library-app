const mongoose = require("mongoose");
const accountType = ["user", "staff", "admin"];

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true, unique: true},
        passwordHash:{type: String, required: true},
        role: {type: String, enum: accountType, default: accountType[0]}, // accountType[0] === "user"
        mustChangePassword: {type: Boolean, default: false}
    }
);

const User = mongoose.model("User", userSchema);

module.exports = {User, accountType};