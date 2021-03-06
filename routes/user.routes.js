const { Router } = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/public/images/avatars/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`.replace(/\s/g, ''));
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') cb(null, true);
  else cb(null, false);
}

router.post('/user',
  authMiddleware,
  multer({storage, fileFilter}).single('avatar'),
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const { email, firstName, lastName, phone, clearAvatar = null } = req.body;
      const data = {};

      if (req.file) data.avatar = req.file.filename;
      if (email) data.email = email;
      if (firstName) data.firstName = firstName;
      if (lastName) data.lastName = lastName;
      if (phone) data.phone = phone;
      if (clearAvatar) data.avatar = null;
    
      const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

      if (!updatedUser) return res.status(404).json({ message: 'User is not found' });

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/user',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.userId;

      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ message: 'User is not found' });

      res.json(user);
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete('/user',
  authMiddleware,
  async (req, res) => {
    const userId = req.user.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: 'User is not found' });

    res.sendStatus(200);
  }
)

module.exports = router;