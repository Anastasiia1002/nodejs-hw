const User = require("../service/schemas/user")
const Jimp = require('jimp');


const avatarsUser =  async (req, res, next) => {

    const {_id: userId} = req.user;
    const {path: avatarURL} = req.file;
  
  const avatarNew = await User.findByIdAndUpdate(
    userId,
    { $set: { avatarURL } }
    ).select({avatarURL: 1, _id:0});

    await Jimp.read(avatarURL)
      .then(ava => {
        return ava.cover(250, 250).write(avatarURL);
      })
      .catch(err => next(err));


    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarNew
      },
    })
   }
 


    module.exports = { 
        avatarsUser
       }