import { Router } from 'express';
import { userController } from '../../controllers/user';
const router = Router();

/**
 * @openapi
 * /api/v1/admin/user/list:
 *   post:
 *     summary: Get list of users
 *     description: Fetches a list of users.
 *     tags:
 *       - Admin Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *       500:
 *         description: Internal server error
 */
router.post('/list', userController.fetchUsersList);

export default router;
