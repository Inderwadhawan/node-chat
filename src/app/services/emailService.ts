import nodemailer from 'nodemailer';
import { addEmailToQueue } from '../services/emailQueue';

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email: string, otp: number): Promise<boolean> => {
  try {

    if(process.env.EMAIL_QUEUE != 'queue')
      {
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
          };
          await transporter.sendMail(mailOptions);
          console.log('email send live ',process.env.EMAIL_QUEUE);
        }else{

          var  text:string = `Your OTP code is ${otp}. It is valid for 10 minutes.`;
          await addEmailToQueue(email, 'portl-fitness Otp', text);
          console.log('email send queued ',process.env.EMAIL_QUEUE)

        }

    return true;
  } catch (error: any) {
    console.error(`Error sending OTP email: ${error.message}`);
    return false;
  }
};

export { sendOtpEmail };