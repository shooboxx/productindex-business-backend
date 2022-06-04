export {}
import { Review } from './reviewType';
import db from '../../../models'

const findReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    return await db.Review.findAll({
        where: {
            store_id: storeId,
            deleted_date: null
        }
    })
}

const markReviewAsInappropriate = async (userId : number, reviewId : number) => {
    return
}

const findReviewsById = async (reviewId : number) : Promise<Review> => {
    return await db.Review.findAll({
        where: {
            id: reviewId,
            deleted_date: null
        }
    })
}

export const ReviewsRepo = {
    findReviewsByStoreId,
    markReviewAsInappropriate,
    findReviewsById
}