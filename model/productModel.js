const mongoose=require("mongoose")

const productSchama=new mongoose.Schema({
    title:{
        required:true,type:String, unique:true},

        description:{type:String, required:true},

        currencyId:{require:true, type:String, enum:["INR"]},

        currencyFormat:{type:String,require:true,enum:["₹"]},

        isFreeShipping:{type:Boolean, default:false},

        style:{type:String},

        availableSizes:{type:[String], enum:["S", "XS","M","X", "L","XXL", "XL"]},

        installments:{type:Number},

        deletedAt:{type:Date},

        isDeleted:{ type:Boolean, default:false},

        createdAt:{timestamp:true},

        updatedAt:{timestamp:true}


},{timestamp:true})

module.exports=mongoose.model("product",productSchama)