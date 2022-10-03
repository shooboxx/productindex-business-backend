
import { Product, CreateProduct } from "./productType"
import AppError from './../../../../utils/AppError.js'
import { ProductErrors } from "./productConst"
import { BusinessService } from "../businessService"
import { ProductRepo } from './productRepo';
import { BusinessErrors } from "../businessConts";

const getBusinessProducts = async (businessId : number, page : number, pageSize : number) : Promise<Product[]> => {
    try {
        console.log('Page ', page, 'Page size: ', pageSize)
        return await ProductRepo.findBusinessProducts(businessId, page, pageSize)
    }
    catch (e) {
        throw AppError(e.message, e.statusCode)
    }
}

const getProducts = async (productId : number, productKey : string) : Promise<Product> => {
    return await ProductRepo.findProducts(productId, productKey)
} 

const createProducts = async (userId, products : CreateProduct[])  => {
    try {
        const failedProducts : any = []
        const storedProducts : CreateProduct[] =  []
        if (products.length == 0) throw new AppError(ProductErrors.ProductRequired, 400)
        BusinessService.checkUserHasRightsToBusiness(userId, products[0].business_id)

        products.forEach((product) => {
            const productError = _validateCreateProductCompleteness(product)
            if (!productError) {
                ProductRepo.createProduct(product)
                storedProducts.push(product)
            } 
            if (productError) {
                product['failed_message'] = productError
                failedProducts.push(product)
            }
        })
        return {failed: failedProducts, succeeded: storedProducts}
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const updateProducts = (userId, products : Product[])  => {
    try {
        const failedProducts : any = []
        const updatedProducts : any = []
        if (products.length == 0) throw new AppError(ProductErrors.ProductRequired, 400)
        BusinessService.checkUserHasRightsToBusiness(userId, products[0].business_id)

        products.forEach((product) => {
            const productError = _validateProductCompleteness(product)
            if (!productError) {
                ProductRepo.updateProduct(product)
                updatedProducts.push(product)
            } 
            if (productError) {
                product['failed_message'] = productError
                failedProducts.push(product)
            }
        })
        
        return {failed:failedProducts, succeeded: updatedProducts}
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const removeProducts = async (userId, businessId, productIDs : number[]) => {
    try {
        BusinessService.checkUserHasRightsToBusiness(userId, businessId)
        productIDs.forEach(id => {
            ProductRepo.deleteProduct(id)
        })
        return
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const _validateCreateProductCompleteness = (product : CreateProduct) : string => {
    if (!product.business_id) return BusinessErrors.BusinessIdRequired
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    if (product.product_key == "") return ProductErrors.ProductKeyRequired
    return ''
}

const _validateProductCompleteness = (product : Product) : string => {
    if (!product.id) return ProductErrors.ProductIdRequired
    if (!product.business_id) return BusinessErrors.BusinessIdRequired
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    if (product.product_key == "") return ProductErrors.ProductKeyRequired
    return ''
}


export const ProductService = {
    getProducts,
    getBusinessProducts,
    createProducts,
    updateProducts,
    removeProducts
    
}