const jwt=require("jsonwebtoken")
 const {client}=require("../redis")

 const authmodel=async(req,res,next)=>{
    try {
        const token=req.headers.authorization

    if(!token){
        return res.status(400).send("please login!!")
    }

    const istokenvalid=await jwt.verify(token,process.env.token)
    if(!istokenvalid){
      return  res.status(400).send("unauthorized")
    }
    const istokenblacklisted=await client.get(token)
    if(istokenblacklisted){
return res.send("unauthorized")
    }
     req.body.userId=istokenvalid.id
     req.body.city=istokenvalid.city
     next()
    } catch (error) {
        console.log(error)
    }
}
module.exports={authmodel}