import express from "express";
const router = express.Router();
// import { StoreService } from "./storeService";
// import { authenticateToken } from '../auth/authorization';
// import { CreateBusinessStore, BusinessStore } from './storeTypes';
import { InventoryService } from './inventoryService';

router.get("/store/:storeId/inventory", async (req, res) => {
    try {
        const storeId = req.params.storeId
        return res.status(200).json(await InventoryService.getStoreInventoryItems(storeId))

    } catch (e) {
        res.status(e.statusCode || 400).json({error: e.message})
    }
})

router.post("/store/:storeId/inventory", async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.createInventoryItems(1, req.body)) //TODO: Change to req.user_id

    } catch (e) {
        res.status(e.statusCode || 400).json({error: e.message})
    }
})

router.put("/store/:storeId/inventory", async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.updateInventoryItems(1, req.body)) //TODO: Change to req.user_id

    } catch (e) {
        res.status(e.statusCode || 400).json({error: e.message})
    }
})

router.delete("/store/:storeId/inventory", async (req, res) => {
    try {
        const storeId = req.params.storeId
        await InventoryService.removeInventoryItems(1, storeId, req.body)
        return res.status(200).json({success: true}) //TODO: Change to req.user_id

    } catch (e) {
        res.status(e.statusCode || 400).json({error: e.message})
    }
})

module.exports = router