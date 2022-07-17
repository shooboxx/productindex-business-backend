
require("dotenv").config();
import multer from "multer";
import { ImageExtensions } from "./storageConsts";
import { StorageMessages } from "./storageMessages";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (ImageExtensions.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new AppError(StorageMessages.NotAnImage, 400), false);
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: process.env.FILE_SIZE_MAX },
});