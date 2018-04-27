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

module.exports.updateOne = function (req, res) {
    let params = {};
    params.id = req.params.id;
    params.name = req.body.name;
    params.des = req.body.des || '';

    if (!params.id) {
        return res.send({
            success: false,
            message: 'ID is required.'
        });
    } else if (!params.name) {
        return res.send({
            success: false,
            message: 'Name is required.'
        });
    } else {
        categoryModel.updateOne(params, function (resultObject, returnedCategory) {
            if (returnedCategory) {
                res.send({
                    success: true,
                    message: 'Succeed - updated one category.',
                    category: returnedCategory
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - updated one category.',
                    errMsg: resultObject
                });
            }
        })
    }
};

module.exports.removeOne = function (req, res) {
    let params = {};
    params.id = req.params.id;

    if (!params.id) {
        return res.send({
            success: false,
            message: 'ID is required.'
        });
    } else {
        categoryModel.removeOne(params, function (resultObject, returnedCategory) {
            if (returnedCategory) {
                res.send({
                    success: true,
                    message: 'Succeed - remove one category.',
                    category: returnedCategory
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - remove one category.',
                    errMsg: resultObject
                });
            }
        })
    }

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
                    errMsg: resultObject.message
                });
            }
        })
    }
};
