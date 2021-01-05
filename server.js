const express = require('express');
const mongoose = require('mongoose');

const config = require('config');
const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api', require('./routes/user.routes'));

app.use('/api', require('./routes/product.routes'));

start();




async function start() {
  try {

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

  } catch (err) {

    console.log('Server error', err.message);
    process.exit(1);
    
  }
}