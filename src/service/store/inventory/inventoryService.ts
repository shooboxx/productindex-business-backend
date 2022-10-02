import { InventoryItem, CreateInventoryItem } from "./inventoryTypes"
const AppError = require('../../../../utils/AppError')
import { InventoryErrors } from "./inventoryConts"
import { StoreErrors } from "../storeConst"
import { InventoryRepo } from "./inventoryRepo"
import { StoreService } from '../storeService';
import { ProductErrors } from "../../business/products/productConst"


const getStoreInventoryItems = (storeId) : Promise<InventoryItem[]> => {
    if (!storeId) throw new AppError(StoreErrors.storeIdIsRequired, 400)
    return InventoryRepo.findStoreInventoryItems(storeId)
}

const getInventoryItem = (inventoryId) : Promise <InventoryItem> => {
    if (!inventoryId) throw new AppError(InventoryErrors.InventoryIdRequired, 400)
    return InventoryRepo.findInventoryItem(inventoryId)
}

const getInventoryItems = () => {
    return
}

const createInventoryItems = async (userId, inventoryItems : CreateInventoryItem[]) =>  {
    try {    
        
        const validatedInventoryItems : any = [] 
        const invalidItems : CreateInventoryItem[]= []
        if (inventoryItems.length == 0 ) throw new AppError(InventoryErrors.InventoryRequired, 400)
        StoreService.checkUserHasRightsToStore(userId, inventoryItems[0].store_id)

        inventoryItems.forEach((item)=> {
            const inventoryError = _validateInventoryItemCompleteness(item)
            if (!inventoryError) { 
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

const updateInventoryItems = async (userId : number, inventoryItems : InventoryItem[]) => {
    try {    
        const validatedInventoryItems : any = [] 
        const invalidItems : CreateInventoryItem[]= []
        if (inventoryItems.length == 0 ) throw new AppError(InventoryErrors.InventoryRequired, 400)
        StoreService.checkUserHasRightsToStore(userId, inventoryItems[0].store_id)

        inventoryItems.forEach((item)=> {
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

const removeInventoryItems = (userId, storeId, inventoryItemsIDs : number[]) => {
    try {
        StoreService.checkUserHasRightsToStore(userId, storeId)
        inventoryItemsIDs.forEach(id => {
            InventoryRepo.deleteInventoryItem(id)
        })
        return
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
const _validateInventoryItemCompleteness = (inventoryItem : CreateInventoryItem) : string =>  {
    if (!inventoryItem.store_id) return StoreErrors.storeIdIsRequired
    if (!inventoryItem.product_id) return ProductErrors.ProductIdRequired
    if (!inventoryItem.currently_available) return InventoryErrors.ItemAvailabilityNeeded
    //TODO: check if product exist
    return ''
}

export const InventoryService = {
    getStoreInventoryItems,
    getInventoryItem,
    getInventoryItems,
    createInventoryItems,
    removeInventoryItems,
    updateInventoryItems,
}