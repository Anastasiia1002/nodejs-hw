const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contacts = new Schema( {
    name: {
      type:  String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
       type: String,
       unique: true, 
    },
    phone: {
       type: String,
       unique: true,
        required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
  );
  const Contact = mongoose.model('Contact', contacts)

module.exports = Contact