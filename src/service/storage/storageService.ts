import multer from "multer";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3client";
import { BusinessRepo } from "../business/businessRepo";
import { StorageMessages } from "./storageMessages";
import { StorageTypes } from "./storageTypes";
import { ProductRepo } from "service/business/products/productRepo";
import AppError from './../../../utils/AppError'
import { PortfolioRepo } from "service/business/portfolio/businessPortfolio";

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
  let valid = false;
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
  const photo = await sharp(file.buffer).jpeg({ quality: 80 }).toBuffer();

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

const saveUrl = async (file, photoType: string, businessId: number, productId: number, portfolioId:number) => {
  const valid_type: boolean = await validate_storage_type(photoType);
  if (!valid_type) {
    throw new AppError(StorageMessages.NotValidStorageType,400);
  }
  const url = await saveImage(file, photoType, businessId);

  if (photoType == StorageTypes.BusinessPortfolio) {
    if (portfolioId == null){
      throw new AppError(StorageMessages.PortfolioIdRequired, 400)
    } 
    try {
      return await PortfolioRepo.updatePortfolioPicture(portfolioId, url)
    } catch (e) {
      throw new AppError(e.message, e.statusCode || 400);
    }
  }

  if (photoType == StorageTypes.BusinessProduct) {
    if (productId == null){
      throw new AppError(StorageMessages.ProductIdRequired, 400)
    }
    try {
      return await ProductRepo.updateProductPicture(productId, url)
    } catch (e) {
      throw new AppError(e.message, e.statusCode || 400);
    }
  }

  if (photoType == StorageTypes.BusinessProfile) {
    if (portfolioId == null){
      throw new AppError(StorageMessages.PortfolioIdRequired, 400)
    }
    try {
      return await BusinessRepo.updateBusinessPicture(businessId, url);
    } catch (e) {
      throw new AppError(e.message, e.statusCode || 400);
    }
  }
};

export const StorageService = {
  saveImage,
  saveUrl,
};
