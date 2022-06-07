export {}
import { ReportedReview, Review } from './reviewType';
import db from '../../../models'

const findReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    return await db.Review.findAll({
        where: {
            store_id: storeId,
            deleted_date: null
        },
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    })
}

const markReviewAsInappropriate = async (reportedReview : ReportedReview) => {
    return await db.ReportedReview.create({
        review_id: reportedReview.review_id,
        reported_by: reportedReview.reported_by,
        reported_reason: reportedReview.reported_reason

    })
}

const findReviewsById = async (reviewId : number) : Promise<Review> => {
    return await db.Review.findOne({
        where: {
            id: reviewId,
            deleted_date: null
        },
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    })
}

const findUserReportedReview = async (reviewId : number, userId : number) => {
    return await db.ReportedReview.findOne({
        where: {
            review_id: reviewId,
            reported_by: userId,
        }
    })
}

export const ReviewsRepo = {
    findReviewsByStoreId,
    markReviewAsInappropriate,
    findReviewsById,
    findUserReportedReview
}