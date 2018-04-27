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

module.exports.updateOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseCategory.findOneAndUpdate({id: params.id}, {
        name: params.name,
        des: params.des
    }, function (err, category) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - update one category.';
            callbackFunction(resultObject, category);
        }
    })
};

module.exports.removeOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseCategory.findOneAndRemove({id: params.id}, function (err, category) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - remove one category.';
            callbackFunction(resultObject, category);
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