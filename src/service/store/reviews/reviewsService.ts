import { ReviewsRepo } from './reviewsRepo';
import { Review } from './reviewType';
const  AppError = require('../../../utils/AppError') ;
import { ReviewsErrorsMessages, ReviewsTriggerMessages } from './reviewsConts';

const getReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    const reviews : Review[] = await ReviewsRepo.findReviewsByStoreId(storeId)
    if (reviews.length == 0) throw new AppError(ReviewsErrorsMessages.NoBusinessReviews, 404) 
    return reviews
}

const markReviewAsInappropriate = async (userId, storeId, reviewId, flagReason) => {
    const review : Review = await ReviewsRepo.findReviewsById(reviewId)
    if (!review) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404)
    if (review.store_id != storeId) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404)
    
    review.flag_reason = `${ReviewsTriggerMessages.BUSINESS_MARKED_REVIEW_INAPPROPRIATE} ${flagReason}`
    // Add a flagged by column to model
    //review.flagged_by = userId
    return review

}

export const ReviewsService = {
    getReviewsByStoreId,
    markReviewAsInappropriate
}