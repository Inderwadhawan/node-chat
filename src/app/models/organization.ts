import { Schema,model } from 'mongoose';
import { IOrganization } from '../interfaces';


const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, required: true,default:"1" },
    chat_room_ids: { type: Schema.Types.ObjectId, ref: 'chat_room', required: true }, // Reference to the user
    deleted_at: {type:Date,default:null}
  },
  { timestamps: true }
);


const Organization = model<IOrganization>('organizations', OrganizationSchema);
export default Organization;