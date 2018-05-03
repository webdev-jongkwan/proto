const express = require('express');
const router = express.Router();

// auth

router.use('/category', require('../api/category'));

router.use('/account', require('../api/account'));

router.use('/accountType', require('../api/accountType'));

router.use('/journalizing', require('../api/journalizing'));

router.use('/aaa', require('../api/aaa'));

module.exports = router;