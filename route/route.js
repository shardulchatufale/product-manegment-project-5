const express=require("express")
const userController=require("../controller/userController")

const router=express.Router()

router.post("/createuser",userController.createUser)
router.post("/logIn",userController.logIn)
router.get("/getUser/:userId",userController.getUser)

module.exports = router;