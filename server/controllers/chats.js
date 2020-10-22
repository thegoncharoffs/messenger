const express = require('express');
const asyncHandler = require('../middlewares/async');

const Chat = require('../models/Chat');

const router = express.Router();

const getChats = asyncHandler(async (req, res) => {
  res.status(200).send(await Chat.find({}));
});

const addChat = asyncHandler(async (req, res) => {
  res.status(200).send(await Chat.create(req.body));
});

const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    res.status(500).send("Chat with this id can't be found");
  }

  await chat.remove();

  res.status(200).send({});
});

router.get('', getChats).post('', addChat).delete('/:id', deleteChat);

module.exports = router;
