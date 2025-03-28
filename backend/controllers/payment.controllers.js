import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: "rzp_test_akyGsz2f5xPFbl",
    key_secret: "poNGg531UqHFf9oLMnCxNJJi"
  });

export const createOrder = async(req,res)=>{

   

        const amount = 200;
        const currency = "INR";
      
        if (!amount || !currency) {
            return res.status(400).send("Missing required fields: amount and currency");
        }
      
        const options = {
            amount: amount,  // amount in the smallest currency unit
            currency: currency,
            receipt: "receipt#1",
            payment_capture: 1
        };
      
          try {
            const response = await razorpay.orders.create(options);
            res.json({
                order_id: response.id,
                currency: response.currency,
                amount: response.amount
            });
        } catch (error) {
            console.error("Error creating order:", error);
            // Log the error details
            if (error.response) {
                console.error("Razorpay Error Response:", error.response);
            }
            res.status(500).send("Internal server error: " + error.message);
        }
      
}

export const getOrder = async(req,res)=>{
    const {paymentId} = req.params;

    const razorpay = new Razorpay({
        key_id: "rzp_test_akyGsz2f5xPFbl",
        key_secret: "poNGg531UqHFf9oLMnCxNJJi"
    })
    
    try {
        const payment = await razorpay.payments.fetch(paymentId)

        if (!payment){
            return res.status(500).json("Error at razorpay loading")
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch(error) {
        res.status(500).json("failed to fetch")
    }
}


