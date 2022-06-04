import db from '../../../models'
import { Product, CreateProduct } from './productType';
const { Op } = require("sequelize");

const findBusinessProducts = async (businessId) : Promise<Product[]> => {
    return await db.Product.findAll({
        where: {
            business_id: businessId
        }
    }).catch(e => {throw new Error(e.message)})

}

const findProducts = async (productId, productKey) : Promise<Product> => {
    return await db.Product.findAll({
        where: {
            //TODO: Add a like in here for product_key
                [Op.or]: [{id: productId}, { product_key: productKey}]
        }
    }).catch(e => {throw new Error(e.message)})

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
    }).catch(e => {throw new Error(e.message)})
    return product

}

export const ProductRepo = {
    findProducts,
    findBusinessProducts,
    createProduct,
    updateProduct
}