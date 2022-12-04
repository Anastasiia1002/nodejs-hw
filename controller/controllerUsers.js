const User = require("../service/schemas/user")
const jwt = require('jsonwebtoken')
// const passport = require('passport')
require('dotenv').config()
// const {
//     registration,
//     // login
// } = require('../service/authService')
const secret = process.env.SECRET


const registrationUser =  async (req, res, next) => {
    const {  email, password, subscription} = req.body
    
    const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = new User( {email, password, subscription});
    newUser.setPassword(password)
    await newUser.save()
        console.log(newUser )
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          message: 'Registration successful',
        },
      })}  catch (error) {
        next(error)
      }
    }
   
  


const loginUser=async (req, res, next) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
  
    if (!user.validPassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      })
    }
  
    const payload = {
      id: user._id,
    email: user.email,
    }
  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    })
  }


const logoutUser =  async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {token:null})
  }

  const getUserData =  (req, res, next) => {
    const { email, subscription } = req.user
    res.json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
      },
    })

  }

  // const currentUser = async (req, res) => {
  //   res.json({
  //     data: {
  //       email: req.user.email,
  //       subscription: req.user.subscription,
  //     },
  //   });
  // };

  module.exports = { 
   loginUser,
   registrationUser,
   logoutUser,
   getUserData,
  //  auth,
  //  currentUser
  }
