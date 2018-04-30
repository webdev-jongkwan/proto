let mongooseAccount = require('../schemas/account');

module.exports.getList = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccount.find({}, function (err, accountList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account list.';
            callbackFunction(resultObject, accountList);
        }
    })
};

module.exports.getOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccount.findOne({id: params.id}, function (err, account) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account.';
            callbackFunction(resultObject, account);
        }
    })
};

module.exports.create = function (params, callbackFunction) {
    let resultObject = {};

    const newAccount = new mongooseAccount;
    newAccount.name = params.name;
    newAccount.des = params.des;
    newAccount.type = params.type;
    newAccount.number = params.number;
    newAccount.balance = params.balance;

    newAccount.save(function (err, account) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - create new account.';
            let createdAccount = {
                id: account.id,
                _id: account._id,
                name: account.name,
                des: account.des,
                type: account.type,
                number: account.number,
                balance: account.balance
            };
            callbackFunction(resultObject, createdAccount)
        }
    });
};

module.exports.updateOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccount.findOneAndUpdate({id: params.id}, {
        name: params.name,
        des: params.des,
        type: account.type,
        number: account.number,
        balance: account.balance,
        udpatedAt: Date.now()
    }, function (err, account) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - update one account.';
            callbackFunction(resultObject, account);
        }
    })
};

module.exports.removeOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccount.findOneAndRemove({id: params.id}, function (err, account) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - remove one account.';
            callbackFunction(resultObject, account);
        }
    })
};

