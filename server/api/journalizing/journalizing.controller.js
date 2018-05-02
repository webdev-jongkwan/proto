const journalizingModel = require('../../models/journalizing.model');
const accountModel = require('../../models/account.model');

module.exports.getList = function (req, res) {
    let params = {};

    journalizingModel.getList(params, function (resultObject, journalizingList) {
        if (journalizingList) {
            res.send({
                success: true,
                message: 'Succeed - get journalizing list.',
                journalizingList: journalizingList
            });
        } else {
            res.send({
                success: false,
                message: 'Failed - get journalizing list.',
                errMsg: resultObject
            });
        }
    })
};

module.exports.getOne = function (req, res) {
    let params = {};
    params._id = req.params.id;

    journalizingModel.getOne(params, function (resultObject, journalizingList) {
        if (journalizingList) {

        } else {
            res.send({
                success: false,
                message: 'Failed - update account.',
                errMsg: resultObject
            });
        }
    })
};

function updateAccount(params, callbackFunction) {

    let newParams = {
        _id: params.account,
        isIncome: params.isIncome,
        amount: params.amount
    };

    accountModel.updateBalance(newParams, function (resultObject, updatedAccount) {
        if (updatedAccount) {
            callbackFunction(resultObject, updatedAccount);
        } else {
            callbackFunction(resultObject);
        }
    });
}

module.exports.create = function (req, res) {
    let params = {};
    params.datetime = req.body.datetime;
    params.account = req.body.account;
    params.category = req.body.category;
    params.amount = req.body.amount;
    params.isIncome = req.body.isIncome;
    params.balance = req.body.balance;
    params.des = req.body.des;

    updateAccount(params, function (resultObject, updatedAccount) {
        params.balance = updatedAccount.balance;
        journalizingModel.create(params, function (resultObject, newJournalizing) {
            if (newJournalizing) {
                res.send({
                    success: true,
                    message: 'Succeed - create new journalizing.',
                    journalizing: newJournalizing
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - create new journalizing.',
                    errMsg: resultObject.message
                });
            }
        });
    });
};


