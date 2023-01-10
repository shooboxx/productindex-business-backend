import db from '../../../models'
import { Product, CreateProduct } from './productType';

const findBusinessProducts = async (businessId : number, page: number, pageSize: number) : Promise<Product[]> => {
    let clause = {
        where: {
            business_id: businessId,
            deleted_date: null
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
const findProductById = async (productId : number, businessId : number) : Promise<Product> => {
    return await db.Product.findOne({
        where: {
                id: productId,
                business_id: businessId,
                deleted_date: null
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }).catch(e => {throw new Error(e.message)})

}
const findProductsByName = async (productName : string, businessId : number) : Promise<Product[]> => {
    const comparableProductName = productName.toLowerCase().split(' ').join('')
    const products = await db.sequelize.query(`select id, business_id, product_name, product_type, image_url, description, tag, sku, category from product p where replace(lower(product_name), ' ', '') like '%${comparableProductName}%' and business_id = ${businessId} and deleted_date is null`).catch(e => null)
    return products[0]

}

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
            business_id: product.business_id,
            deleted_date: null
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
            deleted_date: null
        }
    }).catch(e => {throw new Error(e.message)})
}

const _findProductDetails = async (productId : number) => {
    return await db.Product.findOne({
        where: {
                id: productId,
                deleted_date: null
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }).catch(e => {throw new Error(e.message)})
}

export const ProductRepo = {
    findProductById,
    findBusinessProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductPicture,
    findProductsByName,
    _findProductDetails
}