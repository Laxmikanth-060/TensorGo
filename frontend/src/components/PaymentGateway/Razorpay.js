import React, { useState } from 'react';
import axios from 'axios';
import "./Razorpay.css"
import toast, { Toaster } from "react-hot-toast";


const Razorpay = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');

  const handlePayment = async () => {
    try {
        const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        });

        const data = await res.json();
        console.log(data);
        handlePaymentVerify(data.data)
    } catch (error) {
        console.log(error);
    }
}

const handlePaymentVerify = async (data) => {
  const options = {
      key: ({}).RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Devknus",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
          console.log("response", response)
          try {
              const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json'
                  },
                  body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                  })
              })

              const verifyData = await res.json();

              if (verifyData.message) {
                  toast.success(verifyData.message)
              }
          } catch (error) {
              console.log(error);
          }
      },
      theme: {
          color: "#5f63b8"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:1234/createOrder', {
        amount: amount,
        currency: currency,
      });
      const { id } = response.data;
      setOrderId(id);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className='payment-info'>
      <input type="number" value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
      <input type="text" value={currency} placeholder='Currency' onChange={(e) => setCurrency(e.target.value)} />
      <button onClick={createOrder}>Create Order</button>
      {orderId && <p>Order ID: {orderId}</p>}
    </div>
  );
};

export default Razorpay;
