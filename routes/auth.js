const router = require('express').Router();

const authController = require('../controllers/auth');

router.use('/', async (req, res, next) => {
  const token = await req.headers['authorization'];

  if (!token) {
    return res
      .status(401)
      .json({ code: 'Unauthorized', message: 'Unauthorized' });
  }

  req.user = authController.validateToken(token);

  req.next();
});

module.exports = router;
