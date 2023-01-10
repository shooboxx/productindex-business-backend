import { InventoryItem, CreateInventoryItem } from "./inventoryTypes"
const AppError = require('../../../../utils/AppError')
import { InventoryErrors } from "./inventoryConts"
import { StoreErrors } from "../storeConst"
import { InventoryRepo } from "./inventoryRepo"
import { ProductErrors } from "../../business/products/productConst"
import { ProductService } from '../../business/products/productService';

const getStoreInventoryItems = (storeId : number, page : number, pageSize : number) : Promise<InventoryItem[]> => {
    if (!storeId) throw new AppError(StoreErrors.storeIdIsRequired, 400)
    return InventoryRepo.findStoreInventoryItems(storeId, page, pageSize)
}

const getInventoryItem = (inventoryId) : Promise <InventoryItem> => {
    if (!inventoryId) throw new AppError(InventoryErrors.InventoryIdRequired, 400)
    return InventoryRepo.findInventoryItem(inventoryId)
}
//TODO: Retest to see if this still works
const createInventoryItems = async (inventoryItems : CreateInventoryItem[], storeId : number) =>  {
    try {    

        const validatedInventoryItems : any = [] 
        const invalidItems : CreateInventoryItem[]= []
        if (inventoryItems.length == 0 ) throw new AppError(InventoryErrors.InventoryRequired, 400)
        inventoryItems.forEach(async (item)=> {
            item.store_id = storeId
            const inventoryError = _validateInventoryItemCompleteness(item)
            const productExist = await ProductService._checkProductExist(item.product_id)
            if (!inventoryError && productExist) { 
                InventoryRepo.addInventoryItem(item)
                validatedInventoryItems.push(item)
            } 
            if (inventoryError) {
                item['failed_message'] = inventoryError
                invalidItems.push(item)
            }
        })
        return {failed: invalidItems, succeeded: validatedInventoryItems}
    } 
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}
const updateInventoryItems = async (inventoryItems : InventoryItem[], storeId : number) => {
    try {    
        const validatedInventoryItems : any = [] 
        const invalidItems : CreateInventoryItem[]= []
        if (inventoryItems.length == 0 ) throw new AppError(InventoryErrors.InventoryRequired, 400)

        inventoryItems.forEach((item)=> {
            item.store_id = storeId
            const inventoryError = _validateInventoryItemCompleteness(item)
            if (!inventoryError) { 
                InventoryRepo.updateInventoryItem(item)
                validatedInventoryItems.push(item)
            } 
            if (inventoryError) {
                item['failed_message'] = inventoryError
                invalidItems.push(item)
            }
        })
        return {failed: invalidItems, succeeded: validatedInventoryItems}}
    
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
//TODO: Test to see if this still works
const removeInventoryItems = async (inventoryItemsIDs : number[], storeId : number) => {
    try {
        return await InventoryRepo.deleteInventoryItem(inventoryItemsIDs, storeId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
const _validateInventoryItemCompleteness = (inventoryItem : CreateInventoryItem) : string =>  {
    if (!inventoryItem.store_id) return StoreErrors.storeIdIsRequired
    if (!inventoryItem.product_id) return ProductErrors.ProductIdRequired
    if (!inventoryItem.currently_available) return InventoryErrors.ItemAvailabilityNeeded
    return ''
}

export const InventoryService = {
    getStoreInventoryItems,
    getInventoryItem,
    createInventoryItems,
    removeInventoryItems,
    updateInventoryItems,
}