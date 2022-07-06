import { S3 } from "@aws-sdk/client-s3";
require("dotenv").config();

const s3Client = new S3({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || '',
      secretAccessKey: process.env.SECRET_ACCESS_KEY || ''
    }
});

export { s3Client };