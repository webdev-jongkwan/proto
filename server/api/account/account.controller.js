const accountModel = require('../../models/account.model');

module.exports.getList = function (req, res) {
    let params = {};

    accountModel.getList(params, function (resultObject, accountList) {
        if (accountList) {
            res.send({
                success: true,
                message: 'Succeed - get category list.',
                accountList: accountList
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
    let params = {};
    params._id = req.params.id;

    if (!params._id) {
        return res.send({
            success: false,
            message: 'Failed : required Account ID.'
        });
    }

    accountModel.getOne(params, function (resultObject, account) {
        if (account) {
            res.send({
                success: true,
                message: 'Succeed - get account.',
                account: account
            });
        } else {
            res.send({
                success: false,
                message: 'Failed - get account.',
                errMsg: resultObject
            });
        }
    })
};

module.exports.create = function (req, res) {
    let params = {};
    params.name = req.body.name;
    params.des = req.body.des;
    params.type = req.body.type;
    params.number = req.body.number;
    params.balance = req.body.balance;

    if (!params.name) {
        return res.send({
            success: false,
            message: 'Name is required.'
        });
    } else {
        accountModel.create(params, function (resultObject, newAccount) {
            if (newAccount) {
                res.send({
                    success: true,
                    message: 'Succeed - create new account.',
                    account: newAccount
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - create new account.',
                    errMsg: resultObject.message
                });
            }
        })
    }
};

module.exports.updateOne = function (req, res) {
    let params = {};
    params._id = req.params.id;
    params.name = req.body.name;
    params.des = req.body.des;
    params.type = req.body.type;
    params.number = req.body.number;
    params.balance = req.body.balance;

    if (!params._id) {
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
        accountModel.updateOne(params, function (resultObject, createdAccount) {
            if (createdAccount) {
                res.send({
                    success: true,
                    message: 'Succeed - updated one account.',
                    account: createdAccount
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - updated one account.',
                    errMsg: resultObject
                });
            }
        })
    }
};

module.exports.removeOne = function (req, res) {
    let params = {};
    params._id = req.params.id;

    if (!params._id) {
        return res.send({
            success: false,
            message: 'ID is required.'
        });
    } else {
        accountModel.removeOne(params, function (resultObject, removedAccount) {
            if (removedAccount) {
                res.send({
                    success: true,
                    message: 'Succeed - remove one account.',
                    category: removedAccount
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - remove one account.',
                    errMsg: resultObject
                });
            }
        })
    }

};

