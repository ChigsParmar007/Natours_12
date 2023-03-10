const AppError = require('../utils/appError')
const Tour = require('./../models/tourModel')
const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync')

const getOverview = catchAsync(async (req, res, next) => {
    // 1) Get tour data from controller
    const tours = await Tour.find()

    // 2) Build template

    //3) Render tat template using tour from 1)


    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    })
})

const getTour = catchAsync(async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    console.log(req.params.slug)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    })

    if (!tour) {
        return next(new AppError('There is no tour with that name', 404))
    }

    // 2) Build template

    //3) Render tat template using tour from 1)
    res.status(200).render('tour', {
        title: `${tour.name} tour`,
        tour
    })
})

const getLoginForm = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        title: 'Log in to your account'
    })
})

const getAccount = catchAsync(async (req, res, next) => {
    res.status(200).render('account', {
        title: 'Your account',
    })
})

const updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    })
})

module.exports = {
    getOverview,
    getTour,
    getLoginForm,
    getAccount,
    updateUserData
}