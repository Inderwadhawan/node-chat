import express from 'express';
import dotenv from 'dotenv';
import setupSwagger from './swagger';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
import { socketHandler } from './app/services/socketHandlers'; // Import socket handler

dotenv.config();

import app from './app/index';

// Create HTTP server and set up Socket.IO
import http from 'http'; // Use ES module import for http
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
});

// Use the socket handler for all socket events
socketHandler(io);

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Swagger
setupSwagger(app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
