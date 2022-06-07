const router = express.Router()
import { ReviewsService } from './reviewsService';
import { authenticateToken } from '../../auth/authorization';

// Get store reviews
router.get('/store/:storeId/reviews', async (req, res) => {
    try {
        const storeId = req.params.storeId
        return res.status(200).json(await ReviewsService.getReviewsByStoreId(storeId))
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
})
// Report a review
router.put('/store/:storeId/reviews/:reviewId', authenticateToken, async (req, res) => {
    try {
        const storeId = req.params.storeId
        const reviewId = req.params.reviewId
        const inappropriateReview = {
            review_id: reviewId,
            reported_by: req.user_id,
            reported_reason: req.body.reported_reason,

        }
        return res.status(200).json(await ReviewsService.markReviewAsInappropriate(inappropriateReview.reported_by, storeId, inappropriateReview.review_id, inappropriateReview.reported_reason))
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
})