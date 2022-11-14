const jwt=require("jsonwebtoken")
const { model, Model } = require("mongoose")
const userModel=require("../controller/userController")


const authantication=async function(req,res,next){

    try{
    let token=req.headers["X api-key"]
    if(!token) token=req.headers["x api-key"]
    console.log("authantication .......11")
    if(!token){return res.status(400).send({status:false,message:"provide token"})}

    let deccodeToken=jwt.verify(token,"shardulll")
    if(!deccodeToken){return res.status(401).send({status:false,message:"authantication fail"})}
    console.log("authantication .......16")
    req["userId"]=deccodeToken["userId"]
      next()
    }catch(err){
        console.log(err.message)
      return  res.status(500).send({status:false,message:"server err in authantication"})
    }

}

module.exports={authantication}