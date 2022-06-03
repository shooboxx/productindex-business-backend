export interface InventoryItem {
    id: number,
    storeId : number,
    productId: number,
    price?: number,
    quantity: number,
    currentlyAvailable: boolean,
    showPrice?: boolean,
}

export interface CreateInventoryItem {
    storeId : number,
    productId: number,
    price?: number,
    quantity: number,
    currentlyAvailable: boolean,
    showPrice?: boolean,
}