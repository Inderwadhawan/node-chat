import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const SMS_API_URL = process.env.SMS_API_URL || ''; // SMS API Endpoint
const SMS_API_KEY = process.env.SMS_API_KEY || ''; // API Key or any required credentials
const SMS_SENDER_ID = process.env.SMS_SENDER_ID || ''; // Sender ID (if applicable)

// Function to send SMS
const sendSMS = async (mobile: string, message: string): Promise<boolean> => {
  try {
    const response = await axios.post(SMS_API_URL, {
      apiKey: SMS_API_KEY,
      sender: SMS_SENDER_ID,
      numbers: mobile,
      message: message,
    });

    if (response.data && response.data.success) {
      console.log('SMS sent successfully:', response.data);
      return true;
    } else {
      console.error('Failed to send SMS:', response.data);
      return false;
    }
  } catch (error: any) {
    console.error(`Error sending SMS: ${error.message}`);
    return false;
  }
};

export { sendSMS };
