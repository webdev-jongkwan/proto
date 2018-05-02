var express = require('express');
var router = express.Router();
var controller = require('./journalizing.controller');

router.get('/list', function (req, res) {
    controller.getList(req, res);
});

router.get('/:id', function (req, res) {
    controller.create(req, res);
});

router.post('/', function (req, res) {
    controller.create(req, res);
});
module.exports = router;