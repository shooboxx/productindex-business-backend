
import { Product, CreateProduct } from "./productType"
import AppError from './../../../../utils/AppError.js'
import { ProductErrors } from "./productConst"
import { ProductRepo } from './productRepo';
import { BusinessErrors } from "../businessConts";

const getBusinessProducts = async (businessId : number, page : number, pageSize : number) : Promise<Product[]> => {
    try {
        return await ProductRepo.findBusinessProducts(businessId, page, pageSize)
    }
    catch (e) {
        throw AppError(e.message, e.statusCode)
    }
}

const getProducts = async (productId : number, productKey : string) : Promise<Product> => {
    return await ProductRepo.findProducts(productId, productKey)
} 

const createProducts = async (products : CreateProduct[], businessId : number)  => {
    try {
        const failedProducts : any = []
        const storedProducts : CreateProduct[] =  []
        if (products.length == 0) throw new AppError(ProductErrors.ProductRequired, 400)

        products.forEach((product) => {
            product.business_id = businessId
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

const updateProducts = (products : Product[], businessId : number)  => {
    try {
        const failedProducts : any = []
        const updatedProducts : any = []
        if (products.length == 0) throw new AppError(ProductErrors.ProductRequired, 400)

        products.forEach((product) => {
            product.business_id = businessId
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
//TODO: Retest this delete method still works
const removeProducts = async (productIDs : number[], businessId : number) => {
    try {
        return await ProductRepo.deleteProduct(productIDs, businessId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const _validateCreateProductCompleteness = (product : CreateProduct) : string => {
    if (!product.business_id) return BusinessErrors.BusinessIdRequired
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    return ''
}

const _validateProductCompleteness = (product : Product) : string => {
    if (!product.id) return ProductErrors.ProductIdRequired
    if (!product.business_id) return BusinessErrors.BusinessIdRequired
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    return ''
}


export const ProductService = {
    getProducts,
    getBusinessProducts,
    createProducts,
    updateProducts,
    removeProducts
    
}