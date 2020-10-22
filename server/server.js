const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Connect to database
connectDB();

// Controllers
const chats = require('./controllers/chats');
const messages = require('./controllers/messages');
const user = require('./controllers/users');

// Init app
const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, '../build')));

// Init middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(fileUpload());

// Init controllers
app.use('/api/chats', chats);
app.use('/api/messages', messages);
app.use('/api/user', user);

// Handle errors
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running at ${process.env.PORT || 3000}`);
});
