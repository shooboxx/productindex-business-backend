export interface CreateBusiness {
    name: string,
    description?: string,
    category: string,
    active?: boolean,
    profile_picture_url?: string,
    created_by: number,
    registered_country: string
}

export interface Business {
    id: number,
    name: string,
    description: string,
    profile_pic_url?: string,
    active?: boolean,
    category: string,
    deleted_date?: Date,
    insert_date?: Date,
    update_date?: Date,
    created_by?: number,
    registered_country: string
}