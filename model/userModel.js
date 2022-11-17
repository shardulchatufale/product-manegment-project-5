const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    fname:{required:true,type:String},

    lname:{type:String,required:true},

    email:{required:true, type:String},

    phone:{type:Number,required:true,trim:true},

    password:{type:String,require:true,trim:true},

    address:{
        shipping:{
            street:{ required:true,type:String},

            city:{required:true,type:String},

            pincode:{required:true,type:String}
                 },
        billing:{
            street:{ required:true,type:String},

            city:{ required:true,type:String},

            pincode:{ required:true,type:String}
                }
    }
}, { timestamps: true })
module.exports=mongoose.mongoose.model("user",userSchema)