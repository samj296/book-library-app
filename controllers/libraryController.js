const {accountType, User, Book, borrowRecord} = require("../models/libraryModel")

// get all book list

async function getAllBooks(req, res){
    try{
        const library = await Book.find();
        res.json(library);
    }catch(err){
        res.status(500).json({
            error: "Failed to fetch Books"
        });
    };
};

async function getAllUsers(req, res){
    try{
        const user = await User.find();
        res.json(user);
    }catch(err){
        res.status(500).json({
            error: "Failed to fetch Users"
        });
    };
};

module.exports = {getAllBooks, getAllUsers}