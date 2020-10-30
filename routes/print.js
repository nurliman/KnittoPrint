const express = require('express');
const router = express.Router();

const printController = require('../controllers/print')
const printController2 = require('../controllers/print2')

router.get('/test', printController.testPrints);
router.get('/test2', printController2.testPrints);

module.exports = router;
