import multer from "multer";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3client";
import { Business } from "../business/businessType";
import { BusinessRepo } from "../business/businessRepo";
import { StorageMessages } from "./storageMessages";
import { StorageTypes } from "./storageTypes";

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false); //TODO: Add this to a enum file
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("photo");

const validate_storage_type = async (storage_type): Promise<boolean> => {
  let valid = false
  Object.values(StorageTypes).forEach((el) => {
    if (storage_type.includes(el)) {
      valid = true;
    }
  });
  return valid;
};

const saveImage = async (file, photoType: string, businessId: number) => {
  if (file) file.filename = `${photoType}-${businessId}-${Date.now()}.jpeg`;
  const bucket_name = "testing-pi-spaces";
  const photo = await sharp(file.buffer)
    .jpeg({ quality: 80 })
    .toBuffer();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: `${bucket_name}`,
      Key: `${businessId}/${photoType}`,
      Body: photo,
      ACL: "public-read",
      ContentType: "image/jpeg",
    })
  );

  await s3Client.send(
    new PutObjectCommand({
      Bucket: `${bucket_name}`,
      Key: `${businessId}/${photoType}`,
      Body: photo,
      ACL: "public-read",
      ContentType: "image/jpeg",
    })
  );

  const baseUrl = `https://${bucket_name}.nyc3.digitaloceanspaces.com`;
  const fullUrl = `${baseUrl}/${businessId}/${photoType}`;
  return fullUrl;
};

const saveUrl = async (file, photoType: string, businessId: number) => {
  const valid_type: boolean = await validate_storage_type(photoType);
  if (!valid_type) {
    throw new AppError(StorageMessages.NotValidStorageType);
  }
  const url = await saveImage(file, photoType, businessId);

  console.log(url)

  if (photoType == StorageTypes.BusinessPortfolio) {
    //storageRepo.savePortfolioUrl(url)
  }
  if (photoType == StorageTypes.BusinessProduct) {
    //storageRepo.saveProductUrl(url)
  }
  if (photoType == StorageTypes.BusinessProfile) {
    //storageRepo.saveProfileUrl(url)
  }
};

export const StorageService = {
  saveImage,
  saveUrl,
};
