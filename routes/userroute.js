const express=require("express")

const Router=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {client}=require("../redis")
require("dotenv").config()
const {usermodel}=require("../models/usermodel")
const {authmodel}=require("../middleware/middle")


Router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,city}=req.body
        let user=await usermodel.findOne({email})
        if(user){
          return  res.status(400).send({msg:"user already preasent , please login"})
        }
        const hashpassword=bcrypt.hashSync(password,8)
        const newuser= new usermodel({name,email,password:hashpassword,city})
        await newuser.save()
        res.status(200).send({msg:"user added"})
    } catch (error) {
        console.log(error)
    }
})
Router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const userdata=await usermodel.findOne({email})
        if(!userdata){
           return res.send(400).send({msg:"please signup"})
        }

        const comparepass=bcrypt.compare(password,userdata.password)
        if(!comparepass){
            return res.send(400).send({msg:"wrong password"})
        }
        let token=jwt.sign({id:userdata._id,city:userdata.city},process.env.token,{expiresIn:"1d"})

res.status(200).send({msg:"login sucessfull!!",token})

    } catch (error) {
        console.log(error)
    }
})

Router.get("/logout",authmodel,async(req,res)=>{
    try {
        const {token}=req.headers.authorization
        // if(!token){
        //     return res.status(404).send("inavlid")
        // }
         await client.set(req.body.userId,token,"Ex",60*60*6)
        res.status(200).send({msg:"logout successfull!!"})
        
    } catch (error) {
        console.log(error)
    }
})


module.exports={Router}