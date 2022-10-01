import { S3 } from "@aws-sdk/client-s3";
require("dotenv").config();

const s3Client = new S3({
    endpoint: process.env.S3_ENDPOINT,
    region:process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || '',
      secretAccessKey: process.env.SECRET_ACCESS_KEY || ''
    }
});

export { s3Client };