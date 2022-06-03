import express from "express";
const router = express.Router();
import { BusinessService } from './businessService';
import { CreateBusiness } from './businessType';

router.post("/business", async (req: any, res: any) => {
    try {
        
      const biz = {
        name: req.body.business_name,
        description: req.body.business_description,
        profile_picture_url: req.body.profile_picture_url,
        category: req.body.business_category,
        active: true,
        created_by: 1 //TODO: Change this to accept req.user.id,
      };
      const createdBiz = await BusinessService.createBusiness(biz).catch((e)=> {return res.status(400).json({error: e.message})});
      return res.status(200).json(createdBiz);
    } catch (e : any) {
        return res.status(400).json({error: e.message})
    }
  });

module.exports = router;