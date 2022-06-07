export interface Review {
    id?: number,
    user_id: number;
    store_id: number;
    rating_number: number;
    comment: string;
    flagged_inappropriate?: boolean;
    flagged_reason?: string;
    deleted_date?: Date;
    insert_date?: Date;
    update_date?: Date;
}

export interface ReportedReview {
    review_id: number;
    reported_by: number;
    reported_reason: string;
}