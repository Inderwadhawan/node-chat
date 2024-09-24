import AWS from "aws-sdk";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";

dotenv.config();

const bucketName = process.env.AWS_S3_BUCKET as string;

export const imageUpload = async (file_buffer: any) => {
    // Configure AWS with access credentials
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        region: process.env.AWS_REGION as string,
    });

    // Create an S3 instance
    const s3 = new AWS.S3();

    try {
        // Get bucket name from constants
        const bucketName = process.env.AWS_S3_BUCKET as string;

        // Get file path from the file buffer
        const filePath = file_buffer.path;

        // Generate a new file name to avoid conflicts and add a timestamp
        const filename = file_buffer.name.replace(/\s/g, "").split(".");
        const fileKey = `${filename[0]}_${Date.now()}.${filename[filename?.length - 1]}`;
        const extension = fileKey.split('.').pop()?.toLowerCase();
        // Read the file content
        const fileContent = fs.readFileSync(filePath);

        // Set parameters for S3 upload
        const params = {
            Bucket: bucketName,
            Key: 'portl/'+fileKey,
            ACL: process.env.AWS_ACL as string,
            Body: 'portl/'+fileContent,
            ContentType:`image/${extension}` // Set the content type explicitly
        };

        // Perform the S3 upload
        const data = await s3.upload(params).promise();

        // Log successful upload and return S3 location
        return data.Location;
    } catch (error) {
        // Handle errors during upload
        throw error;
    }
};

export const awsFileSignature = async (file_buffer: any) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    // Specify the S3 bucket and object key
    const objectKey = `${file_buffer}`;

    // Set the expiration time for the pre-signed URL (in seconds)
    const expirationTime = 3600; // This URL will expire in 60 seconds
    // Generate the pre-signed URL

    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            ACL: process.env.AWS_ACL,
            Key: objectKey,
            Expires: expirationTime,
        };

        // Perform the S3 upload
        s3.createPresignedPost(params, (err: any, data: any) => {
            if (err) {
                // Handle errors during upload
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const multiUpload = async (req: any) => {

    const client = await getS3Client();
    const { type, metadata, filename } = req.body;
    if (typeof filename !== "string") {
        console.log({ error: "s3: content filename must be a string" });
    }
    if (typeof type !== "string") {
        console.log({ error: "s3: content type must be a string" });
    }
    const Key = `${crypto.randomUUID()}-${filename}`;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key,
        ContentType: type,
        Metadata: metadata,
    };
    const command = new CreateMultipartUploadCommand(params);

    return new Promise((resolve, reject) => {
        client.send(command, (err: any, data: any) => {
            if (err) {
                reject(err);
            }
    
            resolve({
                key: data.Key,
                uploadId: data.UploadId,
            });
           
        });
    });

};

export const getS3Client = async () => {
    const s3Client: any = new S3Client({
        region: process.env.AWS_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    });
    return s3Client;
};
