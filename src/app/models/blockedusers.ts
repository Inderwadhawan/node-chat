import { Schema,model } from 'mongoose';
import { IBlockedUser } from '../interfaces';


const BlockedUser = new Schema<IBlockedUser>(
  {
    blocked_by_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the user
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the user
    room_id: { type: Schema.Types.ObjectId, ref: 'chat_rooms', required: true }, // Reference to the user
  },
  { timestamps: true }
);


const blockedUsers = model<IBlockedUser>('blocked_users', BlockedUser);
export default blockedUsers;