export interface Product {
    id: number,
    business_id: number,
    product_name: string, 
    product_type: string,
    product_image_url?: string,
    product_description?: string,
    product_key: string,
    tag: string,
    insert_date?: number,
    update_date?: number
}

export interface CreateProduct {
    business_id: number,
    product_name: string, 
    product_type: string,
    product_image_url?: string,
    product_description?: string,
    product_key: string,
    tag: string,
}