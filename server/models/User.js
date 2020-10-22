const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a firtName'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a lastName'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: [true, 'Please add an unique email'],
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Wont show password when we select user shema
    },
    settings: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        required: [true, 'Please add a theme'],
      },
      language: {
        type: String,
        enum: ['en', 'ru'],
        required: [true, 'Please add a language'],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Fill fullName field
UserSchema.virtual('fullName')
  .get(function () {
    this.fullName = `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });

module.exports = mongoose.model('User', UserSchema);
