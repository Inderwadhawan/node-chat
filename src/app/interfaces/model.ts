import { Document, ObjectId, Schema,Types } from 'mongoose';

export interface IUser extends Document {
  _id: any;
  name: string,
  email: string,
  dob: Date,
  mobile: string,
  password: string,
  status: string,
  otp: Number,
  gender: string,
  role: String,
  image: string,
  deviceType: string,
  deviceToken: string,
  otpExpiry: Date,
  googleLoginId: string,
  facebookLoginId: string,
  appleLoginId: string,
  socialLoginId: string,
  userName: string,
  termCondition: Number,
  userBio: string;
  organization_id:ObjectId;

}


export interface IUserGallery {
  path: string;
  fileType: 'image' | 'video';
  createdAt: Date;
  user_id: Schema.Types.ObjectId; // Assuming this references a user by ID
}


export interface IOrganization extends Document {
  name: string;
  status: string;
  domain:string;
  code:string;
  expiry_date:Date;
  chat_room_ids:ObjectId;
  deleted_at:Date;
}


export interface IChatRoom extends Document {
  name: string;
  status: string;
  image: string;
  user_ids:ObjectId;
  type:'normal' | 'order' | 'group';
  organization_id:ObjectId;
  deleted_at:Date;
}


export interface IChatRoomMessage extends Document {
  message: string;
  status: string;
  room_id:ObjectId;
  user_id:ObjectId;
  type:'text' | 'media';
  organization_id:ObjectId;
  deleted_at:Date;
}


export interface IBlockedUser extends Document {
  blocked_by_id: ObjectId;
  user_id: ObjectId;
  room_id:ObjectId;
  deleted_at:Date;
}