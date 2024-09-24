import { Router } from 'express';
import { profileController } from '../../controllers/profileController';
const router = Router();

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the profile of the specified user.
 *     tags:
 *       - User Details
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string   
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 status:
 *                   type: string
 *       401:
 *         description: Unauthorized access. Authentication required.
 *       404:
 *         description: User not found.
 */

router.get('/profile', profileController.profile);

/**
 * @swagger
 * /api/v1/user/profile/update:
 *   post:
 *     summary: Update profile details
 *     description: Updates and returns user profile details including basic information and additional attributes.
 *     security:
 *       - BearerAuth: []  # Apply Bearer token authentication 
 *     tags:
 *       - User Details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dob
 *               - feet
 *               - centimeters
 *               - inchs
 *               - weight
 *               - heightType
 *               - weightType
 *               - deviceToken
 *               - gender
 *               - termCondition
 *               - goalId
 *               - exercise_week
 *               - weight_lifting_exp
 *               - user_accessories
 *               - userBio
 *             properties:
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth (YYYY-MM-DD)
 *               feet:
 *                 type: number
 *                 description: Height in feet
 *               inchs:
 *                 type: number
 *                 description: Height in inches
 *               centimeters:
 *                 type: number
 *                 description: Height in centimeters
 *               weight:
 *                 type: number
 *                 description: Weight of the user
 *               heightType:
 *                 type: string
 *                 enum: [FEET, CENTIMETERS]
 *                 description: The unit type for height
 *               weightType:
 *                 type: string
 *                 enum: [LBS, KG]
 *                 description: The unit type for weight
 *               deviceToken:
 *                 type: string
 *                 description: The user's device token for push notifications
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 description: The user's gender
 *               termCondition:
 *                 type: integer
 *                 enum: [1, 0]
 *                 description: Whether the user accepted the terms and conditions (1 for yes, 0 for no)
 *               goalId:
 *                 type: string
 *                 description: The ID of the user's goal
 *               exercise_week:
 *                 type: number
 *                 description: The number of weeks the user has been exercising
 *               weight_lifting_exp:
 *                 type: string
 *                 description: The user's experience level in weight lifting
 *               user_accessories:
 *                 type: string
 *                 description: Select user accessories
 *               userBio:
 *                 type: string
 *                 description: enter user bio   
 *     responses:
 *       201:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
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



router.post('/profile/update', profileController.profileUpdate);


// router.post('/follow', userController.followUser);
// router.post('/unfollow', userController.unfollowUser);

export default router;
