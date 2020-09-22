const express = require('express');
const {getIndex} = require('../controllers/viewsController');
const router = express.Router();

router.get('/', getIndex);

module.exports = router;