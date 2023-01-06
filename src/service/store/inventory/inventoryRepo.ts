import { CreateInventoryItem, InventoryItem } from "./inventoryTypes";
import db from '../../../models'

const findStoreInventoryItems = async (storeId, page, pageSize) : Promise<InventoryItem[]>=> {
    let clause = {
        where: {
            business_store_id: storeId
        },
        attributes: {
            exclude: ['insert_date', 'update_date']
        },
        include: [{model: db.Product, where: {deleted_date: null},attributes: {exclude: ['insert_date', 'update_date', 'deleted_date' ]}}]
        
    }
    if (page >= 0 && pageSize)  {
        clause['limit'] = pageSize 
        clause['offset'] = page * pageSize
    }
    return await db.InventoryItem.findAndCountAll(clause).catch(e => {throw new Error(e.message)})
}

const findInventoryItem = async (inventoryId : number) : Promise<InventoryItem> => {
    return await db.InventoryItem.findOne({
        where: {
            id: inventoryId
        },
        attributes: {
            exclude: ['insert_date', 'update_date']
        },
        include: [{model: db.Product, where: {deleted_date: null}, attributes: {exclude: ['insert_date', 'update_date', 'deleted_date' ]}}]
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


const deleteInventoryItem = async (inventoryIds : number[], storeId : number) => {
    return await db.InventoryItem.destroy({
        where: {
            id: inventoryIds,
            business_store_id: storeId
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