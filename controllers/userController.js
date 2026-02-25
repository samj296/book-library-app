function getProtected(req, res){
    res.send(`welcome ${req.user.name}, You are logged in`);
};


module.exports = {getProtected}