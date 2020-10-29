const express = require('express');
const router = express.Router();

const printController = require('../controllers/print')

router.get('/', printController.testPrints);

module.exports = router;
