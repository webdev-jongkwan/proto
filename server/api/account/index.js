var express = require('express');
var router = express.Router();
var controller = require('./account.controller');


router.get('/list', function (req, res) {
    controller.getList(req, res);
});

router.get('/:id', function (req, res) {
    controller.getOne(req, res);
});

router.put('/:id', function (req, res) {
    console.log(req.params.id)
    controller.updateOne(req, res);
});

router.delete('/:id', function (req, res) {
    console.log(req.params.id)
    controller.removeOne(req, res);
});

router.post('/', function (req, res) {
    controller.create(req, res);
});

module.exports = router;
