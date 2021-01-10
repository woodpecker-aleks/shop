const { Router } = require('express');
const { Types } = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/product/update', async (req, res) => {
  try {
    const product = req.body;

    const updatedProduct = await Product.updateOne(product.filter, product.new);

    res.sendStatus(200);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from POST /api/product function:\n${err}`.red);
    res.sendStatus(500);
  }
});

router.post('/product', async (req, res) => {
  try {
    const product = req.body;

    product.price = (product.price * 0.035).toFixed(0);

    const newProduct = await Product.create(product);

    if (!newProduct) return res.sendStatus(501);

    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Success from POST /api/product`.green);
    res.sendStatus(200);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from POST /api/product function:\n${err}`.red);
    res.sendStatus(500);
  }
});

router.get('/product/:url', async (req, res) => {
  try {
    const product = await Product.findOne({ url: req.params.url });

    if (!product) return res.status(404);

    res.json(product);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from GET /api/product/:id function:\n${err}`.red);
    res.sendStatus(500);
  }
});

router.post('/products', async (req, res) => {
  try {
    const { filter, max, range, sort, ids } = req.body;

    const queryFilter = {...filter};
    if (filter.options) delete queryFilter.options;
    if (filter.categories) delete queryFilter.categories;
    if (filter.sale) delete queryFilter.sale;
    if (filter.name) delete queryFilter.name;
    if (filter.price) delete queryFilter.price;

    let query = Product.find(queryFilter);

    if (ids) {
      const productIds = ids.map(id => Types.ObjectId(id));
      query.where('_id').in(productIds);
    }

    if (req.body['!ids']) {
      query.where('_id').nin(req.body['!ids']);
    }

    if (filter.sale) {
      query.exists('sale');
    }

    if (filter.name) {
      query.where('name').regex(new RegExp(`${filter.name}`, 'i'));
    }

    if (filter.price?.from && filter.price?.to) {
      query.where('price')
        .gt(filter.price.from)
        .lt(filter.price.to);
    }

    if (filter.categories) {
      query.where('categories').all(filter.categories);
    }

    if (filter.options) {
      query.where('options').elemMatch(el => {
        el.or(filter.options);
      });
    }

    const products = await query;

    if (!products) return res.status(404);

    if (sort) {
      sort.forEach(option => {
        if (option === 'newer') {
          products.sort((a, b) => {
            const aDate = a.date.getTime();
            const bDate = b.date.getTime();

            if (aDate < bDate) return 1;
            else if (aDate > bDate) return -1;
            else return 0;
          });
        }
        if (option === 'older') {
          products.sort((a, b) => {
            const aDate = a.date.getTime();
            const bDate = b.date.getTime();

            if (aDate < bDate) return -1;
            else if (aDate > bDate) return 1;
            else return 0;
          });
        }
        if (option === 'expensive') {
          products.sort((a, b) => {
            const aPrice = a.price;
            const bPrice = b.price;

            if (aPrice < bPrice) return 1;
            else if (aPrice > bPrice) return -1;
            else return 0;
          });
        }
        if (option === 'cheaper') {
          products.sort((a, b) => {
            const aPrice = a.price;
            const bPrice = b.price;

            if (aPrice < bPrice) return -1;
            else if (aPrice > bPrice) return 1;
            else return 0;
          });
        }
        if (option === 'popular') {
          products.sort((a, b) => {
            const aRating = a.rating.reduce((accum, curr) => (accum + curr), 0) / a.rating.length;
            const bRating = b.rating.reduce((accum, curr) => (accum + curr), 0) / a.rating.length;

            if (aRating < bRating) return 1;
            else if (aRating > bRating) return -1;
            else return 0;
          });
        }
      });
    }

    if (max && products.length > max) products.length = max;

    if (range) products = products.slice(...range);

    res.json(products);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from POST /api/products function:\n${err}`.red);
    res.sendStatus(500);
  }
});

router.get('/product/like/:id',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    const likedProductId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { likedProducts: likedProductId } }, { new: true });

    if (!updatedUser) return res.sendStatus(500);

    res.sendStatus(200);
  }
)

router.delete('/product/like/:id',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    const likedProductId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { likedProducts: likedProductId } }, { new: true });

    if (!updatedUser) return res.sendStatus(500);

    res.sendStatus(200);
  }
)

module.exports = router;