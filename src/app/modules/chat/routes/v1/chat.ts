
import { Router } from 'express';
import { chatController } from '../../controllers/chatController';
import { authenticate } from "../../../../middleware/auth";

const router = Router();


/**
 * @swagger
 * /api/v1/chat/sendMessage:
 *   post:
 *     summary: send message
 *     description: send message to user with organization.
 *     security:
 *       - BearerAuth: []  # Apply Bearer token authentication 
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - type
 *               - user_id
 *               - room_id
 *             properties:
 *               message:
 *                 type: string
 *                 description: message
 *               type:
 *                 type: string
 *                 description: text, media
 *               user_id:
 *                 type: objectId
 *                 description: sending User message id
 *               room_id:
 *                 type: objectId
 *                 description: sending chat room id
 *     responses:
 *       201:
 *         description: Message send successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message send successfully
 *                 user:
 *                   type: object
 *                   description: Message send
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


router.post('/sendMessage', authenticate.authenticate, chatController.sendRoomMessage);

/**
 * @swagger
 * /api/v1/chat/fetchRooms/:
 *   post:
 *     summary: create room
 *     description: reate room for user with organization.
 *     security:
 *       - BearerAuth: []  # Apply Bearer token authentication 
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: message
 *               type:
 *                 type: string
 *                 description: normal, order , group
 *     responses:
 *       201:
 *         description: Room Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created successfully
 *                 user:
 *                   type: object
 *                   description: The updated user details
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post('/createRoom', authenticate.authenticate, chatController.createRoom);

/**
 * @swagger
 * /api/v1/chat/rooms/{mobile}:
 *   get:
 *     summary: Fetch room based on user's mobile number
 *     parameters:
 *       - in: path
 *         name: mobile
 *         required: true
 *         schema:
 *           type: string
 *           example: '9729833940'
 *     responses:
 *       200:
 *         description: Room found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     user_ids:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: User or room not found
 */

router.get('/rooms/:mobile', authenticate.authenticate,  chatController.fetchRooms);

  /**
   * @swagger
   * /api/v1/chat/messages/{room}:
   *   get:
   *     summary: Fetch chat messages of a particular room
   *     parameters:
   *       - in: path
   *         name: room_id
   *         required: true
   *         schema:
   *           type: string
   *           example: '60b8d295f8f5c60d3d4a28a6'
   *     responses:
   *       200:
   *         description: Messages found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 messages:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       message:
   *                         type: string
   *                       user_id:
   *                         type: string
   *                       room_id:
   *                         type: string
   *                       type:
   *                         type: string
   *       404:
   *         description: Messages not found
   */
  router.get('/messages/:room', authenticate.authenticate,  chatController.fetchChatMessages);

export default router;
