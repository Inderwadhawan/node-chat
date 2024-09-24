import Bull from 'bull';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailQueue = new Bull('email', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define the job process for sending emails
emailQueue.process(async (job) => {
  const { to, subject, text } = job.data;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  });
});

// Function to add a new email job to the queue
export const addEmailToQueue = async (to: string, subject: string, text: string) => {
  await emailQueue.add({ to, subject, text });
};