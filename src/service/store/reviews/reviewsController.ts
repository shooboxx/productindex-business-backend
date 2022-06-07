const express = require('express')
const router = express.Router()

import { ReviewsService } from './reviewsService';
import { authenticateToken } from '../../auth/authorization';
import { ReportedReview } from './reviewType';

// Get store reviews
router.get('/store/:storeId/reviews', async (req, res) => {
    try {
        const reviewId = req.query.id;
        const storeId = req.params.storeId
        if (reviewId) res.status(200).json(await ReviewsService.getReviewById(reviewId))
        return res.status(200).json(await ReviewsService.getReviewsByStoreId(storeId))
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
})
// Report a review
router.post('/store/:storeId/reviews/:reviewId', authenticateToken, async (req, res) => {
    try {
        const storeId = req.params.storeId
        const reviewId = parseInt(req.params.reviewId)
        const inappropriateReview : ReportedReview= {
            review_id: reviewId,
            reported_by: req.user_id,
            reported_reason: req.body.reported_reason,

        }
        return res.status(200).json(await ReviewsService.markReviewAsInappropriate(storeId, inappropriateReview))
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
})

module.exports = router;