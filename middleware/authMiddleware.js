const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../service/schemas/user")

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1]
  const isValid = verifyToken(token)

  if (!isValid) {
    return res.status(401).send({
      status: 'error',
      code: 401,
      message: 'Not authorized verifyToken',
    })
  }



  const payload = jwt.decode(token)
    console.log(payload)
    const user = await User.findById({ _id: payload.id })
    if (!user || user.token !== token) {
      return res.status(401).send({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
    }
    req.user = user;
    req.token = token;
    
    next();}
  

  const verifyToken = (token) => {
    try {
      const t = jwt.verify(token, secret)
      console.log(t)
      return !!t
    } catch (error) {
      return false
    }
  }

module.exports = {
  authMiddleware,
};
