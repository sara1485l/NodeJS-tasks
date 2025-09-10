const express = require("express");
const { addReview } = require("../controllers/reviewController");
const router = express.Router();

router.post("/:orderId/review", addReview);

module.exports = router;
