const jwt = require('jsonwebtoken')
require("dotenv").config()

const authenticateToken = (req,res,next) => {
const authHeader = req.headers["authorization"]
const token = authHeader && authHeader.split(" ")[1];

if(token == null){
    res.status(401).json({message:"Authentication token required"})
}

jwt.verify(token,process.env.KEY,(err , user)=>{
    if(err){
        return res.status(403).json(err)
    }
    req.user = user
    next()
})
}
module.exports = {authenticateToken}

