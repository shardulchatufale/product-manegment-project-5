let productModel=require("../model/productModel")
let cartModel=require("../model/cartModel")
const mongoose=require("mongoose")
// const { default: mongoose, model } = require("mongoose")

const createCart=async function(req,res){
    try{
        console.log("...........8");
           let data=req.body

           let userId=req.params.userId
          console.log(".........9",data);
          console.log(userId);

        

          if(Object.keys(data).length==0)return res.status(400).send({ status: false, msg: "please provide data to update" })
          if(!data.productId){return res.status(400).send({status:false,message:"please provide product id"})}
          if(!mongoose.isValidObjectId(data.productId)){return res.status(400).send({status:false,message:"provide valid product id"})}
          console.log("........19");

          let findProduct=await productModel.findOne({_id:data.productId,isDeleted:false})
          if(!findProduct){return res.status(400).send({status:false,message:"no such product"})}
          console.log("...........22",findProduct);

          const productPrice = findProduct.price
          console.log("........27",productPrice);

          if(data.totalItems<0) {return res.status(400).send({status:false,message:"provide quentuty more than 2"})}
           console.log(".....24");

           let findCart=await cartModel.findOne({_id:userId})
           console.log(".......26",findCart);

           if(!findCart){
                let obj={
                userId:req.params.userId,
                items:{
                    productId:data.productId,
                    quentity:data.quentity,},
                totalItems:data.totalItems,
                totalPrice:productPrice*data.totalItems
                }
                 console.log("......35",obj);

                let createdCart= await cartModel.create(obj)
                res.status(201).send({status:false,createdCart})
                }
           if(findCart){
             if(findCart.items.includes(data.productId)){//*********************************** */
                  let obj={
                   quentity:data.quentity,
                   totalItems:data.totalItems,
                  totalPrice:productPrice*data.totalItems
                  }
                    let updateCart=await cartModel.findByIdAndUpdate({_id:userId,"items.productId":data.productId},{obj})
                      res.status(201).send({status:true,updateCart})
             }else{
                let obj={
                userId:req.params.userId,
                items:{
                    productId:data.productId,
                    quentity:data.quentity},
                totalItems:data.totalItems,
                totalPrice:productPrice*data.totalItems
                }
            let updatedCart = await cartModel.findOneAndUpdate({ _id: userId }, obj, { new: true })

            return res.status(201).send({ status: true, message: "Success", data: updatedCart })
          }
           }
          
    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}
//timestamp not showing
// let alreadyProductsId = findCart.items.map(x => x.productId.toString())//          nahi kiya

//............................................................................................

const deleteByParams=async function(req,res){
    try{
    let userId=req.params.userId
console.log("...85",userId);
    if(!mongoose.isValidObjectId(userId)){return res.status(400).send({status:false,message:"user id is not valid"})}
    
    let findcart=await cartModel.findOne({userId})
    if(!findcart){return res.status(400).send({status:false,message:"this user not available"})}

    let deletCart=await cartModel.findOneAndUpdate({_id:findcart._id},{items:[],totalPrice:0,totalItems:0},{new:true})
    res.status(204).send({ status: true, message: 'successfully deleted', data: deletCart })
    }catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}
//..................................................................................................
const getCart=async function(req,res){
    try{
    let userId=req.params.userId

    if(!mongoose.isValidObjectId(userId)){return res.status(400).send({status:false,message:"user id is not valid"})}

    let findCart=await cartModel.findById({_id:userId})
    if(!findCart) return res.status(400).send({ status: false, message: "this user id dont has cart" })
    }catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}
//....................................................................................................
const updaateCart=async function(req,res){
    let userId=req.params.userId
    let data=req.body

    if(Object.keys(data).length==0){}

    if(!data.cartId){}
    if(mongoose.isValidObjectId(data.cartId)){}
    
    if(!data.productId){}
    if(!mongoose.isValidObjectId(data.productId)){}

    if(!data.removeProduct){}
    if(data.removeProduct>1||data.removeProduct<0){}


    let findCart=await cartModel.findById({_id:userId})
    if(!findCart){}

     let findProduct=await productModel.findById({_id:data.productId})
     if(!findProduct){}
}

module.exports={createCart,deleteByParams,getCart}



