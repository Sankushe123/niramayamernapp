const express = require('express');
const router = express.Router();
const reviewController = require('./Controller');

router.get('/get', reviewController.getReviews);
router.get('/get/:id', reviewController.getReviewsById);
router.post('/post', reviewController.createReview);
router.put('/put/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;
