const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide message with text'],
    },
    chat: {
      type: mongoose.Schema.ObjectId, // Type will be an id of an object in schema
      ref: 'Chat', // Reference to model
      required: [true, 'Please provide message with chatId'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide message with userId'],
    },
    createdAt: {
      type: Date,
      required: [true, 'Please provide message with date'],
    },
    closable: {
      type: Boolean,
      required: [true, 'Please provide message with closable flag'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

MessageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Message', MessageSchema);
