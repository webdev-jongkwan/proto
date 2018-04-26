const categoryModel = require('../../models/category.model');

module.exports.getList = function (req, res) {
    let params = {};

    categoryModel.getList(params, function (resultObject, categoryList) {
        if (categoryList) {
            res.send({
                success: true,
                message: 'Succeed - get category list.',
                categoryList: categoryList
            });
        } else {
            res.send({
                success: false,
                message: 'Failed - get category list.',
                errMsg: resultObject
            });
        }
    })
};

module.exports.getOne = function (req, res) {

};

module.exports.updateOne = function (req, res) {
    let params = {};
    params.id = req.body.id;

};

module.exports.removeOne = function (req, res) {

};

module.exports.create = function (req, res) {
    let params = {};
    params.name = req.body.name;
    params.des = req.body.des;

    if (!params.name) {
        return res.send({
            success: false,
            message: 'Name is required.'
        });
    } else {
        categoryModel.create(params, function (resultObject, newCategory) {
            if (newCategory) {
                res.send({
                    success: true,
                    message: 'Succeed - create new category.',
                    category: newCategory
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - create new category.',
                    errMsg: resultObject
                });
            }
        })
    }
};

module.exports.update = function (req, res) {

};

module.exports.delete = function (req, res) {

};

module.exports.deleteOne = function (req, res) {

};
