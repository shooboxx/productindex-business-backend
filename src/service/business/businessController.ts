import express from "express";
const router = express.Router();
import { BusinessService } from './businessService';
import { Business, CreateBusiness } from './businessType';
import { authenticateToken } from '../auth/authorization';
import { TagsService } from './tags/businessTagService';
import { StorageService } from '../storage/storageService'
import {upload} from '../storage/multerConfig'

router.get("/businesses", authenticateToken, async (req: any, res: any) => {
    try {
      const businesses = await BusinessService.getUserBusinesses(req.user_id);
      return res.status(200).json(businesses);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});
router.get("/business/:businessId", async (req: any, res: any) => {
    try {
      const businesses = await BusinessService.getBusinessById(req.params.businessId);
      return res.status(200).json(businesses);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});
router.post("/business", authenticateToken, async (req: any, res: any) => {
    try {
        
      const biz : CreateBusiness= {
        name: req.body.business_name,
        description: req.body.business_description,
        profile_picture_url: req.body.profile_picture_url,
        category: req.body.business_category,
        active: true,
        created_by: req.user_id
      };
      const createdBiz = await BusinessService.createBusiness(biz).catch((e)=> {return res.status(400).json({error: e.message})});
      return res.status(200).json(createdBiz);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.post("/business/:businessId/tags", authenticateToken, async (req: any, res: any) => {
    try {
        
      const businessTags = await TagsService.addBusinessTags(req.user_id, req.params.businessId, req.body)
      return res.status(200).json(businessTags);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.delete("/business/:businessId/tags/:tagId", authenticateToken, async (req: any, res: any) => {
    try {
        
      const businessTags = await TagsService.deleteBusinessTag(req.user_id, req.params.businessId, req.params.tagId)
      return res.status(200).json(businessTags);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.put("/business/:businessId", authenticateToken, async (req: any, res: any) => {
    try {
      const business : Business = {
        id: req.params.businessId,
        name: req.body.business_name,
        description: req.body.description,
        profile_pic_url: req.body.profile_pic_url,
        category: req.body.category,
      }
      const updatedBusiness = await BusinessService.updateBusiness(req.user_id, business);
      return res.status(200).json(updatedBusiness);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.put("/business/:businessId/profile-image",upload.single("photo"), authenticateToken, async (req: any, res: any) => {
    try {
      const file = req.file
      const updatedBusiness = await StorageService.saveProfileUrl(file, req.body['photoType'], req.params['businessId'])
      return res.status(200).json(updatedBusiness);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.delete("/business/:businessId", authenticateToken, async (req: any, res: any) => {
    try {
      await BusinessService.deleteBusiness(req.user_id, req.params.businessId);
      return res.status(200).json({success: true});
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

module.exports = router;