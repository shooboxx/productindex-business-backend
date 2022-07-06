import express from "express";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {StorageService} from "./storageService"


router.post("/storage/upload", upload.single("photo"), async (req, res) => {
    // the key of the file passed should be the photo type (business portfolio or business profile)  
    // const upload = await storageService.upload(req.file.buffer, req.file.fieldname )
    // console.log(req.file)
     try {
      const businesses = await StorageService.saveUrl(req.file, req.body.photoType, req.body.businessId)
      return res.status(200).json(businesses);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }   
});

module.exports = router;
