require("dotenv").config()
const express=require('express')
const cors=require('cors');
const mongoose=require("mongoose")

const authroutes=require("./routes/AuthRoutes")
const ProductRoutes=require("./routes/ProductRoutes")
const UserRoutes=require("./routes/UserRoutes")
const OrderRoutes=require("./routes/OrderRoutes")



const app=express()
app.use(cors())
app.use(express.json()); 

app.use("/user",authroutes)
app.use("/products",ProductRoutes)
app.use("/features",UserRoutes)
app.use("/purchase",OrderRoutes)

mongoose.connect(process.env.MONGODB)
.then((res)=>{
    app.listen(process.env.PORT);
}).catch((err)=>{
    console.log(err);
})