const userModel=require("../model/userModel")
const bcrypt=require("bcrypt");
const { model, default: mongoose } = require("mongoose");
const { json } = require("body-parser");
const jwt=require("jsonwebtoken")


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;

    return true;
};
let nameRegex = /^([a-zA-Z])+$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneRejex=/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
let passwordRejex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/

const createUser=async function(req,res){
    try{
   let data= req.body


    let Fulladdress=JSON.parse(data.address)

    console.log("----",data)

    if(!Object.keys(data).length<0){return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" })}
    
    if(!isValid(data.fname)){return res.status(400).send({status:false,message:"fname is not valid"})}
    if(!nameRegex.test(data.fname)){return res.status(400).send({status:false,message:"name is not valid"})}

    if(!isValid(data.lname)){res.status(400).send({status:false,message:"fill the lname"})}
    if(!nameRegex.test(data.lname)){return res.status(400).send({status:false,message:"lname is not valid"})}

    if(!isValid(data.email)){return res.status(400).send({ status: false, message: "provide email" })}
    if(!emailRegex.test(data.email)){return res.status(400).send({ status: false, message: "email is not valid" })}
   
    if(!isValid(data.phone)){return res.status(400).send({ status: false, message: "provide phone no" })}
    if(!phoneRejex.test(data.phone)){return res.status(400).send({ status: false, message: "phone no is not valid" })}
console.log("........32")
    if(!isValid(data.password)){return res.status(400).send({ status: false, message: "provide password" })}
    if(!passwordRejex.test(data.password)){return res.status(400).send({ status: false, message: "password is not valid" })}


   let duplicate=await userModel.findOne({$or:[{email:data.email},{phone:data.phone}]})
   if(duplicate){return res.status(400).send({ status: false, message: "phoe or email is already available" })}
   

    

   if(!isValid(Fulladdress)){return res.status(400).send({ status: false, message: "provide address" })}

   if(!isValid(Fulladdress.shipping)){return res.status(400).send({ status: false, message: "shipping is require" })}

   if(!isValid(Fulladdress.shipping.street)){return res.status(400).send({ status: false, message: "street is not valid" })}

   if(!isValid(Fulladdress.shipping.city)){return res.status(400).send({ status: false, message: "city is require" })}

   if(!isValid(Fulladdress.shipping.pincode)){return res.status(400).send({ status: false, message: "pincode provide" })}

   if(!isValid(Fulladdress.billing)){return res.status(400).send({ status: false, message: "billing is reqire" })}

   if(!isValid(Fulladdress.billing.street)){return res.status(400).send({ status: false, message: "billing street is require" })}

   if(!isValid(Fulladdress.billing.city)){return res.status(400).send({ status: false, message: "billing city is require" })}

   if(!isValid(Fulladdress.billing.pincode)){return res.status(400).send({ status: false, message: "billing pincode is require" })}

   data.address=Fulladdress
   const soldrent=10

   let encryptedPassword=await bcrypt.hash(data.password,soldrent)
   data.password=encryptedPassword

   let createdData=await userModel.create(data)
   res.status(201).send({status:true,message:"usr successfullya created",createdData})

    }catch(err){
        console.log(err)
        res.status(500).send({status:false,message:"server err",message:err.message})
    }
}


//jeson .parse nahi kiya
// adress ko destructure nahi kya 



//...........................................................................................................
const logIn=async function(req,res){
    try{
    let data=req.body

    if(!isValid(data.email)){return res.status(400).send({ status: false, message: "provede email" })}
    if(!emailRegex.test(data.email)){return res.status(400).send({ status: false, message: "email is not valid" })}

    if(!isValid(data.password)){return res.status(400).send({ status: false, message: "provide password" })}
    if(!passwordRejex.test(data.password)){return res.status(400).send({ status: false, message: "password is not vaid" })}

    let user=await userModel.findOne({email:data.email})
    if(!user){return res.status(400).send({ status: false, message: "user is not valid " })}

    let varifiedPassword=await bcrypt.compare(data.password,user.password)
    if(!varifiedPassword){return res.status(400).send({ status: false, message: "password is wrong" })}

    let token=jwt.sign({
        userId:user._id.toString(),
        batch:"radon"
    },"shardulll",{expiresIn:"1h"})

        return res.status(200).send({ status: true, message: "Success", UserId: user._id, token: token })
    }catch(err){
        console.log(err)
        res.status(500).send({status:false,message:err.message})
    }    

}
//............................................................................................................................

const getUser=async function(req,res){
    const userId=req.params.userId
        try{
            console.log("............");
            console.log(userId)
    //  if(!userId){return res.status(400).send({status:false,message:"provide userid "})}
    // if(!mongoose.Types.ObjectId(userId)){return res.status(400).send({status:false,message:"provide userid in proper format"})}
             console.log("..............129");
    let findUser=await userModel.find(userId)
    console.log("............131");
    if(!findUser){return res.status(400).send({status:false,message:"user is not found"})}

    if(!(userId!=req.deccodeToken.userId)){return res.status(403).send({status:false,message:"unthorise"})}

    res.status(201).send("status:true,findUser")
         } catch(err){
            console.log(err.message)
            res.status(500).send({status:false,message:"server err"})
         }
}

















module.exports={createUser,logIn,getUser}

//git add git commit git push