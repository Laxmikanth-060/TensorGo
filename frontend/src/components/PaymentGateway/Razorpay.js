// import React, { useState } from 'react';
// import "./Razorpay.css"
// import toast from "react-hot-toast";


// const Razorpay = () => {
//   const [orderId,setOrderId] = useState('')
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState('');

//   const handlePayment = async () => {
//     try {
//         const res = await fetch(`http://localhost:1234/api/payment/order`, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 amount
//             })
//         });

//         const data = await res.json();
//         console.log(data);
//         handlePaymentVerify(data.data)
//     } catch (error) {
//         console.log(error);
//     }
// }

// const handlePaymentVerify = async (data) => {
//   const options = {
//       key: ({}).RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: data.currency,
//       name: "Devknus",
//       description: "Test Mode",
//       order_id: data.id,
//       handler: async (response) => {
//           console.log("response", response)
//           try {
//               const res = await fetch(`http://localhost:1234/api/payment/verify`, {
//                   method: 'POST',
//                   headers: {
//                       'content-type': 'application/json'
//                   },
//                   body: JSON.stringify({
//                       razorpay_order_id: response.razorpay_order_id,
//                       razorpay_payment_id: response.razorpay_payment_id,
//                       razorpay_signature: response.razorpay_signature,
//                   })
//               })

//               const verifyData = await res.json();

//               if (verifyData.message) {
//                   toast.success(verifyData.message)
//               }
//           } catch (error) {
//               console.log(error);
//           }
//       },
//       theme: {
//           color: "#5f63b8"
//       }
//   };
//   const rzp1 = new window.Razorpay(options);
//   rzp1.open();
// }

//   return (
//     <div className='payment-info'>
//       <input type="number" value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
//       <input type="text" value={currency} placeholder='Currency' onChange={(e) => setCurrency(e.target.value)} />
//       <button onClick={handlePayment}>Create Order</button>
//       {orderId && <p>Order ID: {orderId}</p>}
//     </div>
//   );
// };

// export default Razorpay;




import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Razorpay = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');

  const handlePayment = async () => {
    try {
      // Step 1: Create order
      const response = await axios.post('http://localhost:1234/api/payment/order', {
        amount: amount,
        currency: currency,
      });

      const { data } = response;
      console.log('Order created:', data);
      setOrderId(data.id);

      // Step 2: Handle payment verification
      const options = {
        key: "rzp_test_2hT3HGAOOFDmrX", 
        amount: data.amount * 100, 
        currency: data.currency,
        name: 'Abhi Trainings',
        description: 'Test Payment',
        order_id: data.id,
        handler: async (response) => {
          console.log('Payment response:', response);

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
          color: '#5f63b8',
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

  return (
    <div className='payment-info'>
      <input type='number' value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
      <input type='text' value={currency} placeholder='Currency' onChange={(e) => setCurrency(e.target.value)} />
      <button onClick={handlePayment}>Create Order</button>
      {orderId && <p>Order ID: {orderId}</p>}
    </div>
  );
};

export default Razorpay;
