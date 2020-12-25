const { Router } = require('express');
const Product = require('../models/Product');
const router = Router();
const colors = require('colors');

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

router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

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
    const { filter, length, range, sort } = req.body;

    const queryFilter = {...filter};
    if (filter.options) delete queryFilter.options;
    if (filter.categories) delete queryFilter.categories;

    let query = Product.find(queryFilter);

    if (filter.options) {
      query.where('options').elemMatch(el => {
        el.or(filter.options);
      });
    }

    if (filter.categories) {
      query.where('categories').in(filter.categories);
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
            const aRating = a.rating;
            const bRating = b.rating;

            if (aRating < bRating) return 1;
            else if (aRating > bRating) return -1;
            else return 0;
          });
        }
      });
    }

    if (length) products.length = length;

    if (range) products = products.slice(...range);

    res.json(products);
  } catch (err) {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Error from POST /api/products function:\n${err}`.red);
    res.sendStatus(500);
  }
});

module.exports = router;