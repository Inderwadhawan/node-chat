import { Schema,model } from 'mongoose';
import { IChatRoomMessage } from '../interfaces';


const ChatRoomMessage = new Schema<IChatRoomMessage>(
  {
    message: { type: String, required: true },
    type: { type: String, required: true, default:"text" },
    status: { type: String, required: true,default:"1" },
    is_read: {type: Boolean,default: false },
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the user
    room_id: { type: Schema.Types.ObjectId, ref: 'chat_rooms', required: true }, // Reference to the user
    organization_id: { type: Schema.Types.ObjectId, ref: 'organizations', required: true }, // Reference to the user
    deleted_at: {type:Date,default:null}
  },
  { timestamps: true }
);


const chatRoomMessage = model<IChatRoomMessage>('chat_messages', ChatRoomMessage);
export default chatRoomMessage;