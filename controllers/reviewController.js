const Review = require('../models/reviewModel')
const { deleteOne, updateOne, createOne, getOne, getAll } = require('../controllers/handlerFactory')

const setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

const getAllReview = getAll(Review)
const createReview = createOne(Review)
const deleteReview = deleteOne(Review)
const updateReview = updateOne(Review)
const getReview = getOne(Review)

module.exports = {
    getAllReview,
    createReview,
    deleteReview,
    updateReview,
    setTourUserIds,
    getReview
}