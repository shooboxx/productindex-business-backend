import express from "express";
const router = express.Router();
import { StorageService } from '../../storage/storageService'
import { upload } from '../../storage/multerConfig'
import { authenticateToken } from '../../auth/authorization';


router.put("/business/:businessId/upload-portfolio", upload.single("photo"), authenticateToken, async (req: any, res: any) => {
    try {
        const file = req.file
        const updatedBusiness = await StorageService.savePortofolioUrl(file, req.body['photoType'], req.body['portfolioId'], req.body['businessId'])
        return res.status(200).json(updatedBusiness);
    } catch (e: any) {
        return res.status(e.statusCode || 400).json({ error: e.message })
    }
});

module.exports = router;