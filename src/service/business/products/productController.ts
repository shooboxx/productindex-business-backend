
import { ProductService } from './productService';
import { authenticateToken, hasRole } from '../../auth/authorization';
import { StorageService } from '../../storage/storageService'
import { upload } from '../../storage/multerConfig'

const express = require('express')
const router = express.Router()

router.get("/business/:businessId/products", async (req, res,) => {
    try {
        const {id, productName} = req.query
        if (id) return res.status(200).json(await ProductService.getProductById(id, req.params.businessId))
        if (productName) return res.status(200).json(await ProductService.getProductsByName(productName, req.params.businessId))
        const products = await ProductService.getBusinessProducts(req.params.businessId, req.query.page, req.query.pageSize)
        return res.status(200).json(products)
      
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
});

router.post("/business/:businessId/products", authenticateToken, hasRole(), async (req, res,) => {
    try {
      const products = req.body 
      const newProducts = await ProductService.createProducts(products, req.params.businessId)
      
      return res.status(200).json(newProducts)
      
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
});

router.put("/business/:businessId/products", authenticateToken, hasRole(), async (req, res,) => {
    try {
      const products = req.body 
      const updatedProducts = await ProductService.updateProducts(products, req.params.businessId)
      return res.status(200).json(updatedProducts)
      
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
});

router.delete("/business/:businessId/products", authenticateToken, hasRole(), async (req, res,) => {
    try {
      const products = req.body 
      await ProductService.removeProducts(products, req.params.businessId)
      return res.status(200).json({success: true})
      
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
});

router.put("/business/:businessId/products/product-image", upload.single("photo"),authenticateToken, hasRole(), async (req: any, res: any) => {
    try {
        const file = req.file
        const updatedBusiness = await StorageService.saveProductUrl(file, req.body['photoType'], req.body['productId'], req.params['businessId'])
        return res.status(200).json(updatedBusiness);
    } catch (e: any) {
        return res.status(e.statusCode).json({ error: e.message })
    }
});

module.exports = router;