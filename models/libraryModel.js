const mongoose = require("mongoose");

const accountType = ["user", "staff"];
const bookStatus = ["available", "borrowed"]

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true, unique: true},
        passwordHash:{type: String, required: true},
        role: {type: String, enum: accountType, default: accountType[0]} // accountType[0] === "user"
    }
);

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        author: {type: String, required: true, trim: true},
        genre: {type: String, required: true, trim: true},
        status: {type: String, enum: bookStatus, default: bookStatus[0]} // bookstatus[0] === "available"
    }
);

const borrowedSchema = new mongoose.Schema(
    {
        userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        bookId: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
        borrowedAt: {type: Date, required: true, default: Date.now},
        returnedAt: {type: Date}
    }
);

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema)
const borrowRecord = mongoose.model("BorrowRecord", borrowedSchema)

module.exports = {accountType, User, Book, borrowRecord};