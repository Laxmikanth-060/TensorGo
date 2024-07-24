// import express from 'express';
// const router = express.Router();
// import Razorpay from "razorpay"
// import crypto from "crypto";

// router.post("/orders", async (req, res) => {
// 	try {
// 		const instance = new Razorpay({
// 			key_id: process.env.KEY_ID,
// 			key_secret: process.env.KEY_SECRET,
// 		});

// 		const options = {
// 			amount: req.body.amount * 100,
// 			currency: "INR",
// 			receipt: crypto.randomBytes(10).toString("hex"),
// 		};

// 		instance.orders.create(options, (error, order) => {
// 			if (error) {
// 				console.log(error);
// 				return res.status(500).json({ message: "Something Went Wrong!" });
// 			}
// 			res.status(200).json({ data: order });
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });

// router.post("/verify", async (req, res) => {

// 	try {
// 		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// 		const sign = razorpay_order_id + "|" + razorpay_payment_id;

// 		const expectedSign = crypto
// 			.createHmac("sha256", process.env.KEY_SECRET)
// 			.update(sign.toString())
// 			.digest("hex");

// 		if (razorpay_signature === expectedSign) {
// 			return res.status(200).json({ message: "Payment verified successfully" });
// 		} else {
// 			return res.status(400).json({ message: "Invalid signature sent!" });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });


// export default router;


import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_2hT3HGAOOFDmrX",
    key_secret: "keDEOcxsYMwt1HAh3ZlCUoWQ",
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", ({}).RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})


export default router