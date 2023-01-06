import db from '../../../models'
import { Product, CreateProduct } from './productType';
const { Op } = require("sequelize");

const findBusinessProducts = async (businessId : number, page: number, pageSize: number) : Promise<Product[]> => {
    let clause = {
        where: {
            business_id: businessId
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }
    if (page >= 0 && pageSize)  {
        clause['limit'] = pageSize 
        clause['offset'] = page * pageSize
    }

    return await db.Product.findAndCountAll(clause).catch(e => {throw new Error(e.message)})

}

const findProducts = async (productId : number, productName : string) : Promise<Product> => {
    return await db.Product.findAll({
        where: {
            //TODO: Add a like in here for product_name. Add business_id to avoid searching another business' products
                [Op.or]: [{id: productId}, { product_name: productName}]
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }).catch(e => {throw new Error(e.message)})

}

//TODO: Find products by name and business id to disallow duplicates

const createProduct = async (product : CreateProduct) : Promise<Product> => {
    return await db.Product.create({
        business_id: product.business_id,
        product_name: product.product_name,
        product_type: product.product_type,
        image_url: product.product_image_url,
        sku: product.sku
    }).catch((e)=> {throw Error(e)})
}

const updateProduct = async (product : Product) : Promise<Product>=> {
    await db.Product.update({
        product_name: product.product_name,
        product_type: product.product_type,
        image_url: product.product_image_url,
        sku: product.sku,

    }, {
        where: {
            id: product.id,
            business_id: product.business_id
        }
    }).catch(e => {throw new Error(e.message)})
    return product

}

const deleteProduct = async (productIds : number[], businessId : number) => {
    return await db.Product.update({
        deleted_date: new Date()
    }, {
        where: {
            id: productIds,
            business_id: businessId
        }
    })
}

const updateProductPicture = async (productId: number, pictureUrl: string)  => {    
    await db.Product.update({
        image_url: pictureUrl

    }, {
        where: {
            id: productId,
        }
    }).catch(e => {throw new Error(e.message)})
}

export const ProductRepo = {
    findProducts,
    findBusinessProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductPicture
}