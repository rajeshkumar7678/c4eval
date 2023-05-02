const redis=require("ioredis")
require("dotenv").config()


const configuration={
    host:"redis-14125.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port:14125,
    username:"default",

    password:process.env.redispassword
}
const client=new redis(configuration)


module.exports={client}