import { Router } from 'express';
import { authController } from '../../controllers/auth';
const router = Router();
import { joiValidation } from "../../../../../middleware/joi.middleware";
import {adminAuthValidators} from "../../validators/auth"
/**
 * @openapi
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Logs in an admin with email and password.
 *     tags:
 *       - Admin Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: your-jwt-token
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

router.post('/login',joiValidation.validateJoiReq(adminAuthValidators.login), authController.login)

export default router;
