let mongooseCategory = require('../schemas/category');

module.exports.getList = function (params, callbackFunction) {
    let resultObject = {};
    mongooseCategory.find({}, function (err, categoryList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get category list.';
            callbackFunction(resultObject, categoryList);
        }
    })
};

module.exports.getList = function (params, callbackFunction) {
    let resultObject = {};
    mongooseCategory.find({}, function (err, categoryList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get category list.';
            callbackFunction(resultObject, categoryList);
        }
    })
};

module.exports.create = function (params, callbackFunction) {
    let resultObject = {};

    const newCategory = new mongooseCategory;
    newCategory.name = params.name;
    newCategory.des = params.des;
    newCategory.save(function (err, category) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - create new category.';
            let returnedCategory = {
                id: category.id,
                _id: category._id,
                name: category.name,
                des: category.des
            };
            callbackFunction(resultObject, returnedCategory)
        }
    });
};