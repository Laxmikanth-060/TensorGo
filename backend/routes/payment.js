import express from 'express';
import crypto from 'crypto';
import axios from "axios"

const router = express.Router();

// Assume you have a Payment model/schema defined

router.post('/order', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      method: 'POST',
      url: 'https://api.razorpay.com/v1/orders',
      headers: {
        Authorization: `Basic ${Buffer.from(`rzp_test_2hT3HGAOOFDmrX:keDEOcxsYMwt1HAh3ZlCUoWQ`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      data: {
        amount: amount * 100, 
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      }
    };

    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
  
});




router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    try {
      const generatedSignature = crypto.createHmac('sha256', "keDEOcxsYMwt1HAh3ZlCUoWQ")
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
  
      if (generatedSignature === razorpay_signature) {
        // Payment is authentic, handle it accordingly (e.g., save to database)
        // Here you can save payment details to your database
        // Example: 
        // const payment = new Payment({
        //   razorpay_order_id,
        //   razorpay_payment_id,
        //   razorpay_signature
        // });
        // await payment.save();
  
        res.json({ message: 'Payment successful' });
      } else {
        res.status(400).json({ message: 'Payment verification failed' });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
    

export default router