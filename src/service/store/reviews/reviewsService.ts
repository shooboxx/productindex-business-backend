import { ReviewsRepo } from './reviewsRepo';
import { ReportedReview, Review } from './reviewType';
import AppError from '../../../../utils/AppError.js'
import { ReviewsErrorsMessages, ReviewsTriggerMessages } from './reviewsConts';

const getReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    const reviews : Review[] = await ReviewsRepo.findReviewsByStoreId(storeId)
    if (reviews.length == 0) throw new AppError(ReviewsErrorsMessages.NoBusinessReviews, 404) 
    return reviews
}

const getReviewById = async (reviewId : number) : Promise<Review> => {
    const review  = await ReviewsRepo.findReviewsById(reviewId)
    if (!review) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404) 
    return review
}

const markReviewAsInappropriate = async (storeId, reportedReview : ReportedReview) => {
    try {   
        const review : Review = await ReviewsRepo.findReviewsById(reportedReview.review_id)
        if (!review) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404)
        if (review.store_id != storeId) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404)
        const userReportedReview = await ReviewsRepo.findUserReportedReview(reportedReview.review_id, reportedReview.reported_by)
        if (userReportedReview) throw new AppError(ReviewsErrorsMessages.ReviewAlreadyReported)
        reportedReview.reported_reason = `${ReviewsTriggerMessages.BUSINESS_MARKED_REVIEW_INAPPROPRIATE} ${reportedReview.reported_reason}`
        return await ReviewsRepo.markReviewAsInappropriate(reportedReview)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

export const ReviewsService = {
    getReviewById,
    getReviewsByStoreId,
    markReviewAsInappropriate
}