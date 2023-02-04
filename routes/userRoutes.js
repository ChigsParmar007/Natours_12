const express = require('express')
const { getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateMe,
    deleteMe, getMe } = require('../controllers/userController')

const { signup,
    login,
    logout,
    resetPassword,
    forgotPassword,
    updatePassword,
    protect,
    restrictTo } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// Protect all routes after this middleware
router.use(protect)

router.patch('/updatePassword', updatePassword)
router.get('/me', getMe, getUser)
router.patch('/updateMe', updateMe)
router.delete('/deleteMe', deleteMe)

// admin is only access routres after this middleware
router.use(restrictTo('admin'))

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router