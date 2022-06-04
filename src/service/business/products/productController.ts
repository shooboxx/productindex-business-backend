
import { ProductService } from './productService';
import { authenticateToken } from '../../auth/authorization';

const express = require('express')
const router = express.Router()

router.get("/business/:businessId/products", async (req, res,) => {
    try {
        const {id, key} = req.query
        if (id) return res.status(200).json(await ProductService.getProducts(id, ''))
        if (key) return res.status(200).json(await ProductService.getProducts(0, key))
        const products = await ProductService.getBusinessProducts(req.params.businessId)
        return res.status(200).json(products)
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.post("/business/:businessId/products", authenticateToken, async (req, res,) => {
    try {
      const products = req.body 
      const newProducts = await ProductService.createProducts(req.user_id, products)
      
      return res.status(200).json(newProducts)
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.put("/business/:businessId/products", authenticateToken, async (req, res,) => {
    try {
      const products = req.body 
      const updatedProducts = await ProductService.updateProducts(req.user_id, products)
      return res.status(200).json(updatedProducts)
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});


  module.exports = router;