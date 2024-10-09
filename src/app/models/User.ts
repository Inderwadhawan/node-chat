import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/';
import { GENDER ,STATUS,USER_ROLE} from "../enums/";
import mongooseDelete, { SoftDeleteDocument, SoftDeleteModel } from 'mongoose-delete';
import { required } from 'joi';


const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: false,
  },
  role:{
    type: String,
    enum:Object.values(USER_ROLE),
    default:USER_ROLE.USER,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: false,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    required: false,
  },
  password: {
    type: String,
    trim: true,
    required: false,
  },
  dob:{
    type:Date,
    required: false,
    default:null
  },
  image: {
    type: String,
    trim: true,
  },
  deviceType: {
    type: String,
    required: false,
    trim: true,
  },
  deviceToken: {
    type: String,
    required: false,
    trim: true,
  },
  otp: {
    type: Number,
    required: false,
  },
  otpExpiry: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum:Object.values(STATUS),
    default:STATUS.ACTIVE,
    required: false,
  },
  googleLoginId: {
    type: String,
    required: false,
  },
  facebookLoginId: {
    type: String,
    required: false,
  },
  appleLoginId: {
    type: String,
    required: false,
  },
  socialLoginId :{
    type: String,
    default : null  
  },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    default:GENDER.MALE,
    required: false
  },
  userName:{
    type:String,
    required: true
  },
  organization_id: { type: Schema.Types.ObjectId, ref: 'organizations', required: true },
  userBio:{type:String,required:false},
  termCondition:{type:Number,enum:Object.values([0,1]),default:0}
},
{
  timestamps: true,
}
);

// Add the mongoose-delete plugin
userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User = model<IUser, SoftDeleteModel<IUser>>('users', userSchema);


export default User;
