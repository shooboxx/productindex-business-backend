import express from "express";
const router = express.Router();
import { StoreService } from "./storeService";
import { authenticateToken } from '../auth/authorization';
import { CreateBusinessStore, BusinessStore } from './storeTypes';

router.get("/business/:businessId/stores", async (req, res) => {
    try {
        const {storeId, storeName} = req.query
        if (storeId) return res.status(200).json(await StoreService.getStore(storeId, ''))
        if (storeName) return res.status(200).json(await StoreService.getStore(0, storeName))
        return res.status(400).json(await StoreService.getBusinessStores(req.params.businessId))
    } catch (e) {
        res.status(e.statusCode || 400).json({error: e.message})
    }
})

router.post("/business/:businessId/stores", async (req: any, res: any) => {
    try {
        const store : CreateBusinessStore = {
            business_id: req.params.businessId,
            unique_name: req.body.unique_name,
            email: req.body.email,
            phone: req.body.phone,
            phone_2: req.body.phone_2,
            phone_3: req.body.phone_3,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,

        }
        const newStore = await StoreService.createStore(1, store);
        return res.status(200).json(newStore);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

router.put("/business/:businessId/store/:storeId", async (req: any, res: any) => {
    try {
        const store : BusinessStore = {
            id: req.params.storeId,
            business_id: req.params.businessId,
            unique_name: req.body.unique_name,
            email: req.body.email,
            phone: req.body.phone,
            phone_2: req.body.phone_2,
            phone_3: req.body.phone_3,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,
            is_primary: req.body.is_primary,
            temp_or_perm_closure: req.body.temp_or_perm_closure,
            reopen_date: req.body.reopen_date

        }
        const newStore = await StoreService.updateStore(1, store);
        return res.status(200).json(newStore);
    } catch (e : any) {
        return res.status(e.statusCode || 400).json({error: e.message})
    }
});

module.exports = router;