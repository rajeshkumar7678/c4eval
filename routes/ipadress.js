const express=require("express")

const iproute=express.Router()

const IP = require('ip');

iproute.get("/ip/:city", (req, res) => {
    const ipAddress = IP.address();
    res.status(200).send(ipAddress)
})














module.exports={iproute}