const express = require('express');
const router = express.Router();
const controller = require('./stockitem.controller');

router.get('/', controller.index);
router.get('/:code', controller.show);
router.delete('/:code', controller.destroy);
router.post('/:code', controller.create);
router.put('/:code', controller.update);

module.exports = router;