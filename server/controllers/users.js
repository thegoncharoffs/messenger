const express = require('express');
const asyncHandler = require('../middlewares/async');

const User = require('../models/User');

const router = express.Router();

const getUser = asyncHandler(async (req, res) => {
  res.status(200).send(await User.findById(req.params.id));
});

const addUser = asyncHandler(async (req, res) => {
  res.status(200).send(await User.create(req.body));
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).send(await User.findByIdAndUpdate(req.params.id, req.body));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(500).send("User with this id can't be found");
  }

  await user.remove();
  res.status(200).send({});
});

router
  .get('/:id', getUser)
  .post('', addUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);

module.exports = router;
