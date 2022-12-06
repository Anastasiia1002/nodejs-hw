const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware")
const { 

 loginUser,
 registrationUser,
 logoutUser,
 getUserData,

} = require("../../controller/controllerUsers")

const router = new express.Router();



router.get('/users/login',loginUser)
router.post('/users/register',registrationUser)
router.get('/users/logout', authMiddleware, logoutUser)
router.get('/users/current', authMiddleware, getUserData)

module.exports = router
