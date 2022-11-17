const express=require("express")
const userController=require("../controller/userController")
const productController=require("../controller/createProduct")
const cartConroller=require("../controller/caratController")
const middleware=require("../middleware/auth")

const router=express.Router()

router.post("/createuser",userController.createUser)
router.post("/logIn",userController.logIn)
router.get("/getUser/:userId",middleware.authentication,userController.getUser)
router.put("/updateUser/:userId",middleware.authentication,userController.updateUser)

router.get("/getProduct",productController.getProduct)
router.get("/getById/:productId",productController.getById)
router.post("/createProduct",productController.createProduct)
router.post("/deleteProduct/:productId",productController.deleteProduct)

router.post("/createCart/:userId",cartConroller.createCart)
router.delete("deletByParams/:userId",cartConroller.deleteByParams)
module.exports = router;