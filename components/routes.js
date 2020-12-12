const router = require('express').Router();
const controllers = require('./controllers');

router.post('/product/create', controllers.create);
router.post('/product/search', controllers.getProduct);
module.exports = router;
