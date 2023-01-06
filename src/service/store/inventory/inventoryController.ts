import express from "express";
const router = express.Router();
import { authenticateToken } from '../../auth/authorization';
import { InventoryService } from './inventoryService';


router.get("/store/:storeId/inventory", async (req, res) => {
    try {
        const storeId = req.params.storeId
        return res.status(200).json(await InventoryService.getStoreInventoryItems(storeId, req.query.page, req.query.pageSize))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})
//TODO: Create middleware to check if user has right to view store details
router.post("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.createInventoryItems(req.body, req.params.storeId))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})
//TODO: Create middleware to check if user has right to view store details
router.put("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await InventoryService.updateInventoryItems(req.body, req.params.storeId))

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})
//TODO: Create middleware to check if user has right to view store details
router.delete("/store/:storeId/inventory", authenticateToken, async (req, res) => {
    try {
        const storeId = req.params.storeId
        await InventoryService.removeInventoryItems(req.body, req.params.storeId)
        return res.status(200).json({success: true})

    } catch (e) {
        res.status(e.statusCode).json({error: e.message})
    }
})

module.exports = router