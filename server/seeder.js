const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Load models
const User = require('./models/User');
const Chat = require('./models/Chat');
const Message = require('./models/Message');

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const chats = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/chats.json`, 'utf-8')
);

const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/messages.json`, 'utf-8')
);

// Inport into DB
const importData = async () => {
  try {
    await User.create(users);
    await Chat.create(chats);
    // await Message.create(messages);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Chat.deleteMany();
    await Message.deleteMany();
    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
