export interface CreateBusiness {
    name: string,
    description?: string,
    category: string,
    active: boolean,
    profile_picture_url?: string,
    created_by: number,
    update_date?: number,
    insert_date?: number
}

export interface Business {
    id?: number,
    name: string,
    description: string,
    profile_pic_url?: string,
    active: boolean,
    category: string,
    deleted_date: Date,
    insert_date: Date,
    update_date: Date
}