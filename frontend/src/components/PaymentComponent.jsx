import React from "react";
import axios from "axios";
import "../styles/payment.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function PaymentComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigate()
  async function displayRazorpay() {
    
    const token = localStorage.getItem("token");
    const key = await axios.get(`${process.env.REACT_APP_URL}/payment/getKeyId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   
   
    const result = await axios.post(`${process.env.REACT_APP_URL}/payment/create-order`, null, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Sanket Teli",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/104385297?v=4",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          `${process.env.REACT_APP_URL}/payment/success`,
           data,{
           headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        );
        console.log(result)
        
        if(result) alert(
          "done"
        );
        navigation("/profile")

      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        address: "Biotech office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="payment-container">
      <h1>Get Premium</h1>
      <div className="payment-form">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button className="pay-button" onClick={displayRazorpay}>
          Pay ₹5
      </button>
    </div>
    </>
  );
}

export default PaymentComponent;
