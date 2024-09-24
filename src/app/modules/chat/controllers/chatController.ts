import { Request, Response } from 'express';
import User from '../../../models/User';
import ChatRoom from '../../../models/chatroom';
import ChatRoomMessages from '../../../models/chatroommessage';
import * as dotenv from "dotenv";
import  bcrypt from 'bcrypt';
import {makeUsername} from '../../../services/common_functions'
import mongoose, { ObjectId } from 'mongoose';

dotenv.config();

export class ChatController {


    sendRoomMessage = async (req: Request | any, res: Response) => {
        try {
            let { mobile,email,room_id,type,message } = req.body;

            let userData;
            if(mobile){
                userData = await User.findOne({ mobile: mobile });
            }else{
                userData = await User.findOne({ email: email });
            }

            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            let dataTosave = {
                organization_id: req.organization.id,
                message: message,
                user_id: userData._id,
                room_id:room_id,
                type:type??"text"
            };
        
            let roomMessagesSaved = await ChatRoomMessages.create(dataTosave);
        
            return res.status(201).json({ message: 'Message send successfully', chat: roomMessagesSaved });
            }
            catch (error) {
            return res.status(400).json({ message: 'Error Message send', error });
            }
        }

    

    //Create Room function
    createRoom = async (req: Request | any, res: Response) => {
        try {

        const { members, room } = req.body;
        // console.log(members);

        let userIds: mongoose.Types.ObjectId[] = []; // To store user IDs after creation or update

        for (let member of members) {
          // Check if the user exists based on email
          let user = await User.findOne({ mobile: member.mobile });
    
          if (!user) {
            // Create the user if they do not exist
            user = new User({
              name: member.name,
              email: member.email,
              mobile: member.mobile,
              password: await bcrypt.hash('123456', 10),
              otp: 0,
              userName: await makeUsername(member?.email??member.mobile),
            });
    
            await user.save(); // Save the new user
          }
    
           // Cast user._id to mongoose.Types.ObjectId before pushing
            userIds.push(user._id as mongoose.Types.ObjectId);
        }

        // Use findOneAndUpdate to create or update the chat room
        const chatRoomData = await ChatRoom.findOneAndUpdate(
            { organization_id: req.organization.id, name: room.name }, // Find chat room by organization_id and name
            {
            $set: {
                type: room.type,
                user_ids: userIds,
                image:room.image
            },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true } // Create or update the chat room
        );
          return chatRoomData._id;
            // return res.status(201).json({ message: 'Room Record updated successfully', room: chatRoomData });
        }
        catch (error) {

      console.error(error);
          
            return res.status(400).json({ message: 'Error creating Room Record', error });
        }
        }


    // Fetch room based on user's mobile number
    fetchRooms = async (req: Request, res: Response) => {
    try {
      const { mobile } = req?.params??req.body; // Assuming mobile is passed as a URL parameter
  
      // Find the user by mobile number
      const user = await User.findOne({ mobile: mobile });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
    //   // Find the room where the user is a member
    //   const room = await ChatRoom.find({ user_ids: user._id })
    //   .sort({ createdAt: -1 }); // Sort by creation date in descending order (latest first)

    // Fetch rooms where the user is a member and sort by creation date
    const rooms = await ChatRoom.find({ user_ids: user._id })
      .sort({ createdAt: -1 }); // Sort rooms by creation date in descending order

    // Fetch latest message for each room
    const roomsWithLatestMessages = await Promise.all(rooms.map(async (room) => {
      // Fetch the latest message for the room
      const latestMessage = await ChatRoomMessages.findOne({ room_id: room._id })
        .sort({ createdAt: -1 }) // Sort by creation date in descending order
        .populate({
          path: 'user_id',
          select: 'name email' // Specify fields to include from User
        });

        return {
            room,
            latest_message: latestMessage
          };
          
        }));
  
      if (!roomsWithLatestMessages) {
        return res.status(404).json({ message: 'Room not found for this user' });
      }
      // console.log(roomsWithLatestMessages);
  
      return res.status(200).json({ room:roomsWithLatestMessages });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching room', error });
    }
  }


    // Fetch chat messages by room ID
    fetchChatMessages = async (req: Request, res: Response) => {
    try {
      const { room } = req?.params??req.body; // Assuming room_id is passed as a URL parameter
    // Fetch messages for the specified room and populate user and room details
    const messages = await ChatRoomMessages.find({ room_id: room })
        .sort({ _id: -1 })
        .limit(50) // Limit to the last 50 messages
        .populate({
        path: 'user_id',
        select: 'id name email role mobile ' // Specify fields to include from User
        })
        .populate({
        path: 'room_id',
        select: 'id name type' // Specify fields to include from ChatRoom
        });
  
      if (!messages.length) {
        return res.status(404).json({ message: 'No messages found for this room' });
      }
        return messages;
      // return res.status(200).json({ messages });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching messages', error });
    }
  }

}
export const chatController = new ChatController();