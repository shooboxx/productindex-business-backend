import { CreateInventoryItem, InventoryItem } from "./inventoryTypes";
import db from '../../../models'

const findStoreInventoryItems = async (storeId) : Promise<InventoryItem[]>=> {
    return await db.InventoryItem.findAll({
        where: {
            business_store_id: storeId
        },
        // include: [{model: db.Product}] //TODO: Connect inventory items to product
        
    }).catch(e => {throw new Error(e.message)})
}

const findInventoryItem = async (inventoryId : number) : Promise<InventoryItem> => {
    return await db.InventoryItem.findOne({
        where: {
            id: inventoryId
        }
    }).catch(e => {throw new Error(e.message)})
}

const addInventoryItem = async (inventoryItem : CreateInventoryItem) : Promise<InventoryItem>=> {
    return await db.InventoryItem.create({
        product_id: inventoryItem.product_id,
        business_store_id: inventoryItem.store_id,
        quantity: inventoryItem.quantity,
        available: inventoryItem.currently_available,
        show_price: inventoryItem.show_price,
        price: inventoryItem.price 
    }).catch(e => {throw new Error(e.message)})
}


const deleteInventoryItem = async (inventoryId : number) => {
    return await db.InventoryItem.destroy({
        where: {
            id: inventoryId
        }
    })
}
const updateInventoryItem = async (inventoryItem : InventoryItem) : Promise<InventoryItem> => {
    return await db.InventoryItem.update({
        quantity: inventoryItem.quantity,
        available: inventoryItem.currently_available,
        show_price: inventoryItem.show_price,
        price: inventoryItem.price 
    }, {
        where: {
            id: inventoryItem.id
        }
    }).catch(e => {throw new Error(e.message)})
}


export const InventoryRepo = {
    findStoreInventoryItems,
    findInventoryItem,
    addInventoryItem,
    deleteInventoryItem,
    updateInventoryItem
}