
const mongoose=require("mongoose")

let ObjectId = mongoose.Schema.Types.ObjectId

const cartScheme=new mongoose.Schema({
    
    userId:{type:ObjectId,ref:"user",required:true,unique:true},

    items:[{productId:{
             type:ObjectId,ref:"product",required:true}},
          {quentity:{
              type:Number,required:true,default:1
          }}],

    totalPrice:{type:Number,required:true},
    
    totalItems:{type:Number,required:true}

},{timestamp:true})

module.exports=mongoose.model("cart",cartScheme)