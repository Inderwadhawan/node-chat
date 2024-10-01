import { Request, Response } from 'express';
import User from '../../../models/User';
import ChatRoom from '../../../models/chatroom';
import ChatRoomMessages from '../../../models/chatroommessage';
import * as dotenv from "dotenv";
import  bcrypt from 'bcrypt';
import {makeUsername} from '../../../services/common_functions'
import mongoose, { ObjectId } from 'mongoose';
import blockedUsers from '../../../models/blockedusers';

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
              role:member.role??'USER',
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
    const { mobile } = req?.params ?? req.body; // Assuming mobile is passed as a URL parameter

    // Find the user by mobile number
    const user = await User.findOne({ mobile: mobile });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch rooms where the user is a member
    const rooms = await ChatRoom.find({ user_ids: user._id }).sort({ createdAt: -1 });

    // Fetch latest message for each room and personalize room names
    const roomsWithLatestMessages = await Promise.all(
      rooms.map(async (room) => {
        // Fetch the latest message for the room
        const latestMessage = await ChatRoomMessages.findOne({ room_id: room._id })
          .sort({ createdAt: -1 }) // Sort by creation date in descending order
          .populate({
            path: 'user_id',
            select: 'name email', // Include user's name and email
          });

        // Check if user_ids is an array before using filter
        const otherUserIds = Array.isArray(room.user_ids)
          ? room.user_ids.filter((id) => id.toString() !== user._id.toString()) // Filter out current user
          : [];

        // Fetch the other users' details
        const otherUsers = await User.find({ _id: { $in: otherUserIds } }, 'name email');

        // Personalize the room name
        let roomName = 'Chat Room'; // Default name
        if (otherUsers.length === 1) {
          roomName = otherUsers[0].name; // If it's a one-on-one chat, use the other user's name
        } else if (otherUsers.length > 1) {
          roomName = otherUsers.map(user => user.name).join(', '); // For group chats, show multiple names
        }

        return {
          room: { ...room.toObject(), roomName }, // Add personalized room name
          latest_message: latestMessage,
        };
      })
    );

    if (!roomsWithLatestMessages || roomsWithLatestMessages.length === 0) {
      return res.status(404).json({ message: 'Room not found for this user' });
    }

    return res.status(200).json({ rooms: roomsWithLatestMessages });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching rooms', error });
  }
};





    // Fetch chat messages by room ID
    fetchChatMessages = async (req: Request, res: Response) => {
    try {
      const { room,mobile } = req?.params??req.body; // Assuming room_id is passed as a URL parameter
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
  
      // if (!messages.length) {
      //   return res.status(404).json({ message: 'No messages found for this room' });
      // }
      let blockData = 0;
      let user = await User.findOne({ mobile: mobile });
        if(user?.role === 'USER'){
           const blockDataVal = await blockedUsers.findOne({room_id: room,user_id: user?._id});
           if(blockDataVal){
            blockData = 1;
           }
        }else{
          blockData = 0;
        }

        let data = {
          msg : messages,
          user : user,
          block : blockData
        }
        return data;

    } catch (error) {
      return res.status(500).json({ message: 'Error fetching messages', error });
    }
  }


  blockUser = async (req: Request | any, res: Response) => {
    try {
        let { room,mobile } = req.body;

        let user_id = await User.findOne({ mobile: mobile });          

          if (!user_id) {
              return res.status(404).json({ message: 'User not found' });
          }
          user_id = user_id._id;

        const roomData = await ChatRoom.findOne({_id:room});

        if (!roomData) {
          return res.status(404).json({ message: 'Room not found' });
        }
  
        // Check if user_ids is an array before using filter
        const otherUserIds = Array.isArray(roomData.user_ids)
        ? roomData.user_ids.find((id) => !id.equals(user_id)) // Use .equals() to compare ObjectIds and return the first match
        : null;


        const blockData = await blockedUsers.findOneAndDelete({
          blocked_by_id: user_id,
          user_id: otherUserIds  // Assuming this contains a single user ID
        });
        
        if (blockData) {
          // Entry was found and deleted, return 0
          return 0;
        } else {
          // Entry not found, create a new one
          const roomMessagesSaved = await blockedUsers.create({
            room_id: roomData._id,
            blocked_by_id: user_id,
            user_id: otherUserIds // Assuming otherUserIds is the ID of the user to be blocked
          });
        
          return 1;
        }
        


       
        }
        catch (error) {
        return res.status(400).json({ message: 'Error in blocked send', error });
        }
    }

    checkBlockUser = async (req: Request | any, res: Response) => {
      try {

          // console.log(req.body);

          let { room,mobile } = req.body;

          let user_id = await User.findOne({ mobile: mobile });          

          if (!user_id) {
              return res.status(404).json({ message: 'User not found' });
          }
          user_id = user_id._id;
  
          const roomData = await ChatRoom.findOne({ user_ids: user_id},{id:room});
  
          if (!roomData) {
            return res.status(404).json({ message: 'Room not found' });
          }
    
          // Check if user_ids is an array before using filter
          const otherUserIds = Array.isArray(roomData.user_ids)
          ? roomData.user_ids.find((id) => !id.equals(user_id)) // Use .equals() to compare ObjectIds and return the first match
          : null;

          
          const blockData = await blockedUsers.findOne({ blocked_by_id: otherUserIds},{user_id:user_id});
  
            if (blockData) {
              return 1;
            }
            return 0;

          }
          catch (error) {
            return 0;
          // return res.status(400).json({ message: 'Error in blocked send', error });
          }
      }


    checkBlockRoom = async (req: Request | any, res: Response) => {
      try {
          let { room } = req.body;
          let blocked = await blockedUsers.findOne({ room_id : room });          
          if (!blocked) {
              return 0;
          }
          return 1;
          }
          catch (error) {
            return 0;
          }
      }

}
export const chatController = new ChatController();