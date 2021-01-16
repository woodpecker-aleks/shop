const { Router } = require('express');
const { Types } = require('mongoose');
const User = require('../models/User');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.delete('/card/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const product = req.params.id;

      const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { card: { _id: product } } }, { new: true });

      if (!updatedUser) return res.sendStatus(500);

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
)

router.get('/card/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const product = req.params.id;

      const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { card: { _id: product } } }, { new: true });

      if (!updatedUser) return res.sendStatus(500);

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
)

router.get('/card/:productId/:count',
  authMiddleware,
  async (req, res) => {
    try {
      const { productId, count } = req.params;
      const userId = req.user.userId;

      const query = User.findByIdAndUpdate(userId, {}, { new: true });

      query.where('card').elemMatch({ _id: productId }).set('card.$.count', count);

      const updatedUser = await query;
      console.log(count);
      if (!updatedUser) return res.sendStatus(500);

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;