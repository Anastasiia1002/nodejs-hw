const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware")
const { 

 loginUser,
 registrationUser,
 logoutUser,
 getUserData,
 verifyTokenUser
} = require("../../controller/controllerUsers")

const router = new express.Router();



router.get('/users/login',loginUser)
router.post('/users/register',registrationUser)
router.get('/users/logout', authMiddleware, logoutUser)
router.get('/users/current', authMiddleware, getUserData)


  router.get('/users/verify/:verificationToken', verifyTokenUser);
  
  router.post('/users/verify/',verifyTokenUser)


module.exports = router
