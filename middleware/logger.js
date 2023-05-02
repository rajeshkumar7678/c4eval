const winston = require('winston');

const {MongoDB}=require("winston-mongodb")

require("dotenv").config()

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new MongoDB({
            db:process.env.mongourl,
            collection:"logs",
            options:{
                useUnifiedTopology:true
            }
        })
    ]
})


module.exports={logger}