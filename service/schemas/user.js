const mongoose = require('mongoose');
const bCrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const users = new Schema( {
        password: {
          type: String,
           required: [true, 'Set password for user'],
        },
        email: {
          type: String,
           required: [true, 'Email is required'],
           unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"], 
          default: "starter"
        },
        token: String ,
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        } ,
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        },
  },
   { versionKey: false, timestamps: true },
  );

  users.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
  };
  
  users.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
  };
  const User = mongoose.model('user', users)

module.exports = User