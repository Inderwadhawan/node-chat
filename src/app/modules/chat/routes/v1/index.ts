import { API_CONSTANTS } from "../../../../constants";
import express from "express";
import router from "./chat";
import { authenticate } from "../../../../middleware/auth";
const chatRouter = express.Router();

/**Declare here swagger start */
/**
/**
 * @swagger
 * components:
 * securitySchemes:
 *     Authorization:
 *       type: apiKey
 *       in: header
 *       name: token
 *   parameters:
 *     IHeaderToken:
 *       in: header
 *       name: token
 *       required: true
 *       schema:
 *         type: string
 *     IidPath:
 *       in: query
 *       name: id 
 *       required: false
 *       schema:
 *         type: string
 *     ISkip:
 *       in: query
 *       name: skip
 *       schema:
 *         type: integer
 *     ILimit:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *     Pagination:
 *       in: query
 *       name: pagination
 *       schema:
 *         type: boolean
 *     IidQuery:
 *       in: query
 *       name: id
 *       schema:
 *         type: integer
 *   schemas:
 *     addGoals:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         icon:
 *           type: string
 *         status:
 *           type: string
 *     editConfiguration:
 *       type: object
 *       properties:
 *         key_value:
 *           type: string
 *         type:
 *           type: string
 *     sendEmail:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *     sendNotification:
 *       type: object
 *       properties:
 *         user_ids:
 *           type: string
 *     IAdminSetting:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         recurring_discount:
 *           type: number
 *         one_time_cashback:
 *           type: number
 *         reccuring_cashback:
 *           type: number
 *         vendor_commision:
 *           type: number
 *         otp_valid_time:
 *           type: number
 *         otp_digits:
 *           type: number
 *     IResponse:
 *       allOf:
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *             status:
 *               type: number
 *             success:
 *               type: boolean
 *
 */


chatRouter.use(`${API_CONSTANTS.VERSIONS.V1}/chat`, router);
export default chatRouter;