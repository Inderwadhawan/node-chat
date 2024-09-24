import { Schema,model } from 'mongoose';
import { IChatRoom } from '../interfaces';


const ChatRoom = new Schema<IChatRoom>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String },
    user_ids: [{ type: Schema.Types.ObjectId, ref: 'users'}], // Reference to the user
    status: { type: String, required: true,default:"1" },
    organization_id: { type: Schema.Types.ObjectId, ref: 'organizations', required: true },
    deleted_at: {type:Date,default:null}
  },
  { timestamps: true }
);


const chatRoom = model<IChatRoom>('chat_rooms', ChatRoom);
export default chatRoom;