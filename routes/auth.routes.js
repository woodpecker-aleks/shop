const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

router.post('/register',
  async (req, res) => {
    try {
      const { firstName, lastName = null, email, password, phone = null } = req.body;

      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
        !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})/.test(password) ||
        !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone) ||
        firstName === ''
      ) {
        return res.status(400).json({ message: 'Invalid data' });
      }

      const candidate = await User.findOne({ email });

      if (candidate) res.status(400).json({ message: 'This user already exist' });

      const hashedPassword = await bcrypt.hash(password, 12);

      await User.create({ firstName, lastName, email, password: hashedPassword, phone });

      res.status(201).json({ message: 'User has been created' });

    } catch (err) {
      console.log(err);
      console.log(req.body);
      res.status(500).json({ message: 'Some error' });
    }
});

router.post('/login',
  async (req, res) => {
    try {
      const { email, password } = req.body;

      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
        !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})/.test(password)
      ) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: 'User is not found' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ message: 'Uncurrect email or password' });

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

      res.json({ token, userId: user.id });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Some error' });
    }
  });

module.exports = router;