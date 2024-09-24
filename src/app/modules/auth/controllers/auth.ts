import { Request, Response } from 'express';
import User from '../../../models/User';
import { IUser } from '../../../interfaces';
import { sendOtpEmail } from '../../../services/emailService';
import  bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
// import { ACCESSORIES, EXCERCISETYPE, EXPERIENCEINLIFTING } from '../../../enums';
import { setRedisData,getRedisData } from '../../../services/redis_cache';
import {jwtService} from '../../../services/jwt.service'

dotenv.config();

export class AuthController {

  private STATIC_OTP: boolean;

  constructor() {
    this.STATIC_OTP = process.env.STATIC_OTP === 'true'; // Convert string to boolean
  }

  // init = async (req:Request, res:Response) => {
  //   try {
  //       const messages = 'Fetch inital details';
  //       const goals = await Goals.find({status:'Active'}); 
  //       // Extract values from enums
  //       const excercise = Object.values(EXCERCISETYPE);
  //       const lifting = Object.values(EXPERIENCEINLIFTING);
  //       const accessories = Object.values(ACCESSORIES);
  
  //       return res.json({ message: messages ,goals,excercise,lifting,accessories}); 
      
  //   } catch (error) {
  //       return res.status(500).json({ message: 'Error logging in', error });
  //   }
  // };

  register = async (req:Request, res:Response) => {
    const { email, mobile, password } = req.body;
    try {
      var messages = '';
      var isMatch:boolean = false;
      var token:string = '';
      
      let data = {
              email : email,
              mobile : mobile,
              password : await bcrypt.hash(password,10),
              otp: 0 ,
              userName : await this.makeUsername(email)
              }

      let user = await User.findOne({ email }) as IUser;
      if (!user) {

          if(!this.STATIC_OTP){
            var otp = this.generateOtp();
          }else{
            otp = 445566;
          }
          data.otp = otp;
          let  user = new User(data);
          await user.save();

          await setRedisData('user_'+email,user,1200); 

          try{
           await setRedisData('otp_'+email,otp,600); 

           if(!this.STATIC_OTP){
              // Send OTP to email
              await sendOtpEmail(email, otp);
           }

          } catch (error: any) {
            
          }



          var messages = 'Otp Send successful. Check Your Email!';
          return res.json({ message: messages,is_new_user:true}); 
           

        }else{
          await setRedisData('user_'+email,user,1200); 

          isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
               messages = 'Login failed. Invalid Password';
          }else{
            var messages = 'Thanks';
            var token =  jwtService.sign({ user },'2h');
            // var token = jwt.sign({ id: user._id }, this.SECRET_KEY, { expiresIn: '2h' });
          }
        }

      if (user && isMatch) {
        return res.json({ message: messages, user ,token,is_new_user:false}); 
      } else if (user && !isMatch)  {
        return res.status(400).json({ message: messages });
      }else{
        return res.status(400).json({ message: messages });
      }

     
    } catch (error) {
      return res.status(400).json({ message: 'Error registering user', error });
    }
};

login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
        var messages = 'Login successful';
        var isMatch:boolean = false;
        var token = '';
        const user = await User.findOne({ email }) as IUser;
        if (!user) {
             messages = 'E-mail not register with us.';
          }else{
            isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                 messages = 'Login failed. Invalid Password';
            }
          
            var token =  jwtService.sign({ user },'2h');
        }

      if (user && isMatch) {
        return res.json({ message: messages, user ,token}); 
      } else if (user && !isMatch)  {
        return res.status(400).json({ message: messages });
      }else{
        return res.status(400).json({ message: messages });
      }
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};


makeUsername = async (email: string): Promise<string> => {
  // Get the part of the email before the "@" symbol
  const emailPrefix = email.split('@')[0];

  // Generate a random 4-digit number
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();

  // Combine the email prefix with the random digits to create a unique username
  const username = `${emailPrefix}${randomDigits}`;

  return username;
};

 generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};


 verifyOtp = async (req: Request, res: Response) => {
  const {  otp, email } = req.body;
  let token: string = '';

  try {
    // Retrieve user data from Redis
    let user = await getRedisData('user_' + email);
    
    if (!user) {
      user = await User.findOne({ email }) as IUser;
      if(!user){
          return res.status(200).json({ message: 'Email on registered with us!'});
      }
    }

    // Retrieve OTP from Redis
    const storedOtp = await getRedisData('otp_'+email);
    if(storedOtp == null)
    {
      return res.json({ message: 'OTP Expired!'});
    }
    // Check if the stored OTP matches the provided OTP
    if (storedOtp === otp) {
      // Generate a JWT token
       token =  jwtService.sign({ user },'2h');
      // token = jwt.sign({ id: user._id }, this.SECRET_KEY, { expiresIn: '2h' });

      // Return success response with token
      return res.json({ message: 'OTP verified successfully!', user, token });
    } else {
      // Return error response if OTP is invalid
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    // Return error response in case of an exception
    return res.status(500).json({ message: 'Error verifying OTP', error });
  }
};



resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  try {
    // Retrieve user data 
    var user = await User.findOne({ email }) as IUser;
    if(!user){
        return res.status(200).json({ message: 'Email on registered with us!','status':false});
    }
  
    var otp = this.generateOtp();
    try{
        await setRedisData('otp_'+email,otp,600); 
        // Send OTP to email
        await sendOtpEmail(email, otp);

    } catch (error: any) {
      
    }
    var messages = 'Otp Send successful. Check Your Email!';
    return res.status(200).json({ message: messages,'status':true});

  } catch (error) {
    // Return error response in case of an exception
    return res.status(500).json({ message: 'Error verifying OTP', error ,'status':false});
  }
};



}
export const authController = new AuthController();