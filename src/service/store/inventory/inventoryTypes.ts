export interface InventoryItem {
    id: number,
    store_id : number,
    product_id: number,
    price?: number,
    quantity: number,
    currently_available: boolean,
    show_price?: boolean,
}

export interface CreateInventoryItem {
    store_id : number,
    product_id: number,
    price?: number,
    quantity: number,
    currently_available: boolean,
    show_price?: boolean,
}