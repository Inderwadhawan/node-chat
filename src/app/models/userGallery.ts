import { Schema,model } from 'mongoose';
import { IUserGallery } from '../interfaces';


const userGallerySchema = new Schema<IUserGallery>(
  {
    path: { type: String, required: true },
    fileType: { type: String, enum: ['image', 'video'], required: true ,default:'image'},
    createdAt: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the user
  },
  { timestamps: true }
);


const userGallery = model<IUserGallery>('user_gallery', userGallerySchema);
export default userGallery;