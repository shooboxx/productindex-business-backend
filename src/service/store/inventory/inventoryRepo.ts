import { CreateInventoryItem, InventoryItem } from "./inventoryTypes";

const findStoreInventoryItems = async (storeId) : Promise<InventoryItem[]>=> {
    return
}

const findInventoryItem = async (inventoryId : number) : Promise<InventoryItem> => {
    return
}
const findInventoryItems = async () : Promise<InventoryItem[]> => {
    return
}

const addInventoryItems = async (inventoryItems : CreateInventoryItem[]) : Promise<InventoryItem[]>=> {
    return
}


const deleteInventoryItem = async (inventoryId : number) => {
    return
}
const updateInventoryItem = async (inventoryItem : InventoryItem) : Promise<InventoryItem> => {
    return
}


export const InventoryRepo = {
    findStoreInventoryItems,
    findInventoryItem,
    findInventoryItems,
    addInventoryItems,
    deleteInventoryItem,
    updateInventoryItem
}