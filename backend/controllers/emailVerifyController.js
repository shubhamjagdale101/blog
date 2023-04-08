const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer');

const verify = asyncHandler( async (req, res) => {
    const {email} = req.body;
    
    try{
        const otp = Math.floor(Math.random()*1000000);
        // dipakhirve20gmail.com

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user : "shubhamjagdalerxl@gmail.com",
                pass : "DfsG40UNGQxwQr85"
            }
        });

        const mailOptions = {
            from: 'shubhamjagdalerxl@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for email verification is ${otp}.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    }catch(error){
        res.status(400);
        throw new Error(error);
    }
}
);

module.exports = {verify};

// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// // POST /send-otp
// router.post('/send-otp', async (req, res) => {
//   try {
//     // generate a random OTP
//     const otp = Math.floor(Math.random() * 1000000);

//     // store the OTP in a database or cache

//     // create a nodemailer transport object
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'your_email_address@gmail.com',
//         pass: 'your_email_password'
//       }
//     });

//     // create the email message
//     const mailOptions = {
//       from: 'your_email_address@gmail.com',
//       to: req.body.email,
//       subject: 'OTP Verification',
//       text: `Your OTP for email verification is ${otp}.`
//     };

//     // send the email
//     await transporter.sendMail(mailOptions);

//     // return success response
//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;