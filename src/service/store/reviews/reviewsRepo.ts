export {}
import { Review } from './reviewType';

const findReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    return
}

const markReviewAsInappropriate = async (userId : number, reviewId : number) => {
    return
}

const findReviewsById = async (reviewId : number) : Promise<Review> => {
    return
}

export const ReviewsRepo = {
    findReviewsByStoreId,
    markReviewAsInappropriate,
    findReviewsById
}