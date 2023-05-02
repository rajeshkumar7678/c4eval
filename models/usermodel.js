const mongoose=require("mongoose")

const usershema=mongoose.Schema({
name:String,
email:{type:String,unique:true},
password:String,
city:String
})

const usermodel=mongoose.model("user",usershema)

module.exports={usermodel}
