const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a chat title'],
      unique: [true, 'Please provide an unique chat title'],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, "Please provide chat's owner"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete messages when a chat is deleted
ChatSchema.pre('remove', async function (next) {
  console.log(`Messages being removed from bootcamp ${this._id}`);
  await this.model('Message').deleteMany({ chatId: this._id });
  next();
});

ChatSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Chat', ChatSchema);
