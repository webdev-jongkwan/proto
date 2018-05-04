var express = require('express');
var router = express.Router();
var controller = require('./aaa.controller');


router.get('/a', function (req, res) {
    controller.getA(req, res);
});

router.get('/:mode/:order', function (req, res) {

    controller.getB(req, res);
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
