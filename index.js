const express=require("express")
const mongoose=require ("mongoose")
const bodyParser = require("body-parser");
const route=require("../src/route/route")
// app.use(bodyParser.urlencoded({extended : true}));



const app=express()
 

app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://anik2310:anik123@cluster0.tby9aun.mongodb.net/produced_pooja", 
{ useNewUrlParser: true }
)

.then(() => console.log("MongoDb is connected🙏🙏"))
.catch(err => console.log(err))

app.use('/', route)

let PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`Express app running on port ${PORT} 😍😍` )
})