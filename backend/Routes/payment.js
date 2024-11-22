const express = require('express')
const { handlePayment, handlePaymentSuccess, getPaymentId} = require("../controllers/payment.js")
const {auth} =require("../middlewares/auth.js")
const paymentRouter = express.Router()

paymentRouter.post("/create-order",auth, handlePayment)


paymentRouter.post("/success", auth, handlePaymentSuccess)


paymentRouter.get("/getKeyId", auth, getPaymentId)


module.exports = paymentRouter