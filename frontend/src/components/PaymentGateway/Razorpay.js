import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./Razorpay.css";
import { useLocation } from "react-router-dom";


const Razorpay = () => {
  const [orderId, setOrderId] = useState('');
  // const [amount, setAmount] = useState(0);
  // const [currency, setCurrency] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("price");

  useEffect(()=>{
    const handlePayment = async () => {
      try {
        // Step 1: Create order
        const response = await axios.post('http://localhost:1234/api/payment/order', {
          amount: amount,
        });
  
        const { data } = response;
        // console.log('Order created:', data);
        setOrderId(data.id);
  
        // Step 2: Handle payment verification
        const options = {
          key: "rzp_test_2hT3HGAOOFDmrX", 
          amount: data.amount * 100, 
          currency: data.currency,
          name: 'Abhi Trainings',
          description: 'Full Stack Development',
          order_id: data.id,
          handler: async (response) => {
  
            try {
              const verifyResponse = await axios.post('http://localhost:1234/api/payment/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
  
              const { verifyData } = verifyResponse.data;
              if (verifyData.message) {
                toast.success(verifyData.message);
              }
            } catch (error) {
              console.error('Error verifying payment:', error);
            }
          },
          theme: {
            color: '#5c63b2',
          },
        };
  
        if (window.Razorpay) {
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } else {
          console.error('Razorpay SDK not loaded.');
        }
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };
    handlePayment();
  },[])

  return (
    <div className='payment-info'>
      {/* <input type='text' value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
      <input type='text' value={currency} placeholder='Currency' onChange={(e) => setCurrency(e.target.value)} />
      <button onClick={handlePayment}>Create Order</button> */}
      {/* {orderId && <p>Order ID: {orderId}</p>} */}
    </div>
  );
};

export default Razorpay;
