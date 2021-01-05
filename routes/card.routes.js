const { Router } = require('express');
const { Types } = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/card', async (req, res) => {
  try {
    const product = req.body;
    
    res.sendStatus(200);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from POST /api/product function:\n${err}`.red);
    res.sendStatus(500);
  }
});

module.exports = router;