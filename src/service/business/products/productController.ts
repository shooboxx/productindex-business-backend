
import { ProductService } from './productService';
import { authenticateToken } from '../../auth/authorization';

const express = require('express')
const router = express.Router()

router.get("/business/:businessId/products", async (req, res,) => {
    try {
      const products = await ProductService.getBusinessProducts(req.params.businessId)
      res.status(200).json(products)
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.post("/business/:businessId/product", authenticateToken, async (req, res,) => {
    try {
      const products = req.body 
      const newProducts = await ProductService.createProducts(req.user_id, products)
      
      res.status(200).json(newProducts)
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.put("/business/:businessId/product", authenticateToken, async (req, res,) => {
    try {
      const products = req.body 
      const failedProducts = await ProductService.updateProducts(req.user_id, products)
      if (failedProducts.length > 0) return res.status(200).json(failedProducts)
      res.status(200).json({ success: true})
      
    }
    catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});


  module.exports = router;