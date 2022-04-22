const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req,res,next){
    try {
        const token = req.header('x-token');
        if(!token){
            return res.status(400).send('token not found');
        }
        const decode = jwt.verify(token,'jwtSecret');
        

        req.user = decode.user;
        next();
    } catch (error) {
        console.log(err);
    }
}