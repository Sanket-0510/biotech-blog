const { User } = require("../models/user");

const { createHmac } = require("crypto");
const Razorpay = require("razorpay");

const handlePayment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY_ID,
      key_secret: process.env.RAZORPAY_API_KEY_ID_SECRET,
    });

    const options = {
      amount: 500,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const shasum = createHmac("sha256", process.env.RAZORPAY_API_KEY_ID_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    await User.findOneAndUpdate({ email: req.user.email }, { premium: true });

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

const getPaymentId = async (req, res) => {
  return res.json(process.env.RAZORPAY_API_KEY_ID);
};

module.exports = { handlePayment, handlePaymentSuccess, getPaymentId };
