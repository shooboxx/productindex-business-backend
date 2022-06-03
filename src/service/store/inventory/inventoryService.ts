import { InventoryItem, CreateInventoryItem } from "./inventoryTypes"
const AppError = require('../../../../utils/AppError')
import { InventoryErrors } from "./inventoryConts"
import { StoreErrors } from "../storeConst"
import { InventoryRepo } from "./inventoryRepo"


const getStoreInventoryItems = (storeId) : Promise<InventoryItem[]> => {
    if (!storeId) throw new AppError(StoreErrors.storeIdIsRequired)
    return
}

const getInventoryItem = (inventoryId) : Promise <InventoryItem> => {
    return
}

const getInventoryItems = () => {

}

const createInventoryItems = async (inventoryItem : CreateInventoryItem[]) : Promise<InventoryItem[]> =>  {
    //check if store is valid
    // check if product exist

    const validatedInventoryItems : CreateInventoryItem[] = [] 
    const invalidItem : CreateInventoryItem[]= []
    inventoryItem.forEach((item)=> {
        if (_validateInventoryItemCompleteness(item)) { 
            validatedInventoryItems.push(item)
        } else {
            invalidItem.push(item)
        }
    })
    return await InventoryRepo.addInventoryItems(validatedInventoryItems)

}

const removeInventoryItems = (inventoryItemsIDs : number[]) => {
    return
}

const updateInventoryItems = (inventoryItems : InventoryItem[]) : Promise <InventoryItem[]> => {
    return
}

const _validateInventoryItemCompleteness = (InventoryItem) : Boolean =>  {
    return
}


export const InventoryService = {
    getStoreInventoryItems,
    createInventoryItems,
    removeInventoryItems,
    updateInventoryItems,
}