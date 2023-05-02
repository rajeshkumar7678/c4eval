const express=require("express")

require("dotenv").config()
const {connection}=require("./db")
const {Router}=require("./routes/userroute")
const {logger}=require("./middleware/logger")
const { iproute } = require("./routes/ipadress")
const app=express()
app.use(express.json())

app.use("/",Router)
app.use("/",iproute)



app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
        logger.log("info","database connected")
    } catch (error) {
        console.log(error)
        logger.log("error","database connection failed")
    }
    console.log("server is running...")
})
