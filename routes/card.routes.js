const { Router } = require('express');
const { Types } = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.get('/card/:id',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    const product = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { card: { product } } }, { new: true });

    if (!updatedUser) return res.sendStatus(500);

    res.sendStatus(200);
  }
)

router.delete('/card/:id',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    const product = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { card: { product } } }, { new: true });

    if (!updatedUser) return res.sendStatus(500);

    res.sendStatus(200);
  }
)

router.post('/card/:id',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    const product = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { card: { product } } }, { new: true });

    if (!updatedUser) return res.sendStatus(500);

    res.sendStatus(200);
  }
)

module.exports = router;