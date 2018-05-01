let mongooseAccountType = require('../schemas/accountType');

module.exports.getList = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccountType.find({}, function (err, accountTypeList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account type list.';
            callbackFunction(resultObject, accountTypeList);
        }
    })
};

module.exports.getOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccountType.findOne({id: params.id}, function (err, accountType) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account type.';
            callbackFunction(resultObject, accountType);
        }
    })
};

module.exports.create = function (params, callbackFunction) {
    let resultObject = {};

    const newAccountType = new mongooseAccountType;
    newAccountType.name = params.name;
    newAccountType.des = params.des;

    newAccountType.save(function (err, accountType) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - create new account type.';
            let createdAccountType = {
                id: accountType.id,
                _id: accountType._id,
                name: accountType.name,
                des: accountType.des
            };
            callbackFunction(resultObject, createdAccountType)
        }
    });
};

module.exports.updateOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccountType.findOneAndUpdate({id: params.id}, {
        name: params.name,
        des: params.des,
    }, function (err, accountType) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - update one account type.';
            callbackFunction(resultObject, accountType);
        }
    })
};

module.exports.removeOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccountType.findOneAndRemove({id: params.id}, function (err, accountType) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - remove one account type.';
            callbackFunction(resultObject, accountType);
        }
    })
};

