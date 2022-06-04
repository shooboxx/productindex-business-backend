import db from '../../../models'
import { Product, CreateProduct } from './productType';

const findBusinessProducts = async (businessId) : Promise<Product[]> => {
    return await db.Product.findAll({
        where: {
            business_id: businessId
        }
    })

}

const findProduct = async (productId) : Promise<Product> => {
    return await db.Product.findOne({
        where: {
            id: productId
        }
    })

}

const createProduct = async (product : CreateProduct) : Promise<Product> => {
    return await db.Product.create({
        business_id: product.business_id,
        product_name: product.product_name,
        product_type: product.product_type,
        image_url: product.product_image_url,
        product_key: product.product_key
    }).catch((e)=> {throw Error(e)})
}

const updateProduct = async (product : Product) : Promise<Product>=> {
    await db.Product.update({
        product_name: product.product_name,
        product_type: product.product_type,
        image_url: product.product_image_url,

    }, {
        where: {
            id: product.id,
            business_id: product.business_id
        }
    })
    return product

}

export const ProductRepo = {
    findProduct,
    findBusinessProducts,
    createProduct,
    updateProduct
}