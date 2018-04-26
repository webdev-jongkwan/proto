const express = require('express');
const router = express.Router();
const controller = require('./category.controller');

router.get('/list', function (req, res) {
    controller.getList(req, res);
});

// router.get('/', function (req, res) {
//     controller.getOne(req, res);
// });

router.get('/:id', function (req, res) {
    controller.getOne(req, res);
});

router.put('/', function (req, res) {
    controller.updateOne(req, res);
});

router.delete('/:id', function (req, res) {
    controller.removeOne(req, res);
});

router.post('/', function (req, res) {
    controller.create(req, res);
});
module.exports = router;