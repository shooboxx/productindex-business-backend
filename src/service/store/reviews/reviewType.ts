export interface Review {
    id?: number,
    user_id: number;
    store_id: number;
    rating_number: number;
    comment: string;
    inappropriate_flag?: boolean;
    flag_reason?: string;
    deleted_date?: Date;
    insert_date?: Date;
    update_date?: Date;
}