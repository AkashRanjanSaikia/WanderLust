const express =require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReivew, isloggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//create new review
router.post("/",isloggedIn,validateReivew, wrapAsync(reviewController.createNewReview));

//delete review
router.delete("/:reviewId",isReviewAuthor,isloggedIn, wrapAsync(reviewController.deleteReview));  

module.exports = router;