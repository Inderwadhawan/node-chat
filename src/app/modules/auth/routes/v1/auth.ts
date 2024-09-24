import { Router } from 'express';
import { authController } from '../../controllers/auth';
const router = Router();


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register or Login a new user
 *     description: Allows a user to register with their details
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 description: The user's password must be strong
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.register)



/**
 * @swagger
 * /api/v1/auth/verify_otp:
 *   post:
 *     summary: Verify otp api 
 *     description: Allows a user to verify otp send on email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The Enter email
 *                 example: abc@example.com
 *               otp:
 *                 type: number
 *                 description: The Enter otp
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email or mobile
 *       500:
 *         description: Internal server error
 */
router.post('/verify_otp', authController.verifyOtp)



/**
 * @swagger
 * /api/v1/auth/resend_otp:
 *   post:
 *     summary: Resend otp api 
 *     description: Allows a user to resend otp send on email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The Enter email
 *                 example: abc@example.com
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email or mobile
 *       500:
 *         description: Internal server error
 */
router.post('/resend_otp', authController.resendOtp)

// /**
//  * @swagger
//  * /api/auth/login:
//  *   post:
//  *     summary: Login API for user
//  *     description: Allows a user to log in with their email and mobile
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 description: The user's email
//  *                 example: john@example.com
//  *               password:
//  *                 type: string
//  *                 description: The user's password
//  *                 example: 1234567890
//  *     responses:
//  *       200:
//  *         description: Successful login
//  *       400:
//  *         description: Invalid email or mobile
//  *       500:
//  *         description: Internal server error
//  */
// // router.get('/:roomid', getChatByRoomId)
// // router.get('/:id', getChatById)
// router.post('/login', authController.login)


// /**
//  * @swagger
//  * /api/v1/auth/login:
//  *   post:
//  *     summary: Login API for user with mobile otp
//  *     description: Allows a user to login with their mobile
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               mobile:
//  *                 type: string
//  *                 description: The Enter mobile
//  *                 example: 98756231
//  *     responses:
//  *       200:
//  *         description: Successful login
//  *       400:
//  *         description: Invalid email or mobile
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/loginViaMobile', authController.loginViaMobile)

export default router;
