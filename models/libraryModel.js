const mongoose = require("mongoose");


const bookStatus = ["available", "borrowed"]

//Schema For User



//Schema for book

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        author: {type: String, required: true, trim: true},
        genre: {type: String, required: true, trim: true},
        status: {type: String, enum: bookStatus, default: bookStatus[0]} // bookstatus[0] === "available"
    }
);

// Schema for borrowed list

const borrowedSchema = new mongoose.Schema(
    {
        userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        bookId: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
        borrowedAt: {type: Date, required: true, default: Date.now},
        returnedAt: {type: Date}
    }
);


const Book = mongoose.model("Book", bookSchema)
const borrowRecord = mongoose.model("BorrowRecord", borrowedSchema)

module.exports = {Book, borrowRecord};