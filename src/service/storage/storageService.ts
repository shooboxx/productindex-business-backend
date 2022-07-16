require("dotenv").config();
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3client";
import { BusinessRepo } from "../business/businessRepo";
import { StorageMessages } from "./storageMessages";
import { StorageTypes} from "./storageConsts";
import { ProductRepo } from "../business/products/productRepo";
import AppError from "./../../../utils/AppError";
import { PortfolioRepo } from "../business/portfolio/businessPortfolioRepo";


const validate_storage_type = async (storage_type): Promise<boolean> => {
  Object.values(StorageTypes).forEach((el) => {
    if (storage_type.includes(el)) {
      return true;
    }
  });
  return false;
};

const saveImage = async (file, photoType: string, businessId: number) => {
  const bucket_name = process.env.BUCKET_NAME;
  const bucket_endpoint = process.env.S3_ENDPOINT;
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

  const baseUrl = `https://${bucket_name}.${bucket_endpoint}`;
  const fullUrl = `${baseUrl}/${businessId}/${photoType}`;
  return fullUrl;
};

const saveUrl = async (file, photoType: string, businessId: number) => {
  const valid_type: boolean = await validate_storage_type(photoType);
  if (!valid_type) {
    throw new AppError(StorageMessages.NotValidStorageType, 400);
  }
  if (businessId == null) {
    throw new AppError(StorageMessages.PortfolioIdRequired, 400);
  }
  const url = await saveImage(file, photoType, businessId);
  return url;
};

const saveProfileUrl = async (file, photoType, businessId) => {
  const url = await saveUrl(file, photoType, businessId);
  if (photoType == StorageTypes.BusinessProfile) {
    try {
      return await BusinessRepo.updateBusinessPicture(businessId, url);
    } catch (e) {
      throw new AppError(e.message, e.statusCode || 400);
    }
  }
};

const savePortofolioUrl = async (file, photoType, portfolioId, businessId) => {
  const url = await saveUrl(file, photoType, businessId);
  if (portfolioId == null) {
    throw new AppError(StorageMessages.PortfolioIdRequired, 400);
  }
  try {
    return await PortfolioRepo.updatePortfolioPicture(portfolioId, url);
  } catch (e) {
    throw new AppError(e.message, e.statusCode || 400);
  }
};

const saveProductUrl = async (file, photoType, productId, businessId) => {
  const url = await saveUrl(file, photoType, businessId);
  if (productId == null) {
    throw new AppError(StorageMessages.ProductIdRequired, 400);
  }
  try {
    return await ProductRepo.updateProductPicture(productId, url);
  } catch (e) {
    throw new AppError(e.message, e.statusCode || 400);
  }
};

export const StorageService = {
  saveImage,
  savePortofolioUrl,
  saveProductUrl,
  saveProfileUrl
};
