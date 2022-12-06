const User = require('./schemas/user');
const registration = async (email,password,subscription) => {
    const user = new User({  email, password, subscription});
await user.save()
};


module.exports = {
    registration,
  
};