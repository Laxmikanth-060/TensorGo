// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

 const sendEmail= async (email,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            // service: process.env.SERVICE,
            // logger:true,
            // debug: true,
            // secureConnection:false,
            // port: Number(process.env.EMAIL_PORT),
            // secure: Boolean(process.env.SECURE),
            // auth:{
            //     user: process.env.USER,
            //     pass: process.env.PASS
            // },
            // tls:{
            //     rejectUnAuthorized:true
            // }
            // host: "smpt.gmail.com",
           
            service: 'gmail',
            auth: {
              user: 'luckyanubothula2004@gmail.com',
              pass: 'sfrvrxkkttxlbxdk', // Use the app password here
            },

        })

        await transporter.sendMail({
            from:process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        // console.log("Email sent Successfully");

    }catch(err){
        console.log("Error in Email Sending",err);
    }
}

export default sendEmail;