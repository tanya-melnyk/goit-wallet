const router = require('express').Router();

const authController = require('../controllers/auth');

router.use('/', async (req, res, next) => {
  const token = await req.headers['authorization'];

  if (!token) {
    return res
      .status(401)
      .json({ code: 'Unauthorized', message: 'Unauthorized' });
  }

  next();
  // authController.validateToken(token);
});

module.exports = router;
