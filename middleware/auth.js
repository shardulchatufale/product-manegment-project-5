const jwt=require("jsonwebtoken")
const { model, Model } = require("mongoose")
const userModel=require("../controller/userController")


const authentication = async function (req, res, next) {
  try {
      let token = req.headers.authorization
               console.log("....9");
      if (!token) return res.status(400).send({ status: false, message: "token must be present" });

      token = token.split(" ")[1];
    //   let token=jwt.sign({
    //     userId:user._id.toString(),
    //     batch:"radon"
    // },"shardulll",{expiresIn:"1h"})
console.log(token)
      jwt.verify(token, "shardulll", function (err, decoded) {
          if (err) {
              return res.status(401).send({ status: false, message: err.message })

          } else {
              req.decodedToken = decoded
              next()
          }
      })
  }
  catch (err) {
      return res.status(500).send({ status: false, message: err.message })
  }
}

module.exports={authentication}