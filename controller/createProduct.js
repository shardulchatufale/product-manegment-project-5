const productModel=require("../model/productModel")
const mongoose =require("mongoose")


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;

    return true;
};
const isValidNumber = (price) => {
    if (/^[0-9]+([.][0-9]+)?$/.test(price))
        return true
}

const stylerejex=/^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/

const createProduct=async function(req,res){
    try{
    let data = req.body

    if(Object.keys(data).length<0)return res.status(400).send({ status: false, message: 'Please provide data' })

    if (!data.title) return res.status(400).send({ status: false, message: 'Please enter title name' })
    if(!isValid(data.title))return res.status(400).send({ status: false, message: 'Please enter title name' })
    let uniqueTitle = await productModel.findOne({ title:data.title });
    if (uniqueTitle) return res.status(400).send({ status: false, message: 'the title is already taken' })

    if (!data.description) return res.status(400).send({ status: false, message: 'Please enter description' })
    if (!isValid(data.description)) return res.status(400).send({ status: false, message: 'Please enter description name in right formate' })

    if (!data.price) return res.status(400).send({ status: false, message: 'Please enter price' })
    if (!isValidNumber(data.price)) return res.status(400).send({ status: false, message: 'Please enter price in only Number' })

    if (!data.currencyId) return res.status(400).send({ status: false, message: 'Please enter currencyId' })
    if (data.currencyId != "INR") return res.status(400).send({ status: false, message: 'Please enter currencyId as INR' })

    if (data.currencyFormat) {
        if (data.currencyFormat != "₹") return res.status(400).send({ status: false, message: 'Please enter currencyFormat as ₹' })
    }
    data.currencyFormat = "₹"

    if (data.style) {
        if (!isValid(data.style)) return res.status(400).send({ status: false, message: 'Please enter style name in right formate' })
        if (!stylerejex.test(data.style)) return res.status(400).send({ status: false, message: 'Please enter style name in alphabets only' })}
    
    if(data.availableSizes){
        console.log(data.availableSizes);

        let availableSizes=data.availableSizes
        console.log(availableSizes);

        availableSizes =data. availableSizes.toUpperCase()//*************************************************** */
        availableSizes=availableSizes.split(",")//to make array
        console.log(availableSizes);

        // if(availableSizes.length==0) return res.status(400).send({ status: false, message: "Please provide product sizes" })
        for(let i=0;i<availableSizes.length;i++){
            if(!(["S","M","L","XL","XXL"]).includes(availableSizes[i])){
                return res.status(400).send({ status: false, message: 'Sizes should be [S,XS,M,X,L,XXL,XL]' })
            }
        }
    }  else{
        return res.status(400).send({ status: false, message: 'availableSizes  is required' })
    }  

    if(data.installments){
        if(!isValidNumber.test(data.installments))return res.status(400).send({ status: false, message: 'Please enter installments in only Number' })
    }

    if (data.isFreeShipping) {//**************************************************************** */
        if (!['true', 'false'].includes(data.isFreeShipping)) {
            return res.status(400).send({ status: false, message: "isFreeshipping must be a Boolean Value" });
        }
    }

    let productdata = await productModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: productdata })
    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
    
}
//..................................................................................



const getProduct=async function(req,res){
try{
    let data=req.query
    let filters={isDeleted:false}
console.log("......93");
    if(data.title){
        if(!isValid(data.title)){res.status(400).send({status:false,send:"title is not valid"})}

    if(data.title)filters.title={$in:data.title}}

    if(data.description)filters.description={$in:data.description}

    if(data.priceGreaterThan)filters.price={$gt:data.priceGreaterThan}

    // console.log(data.priceGreaterThan,filters.price);
    if(data.priceLessThan)filters.price={$lt:data.priceLessThan}

    console.log(data.priceGreaterThan,filters.priceGreaterThan);

    if(data.availableSizes)filters.availableSizes={$in:data.availableSizes}

    let allProduct=await productModel.find(filters)
    if(!allProduct){res.status(200).send({status:false,message:"no such product"})}
    if (allProduct.length == 0) return res.status(404).send({ status: false, message: "Product not found" })

    res.status(200).send({status:true,data:allProduct})
}catch(err){
    res.status(500).send({status:false,message:err.message})
}
}
//........................................................................................

const getById=async function (req,res) {
    try{
  let productId=req.params.productId



  console.log("..........116",productId);
  if(!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Please enter valid productId in params path" })

  let check=await productModel.findById({_id:productId})
  console.log("........120",check);
  if(!check) return res.status(400).send({ status: false, message: "no such product" })
  return res.status(200).send({ status: true, message: 'Success', data: check })
    }catch(err){
        console.log(err.message)//*********************************************** */
    }

}
//.........................................................................................

const deleteProduct=async function(req,res){
    try{
       let productId=req.params.productId
        console.log(".................134",productId);
    
        if(!mongoose.isValidObjectId(productId)) return res.status(200).send({ status: true, message: 'Success', data: findData })
        
        let deleted=await productModel.findByIdAndUpdate({_id:productId},{isDeleted:false,deletedAt:Date.now()})
        res.status(200).send({ status: true, message: 'deleted sucessfully' })

      }  catch(err){
        res.status(500).send({ status: false, message:err.message })
      }
}
//........................................................................



module.exports={createProduct,getProduct,getById,deleteProduct}