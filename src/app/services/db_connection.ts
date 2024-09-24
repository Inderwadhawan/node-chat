import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if(process.env.APP_ENVIRONMENT=='Dev')
  {
    var mongoUri = process.env.MONGO_URI!;
  }else{
    const username = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;
    const dbName = process.env.MONGO_DB;
    const host = process.env.MONGO_HOST;
    var mongoUri = `mongodb://${username}:${password}@${host}/${dbName}`;
  }

console.log(mongoUri);
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

