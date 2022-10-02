import express from "express";
const router = express.Router();
import { StorageService } from '../../storage/storageService'
import { upload } from '../../storage/multerConfig'
import { authenticateToken } from '../../auth/authorization';


router.put("/business/:businessId/portfolio-image", upload.single("photo"),async (req: any, res: any) => {
    try {
        const file = req.file
        const updatedBusiness = await StorageService.savePortofolioUrl(file, req.body['photoType'], req.body['portfolioId'], req.params['businessId'])
        return res.status(200).json(updatedBusiness);
    } catch (e: any) {
        return res.status(e.statusCode).json({ error: e.message })
    }
});

module.exports = router;