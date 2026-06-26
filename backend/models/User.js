const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user'], default: 'user' },
    portfolio: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    github: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
