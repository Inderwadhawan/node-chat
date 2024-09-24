import { API_CONSTANTS } from "../../../../../constants";
import express from "express";
import router from "./auth";
import userRouter from "./userRoutes";
// import { reqExtractor } from "../../../../middlewares/req.extractor";
import { authenticate } from "../../../../../middleware/auth";
const adminAuthRouter = express.Router();

/**
 * @swagger
 * components:
 *   parameters:
 *     IHeaderToken:
 *       in: header
 *       name: token
 *       required: true
 *       schema:
 *         type: string
 *     IFilterByQuery:
 *       in: query
 *       name: filterBy
 *       schema:
 *         type: string
 *         enum:
 *           - Monthly
 *           - Yearly
 *     IReferralQuery:
 *       in: query
 *       name: referral
 *       schema:
 *          type: string
 *   schemas:
 *     login:
 *       type: object
 *       properties:
 *         login_type:
 *           type: string
 *           enum:
 *             - Phone
 *             - Email
 *             - Driver
 *         phone_number:
 *           type: string
 *         dial_code:
 *           type: string
 *     dashboardlogin:
 *       type: object
 *       properties:
 *         user_type:
 *           type: string
 *           enum:
 *             - ADMIN
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     refreshToken:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *     vendorlogin:
 *       type: object
 *       properties:
 *         user_type:
 *           type: string
 *           enum:
 *             - SERVICE PROVIDER
 *             - BRANCH
 *         email:
 *           type: string
 *         flow_type:
 *           type: number
 *         password:
 *           type: string
 *         device_token:
 *           type: string
 *     verifyOTP:
 *       type: object
 *       properties:
 *         email_phone:
 *           type: string
 *         otp:
 *           type: string
 *         login_type:
 *           type: string
 *           enum:
 *             - Customer
 *         device_token:
 *           type: string
 *         device_type:
 *           type: string
 *     resendOTP:
 *       type: object
 *       properties:
 *         email_phone:
 *           type: string
 *         dial_code:
 *           type: string
 *         login_type:
 *           type: string
 *           enum:
 *             - Customer
 *         device_token:
 *           type: string
 *     updateProfile:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         device_token:
 *           type: string
 *         device_type:
 *           type: string
 *         referral:
 *           type: string
 *     updateUserProfile:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         dial_code:
 *           type: string
 *         phone_number:
 *           type: string
 *         country_code:
 *           type: string
 *         country_id:
 *           type: number
 *         image:
 *           type: string
 *         gender:
 *           type: string
 *         dob:
 *           type: string
 *         newsletter_subscription:
 *           type: number
 *           default: false
 *         disable_notification:
 *           type: boolean
 *           default: false
 *     SignUp:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         dial_code:
 *           type: string
 *         phone_number:
 *           type: string
 *         address:
 *           type: object
 *           default: {"city":"kkr","state":"Haryana"}
 *         device_token:
 *           type: string
 *         device_type:
 *           type: string
 *           enum:
 *             - IOS
 *             - ANDROID
 *         login_type:
 *           type: string
 *           default: "Phone"
 *         action:
 *           type: string
 *           default: "login"
 *         age:
 *           type: string
 *           default: "10"
 *         gender:
 *           type: string
 *           default: "female"
 *         referral:
 *           type: string
 *           default: "referral"
 *         social_id:
 *           type: string
 *           default: ""
 *     userLogin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         dial_code:
 *           type: string
 *         phone_number:
 *           type: string
 *         address:
 *           type: string
 *         device_token:
 *           type: string
 *         device_type:
 *           type: string
 *           enum:
 *             - IOS
 *             - ANDROID
 *         login_type:
 *           type: string
 *           default: "Phone"
 *         action:
 *           type:string
 *           default:login
 *         age:
 *           type: string
 *           default: "10"
 *         gender:
 *           type: string
 *           default: "female"
 *         referral:
 *           type: string
 *           default: "referral"
 *         social_id:
 *           type: string
 *           default: ""
 *     affiliate:
 *       type: object
 *       properties:
 *         date_of_birth:
 *           type: string
 *         educational_qualification:
 *           type: string
 *         reference_type:
 *           type: string
 *     VerifySocialUser:
 *       type: object
 *       properties:
 *         login_type:
 *           type: string
 *           default: "Gmail"
 *         social_id:
 *           type: string
 *           default: ""
 *     getpresignurl:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
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

adminAuthRouter.use(`${API_CONSTANTS.VERSIONS.V1}/admin`, router);
adminAuthRouter.use(`${API_CONSTANTS.VERSIONS.V1}/admin/user`, authenticate.adminAuthenticate , userRouter);

export default adminAuthRouter;