const {Router} = require('express');

const productRouting = require('./product/index');
const users = require('./users');
const auth = require('./Authorization');

const router = new Router();

router.use('/api', productRouting);
router.use('/auth', auth);
router.use('/users', users);

module.exports = router;