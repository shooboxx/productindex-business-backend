import express from "express";
const router = express.Router();
// import { StoreService } from "./storeService";
import { authenticateToken } from '../../auth/authorization';
// import { CreateBusinessStore, BusinessStore } from './storeTypes';
import { InventoryService } from './inventoryService';

router.get("/store/:storeId/inventory", async (req, res) => {
    try {
        const storeId = req.params.storeId
        return res.status(200).json(await InventoryService.getStoreInventoryItems(storeId, req.query.page, req.query.pageSize))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})

router.post("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.createInventoryItems(req.user_id, req.body))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})

router.put("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.updateInventoryItems(req.user_id, req.body))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})

router.delete("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        const storeId = req.params.storeId
        await InventoryService.removeInventoryItems(req.user_id, storeId, req.body)
        return res.status(200).json({success: true})

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})

module.exports = router