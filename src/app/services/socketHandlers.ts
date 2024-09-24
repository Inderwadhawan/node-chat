import { Server as SocketIOServer, Socket } from 'socket.io';
import { chatController } from '../modules/chat/controllers/chatController'; // Adjust path accordingly
import { Request, Response } from 'express';
import Organization from '../models/organization';
import { IOrganization, IUser } from '../interfaces';
import User from '../models/User';
import chatRoom from '../models/chatroom';
import { Types } from 'mongoose'; // For ObjectId types

// Define a function to mimic req.body and req.organization for the socket message
const createSocketRequest = (msg: any): Request => {
  return {
    body: {
      mobile: msg.mobile,
      email: msg.email,
      room_id: msg.room_id,
      type: msg.type,
      message: msg.message,
    },
    organization: {
      id: msg.organization_id, // Assuming you get the organization ID from the socket message
    },
  } as Request;
};

const createSocketRequest2 = (msg: any): Request => {
  return {
    body: msg,
  } as Request;
};

// Mocking the Response object with necessary methods for status and json handling
const createMockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.status = (statusCode: number) => {
    return res as Response;
  };

  res.json = (responseBody: any) => {
    return res as Response;
  };

  res.send = (body?: any) => {
    return res as Response;
  };

  return res as Response;
};

export const socketHandler = (io: SocketIOServer) => {

  io.on('connection', async (socket: Socket) => {
    const userMobile = socket.handshake.auth.mobile;
    const organizationCode = socket.handshake.auth.code;
    console.log('Socket connected userMobile :', userMobile);

    // Join user to all rooms during socket connection
    const userRooms = await fetchUserRooms(userMobile, organizationCode);
    
    if (userRooms && userRooms.length > 0) {
      userRooms.forEach((roomId: string) => {
        socket.join(roomId); // Join each room the user belongs to
        console.log(`User joined room: ${roomId}`);
      });
    }

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    // When a user joins a room
    socket.on('joinRoom', async (data: any) => {
      socket.join(data.room); // Join the specified room

      const fakeReq = createSocketRequest2(data) as Request;
      await OrganizationSave(fakeReq, data.code);

      const fakeRes = createMockResponse();
      const msg = await chatController.fetchChatMessages(fakeReq, fakeRes);
      let userData = {
        msg : msg,
        mobile : data.mobile
      }
      io.to(data.room).emit('allChatMessage', userData); // Emit to the room only
    });

    // Handle receiving and broadcasting chat messages
    socket.on('sendMessage', async (msg: any) => {
      try {
        const fakeReq = createSocketRequest(msg) as Request;
        await OrganizationSave(fakeReq, msg.code);
        const fakeRes = createMockResponse();
        await chatController.sendRoomMessage(fakeReq, fakeRes);
        io.to(msg.room_id).emit('receiveNewMessage', msg); // Emit to the room only
      } catch (error) {
        console.error('Error handling socket message:', error);
      }
    });

    // Handle create room event
    socket.on('createRoom', async (msg: any) => {
      try {
        const fakeReq = createSocketRequest2(msg) as Request;
        await OrganizationSave(fakeReq, msg.code);
        const fakeRes = createMockResponse();
        let roomid : any = await chatController.createRoom(fakeReq, fakeRes);
        // console.log('roomid');
        socket.join(roomid); // Join each room the user belongs to
        // console.log('roomid call io emit ');
        io.to(roomid).emit('receiveNewRoomId', roomid); // Emit to the room only

      } catch (error) {
        console.error('Error handling createRoom message:', error);
      }
    });
  });
};

// Function to find the organization and attach it to the request object
const OrganizationSave = async (req: Request, code: string) => {
  try {
    const organization = await Organization.findOne({ code }) as IOrganization;
    if (organization) {
      req.organization = { id: organization.id }; // Attach organization ID to the request
    } else {
      console.error('Organization not found');
    }
  } catch (error) {
    console.error('Error fetching organization:', error);
  }
};

// Function to fetch all rooms the user belongs to
const fetchUserRooms = async (mobile: string, code: string) => {
  try {
    const organization = await Organization.findOne({ code }) as IOrganization;

    if (!organization) {
      console.error('Organization not found');
      return [];
    }

    const user = await User.findOne({ mobile }) as IUser;
    if (!user) {
      console.error('User not found');
      return [];
    }

      // Find rooms where the user is part of the user_ids array
      const rooms = await chatRoom.find({ user_ids: user._id }, { _id: 1 }).lean();

      // Explicitly cast the result to a more appropriate type to handle the ObjectId
      const roomIds = (rooms as unknown as Array<{ _id: Types.ObjectId }>).map(room => room._id.toString());
  
      return roomIds;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
};
