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

// module.exports.getOne = function (params, callbackFunction) {
//     let resultObject = {};
//     mongooseAccount.findOne({id: params.id}, function (err, account) {
//         if (err) {
//             resultObject.success = false;
//             resultObject.message = err;
//             callbackFunction(resultObject);
//         } else {
//             resultObject.success = true;
//             resultObject.message = 'Succeed - get account.';
//             callbackFunction(resultObject, account);
//         }
//     })
// };

module.exports.getOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseAccount.findOne({_id: params._id}).populate('type').exec(function (err, account) {
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
    mongooseAccount.findOneAndUpdate({_id: params._id}, {
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
    mongooseAccount.findOneAndRemove({_id: params._id}, function (err, account) {
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

let calcBalance = function (inputData, account) {
    let updatedBalance = account.balance;

    if (inputData.reverse) {
        if (!inputData.isIncome) {
            updatedBalance += inputData.amount;
        } else {
            updatedBalance -= inputData.amount;
        }
    } else {
        if (inputData.isIncome) {
            updatedBalance += inputData.amount;
        } else {
            updatedBalance -= inputData.amount;
        }
    }

    return updatedBalance;
};

module.exports.updateBalance = function (params, callbackFunction) {
    let resultObject = {};

    mongooseAccount.findOne({_id: params._id}, function (err, account) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            // account.set({balance: })

            let balance = calcBalance(params, account);
            account.set({balance: balance, updatedAt: Date.now()});
            // updatedAccount.balance = calcBalance(params, account);

            // updatedAccount.updatedAt = Date.now();
            account.save(function (err, updatedAccount) {
                if (err) {
                    resultObject.success = false;
                    resultObject.message = err;
                    callbackFunction(resultObject);
                } else {
                    resultObject.success = true;
                    resultObject.message = 'Succeed - updated account balance.';
                    callbackFunction(resultObject, updatedAccount);
                }
            });
        }
    });
};

