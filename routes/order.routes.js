const { Router } = require('express');
const Order = require('../models/Order');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.get('/orders',
	authMiddleware,
	async (req, res) => {
		try {
			const userId = req.user.userId;
			
			const orders = await Order.find({ owner: userId });

			res.status(200).json(orders);
		} catch (error) {
			console.log(err);
      	res.sendStatus(500);
		}
	}
)

router.post('/order',
  authMiddleware,
  async (req, res) => {
    try {
		 const userId = req.user.userId;
		 let { text, adress, products, totalPrice } = req.body;

		 products = products.map(prod => ({
			 count: prod.count,
			 id: prod.id
		 }));

		 const newOrder = await Order.create({
			 owner: userId,
			 text,
			 adress,
			 products,
			 totalPrice
		 });

		 if (!newOrder) return res.sendStatus(500);

      res.sendStatus(201);
	 } catch (err) {
		console.log(err);
      res.sendStatus(500);
    }
  }
)

module.exports = router;