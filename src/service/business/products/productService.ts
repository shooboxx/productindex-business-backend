
import { Product, CreateProduct } from "./productType"
import AppError from './../../../../utils/AppError.js'
import { ProductErrors } from "./productConst"
import { BusinessService } from "../businessService"
import { ProductRepo } from './productRepo';

const getBusinessProducts = async (businessId : number) : Promise<Product[]> => {
    try {
        return await ProductRepo.findBusinessProducts(businessId)
    }
    catch (e) {
        throw AppError(e.message, e.statusCode || 400)
    }
}

//TODO: Make function to search by product_key as well
const getProduct = async (productId : number) : Promise<Product> => {
    return await ProductRepo.findProduct(productId)
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
        console.log(storedProducts)
        return {failed: failedProducts, succeeded: storedProducts}
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
}

const updateProducts = (userId, products : Product[])  => {
    try {
        const failedProducts : any = []
        if (products.length == 0) throw new AppError(ProductErrors.ProductRequired, 400)
        BusinessService.checkUserHasRightsToBusiness(userId, products[0].business_id)

        products.forEach((product) => {
            const productError = _validateProductCompleteness(product)
            if (!productError) {
                ProductRepo.updateProduct(product)
            } 
            if (productError) {
                product['failed_message'] = productError
                failedProducts.push(product)
            }
        })
        
        return failedProducts
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
}

const convertProductIntoCreateProductType = (product : Product) : CreateProduct=> {
    return {
        business_id: product.business_id || 0,
        product_name: product.product_name,
        product_type: product.product_type,
        product_image_url: product.product_image_url,
        product_description: product.product_description,
        product_key: product.product_key,
        tag: product.tag

    }
}

const _validateCreateProductCompleteness = (product : CreateProduct) : string => {
    if (!product.business_id) return 'Business id is required'
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    if (product.product_key == "") return ProductErrors.ProductKeyRequired
    return ''
}

const _validateProductCompleteness = (product : Product) : string => {
    if (!product.id) return ProductErrors.ProductIdRequired
    if (!product.business_id) return 'Business id is required'
    if (!product.product_name) return ProductErrors.ProductNameRequired
    if (!product.product_type) return ProductErrors.ProductTypeRequired
    if (product.product_key == "") return ProductErrors.ProductKeyRequired
    return ''
}


export const ProductService = {
    getProduct,
    getBusinessProducts,
    createProducts,
    updateProducts,
    
}