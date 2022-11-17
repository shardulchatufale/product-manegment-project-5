const mongoose=require("mongoose")

const productSchama=new mongoose.Schema({
        title:{required:true,type:String, unique:true},

        description:{type:String, required:true},

        price: { type: Number, required: true },

        currencyId:{require:true, type:String, enum:["INR"]},

        currencyFormat:{type:String,require:true,enum:["₹"]},

        isFreeShipping:{type:Boolean, default:false,enum:["true","false"]},

        style:{type:String},

        availableSizes:{type:[String]},

        installments:{type:Number},

        deletedAt:{type:Date},

        isDeleted:{ type:Boolean, default:false},

      


},{timestamp:true})

module.exports=mongoose.model("product",productSchama)
