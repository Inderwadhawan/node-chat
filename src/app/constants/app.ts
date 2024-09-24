import * as dotenv from "dotenv";
// import process.env from '../env';
dotenv.config();

const APP_CONSTANTS = {
    PORT: process.env.PORT || 5000,
    NAME: process.env.NAME,
    VERSION: process.env.VERSION,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    TOTAL_PROCESSING_WEBHOOK_KEY: process.env.TOTAL_PROCESSING_WEBHOOK_KEY,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    NODE_ENV: process.env.NODE_ENV,
    CRON_PORT: process.env.CRON_PORT,
    DB_DAILECT: process.env.DB_DAILECT,
    JWT_SECRETKEY: process.env.JWT_SECRETKEY,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_ACL: process.env.AWS_ACL,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3URL: process.env.AWS_S3URL,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    /**Test Api keys abhi account */
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,

    /**Test Api keys pranav account */
    // RAZORPAY_KEY_ID:'rzp_test_z4xobNqXb32e4v',
    // RAZORPAY_SECRET:'y77men9jPzsRNRCBX0p21a0C',

    /**TWILIO TEST KEYS */
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,

    /**EMAIL TEST KEYS */
    EMAIL_SERVICE_MAIL_FROM: process.env.EMAIL_SERVICE_MAIL_FROM,
    EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_PORT: process.env.EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_HOST: process.env.EMAIL_SERVICE_HOST as string,
    EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,


    /**live Api keys abhi account */
    // RAZORPAY_KEY_ID:'rzp_live_pk1CHG1sXkyIrT',
    // RAZORPAY_SECRET:'jCOZ1yenmv5gx4JP9pc0gMH2'

    /**CERTIFICATE IMAGES */
    SMPATH_IMG: process.env.SMPATH_IMG,
    LOGO_IMG: process.env.LOGO_IMG,
    LGPATH_IMG: process.env.LGPATH_IMG,
    BG_CERTIFICATE_IMG: process.env.BG_CERTIFICATE_IMG,
    BATCH_IMG: process.env.BATCH_IMG,
    /**CERTIFICATE IMAGES */
    DEV_API_URL: process.env.DEV_API_URL,
    STAG_API_URL: process.env.STAG_API_URL,

    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    GST_API_URL: process.env.GST_API_URL,
    GST_EINVOICE_EMAIL: process.env.GST_EINVOICE_EMAIL,
    GST_EINVOICE_USERNAME: process.env.GST_EINVOICE_USERNAME,
    GST_EINVOICE_PASSWORD: process.env.GST_EINVOICE_PASSWORD,
    GST_EINVOICE_IP: process.env.GST_EINVOICE_IP,
    GST_CLIENT_ID: process.env.GST_CLIENT_ID,
    GST_CLIENT_SECRET: process.env.GST_CLIENT_SECRET,
    GST_NUMBER: process.env.GST_NUMBER,

};

export default APP_CONSTANTS;


