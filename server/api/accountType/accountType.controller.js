const accountTypeModel = require('../../models/accountType.model');

module.exports.getList = function (req, res) {
    let params = {};

    accountTypeModel.getList(params, function (resultObject, accountTypeList) {
        if (accountTypeList) {
            res.send({
                success: true,
                message: 'Succeed - get account type list.',
                accountTypeList: accountTypeList
            });
        } else {
            res.send({
                success: false,
                message: 'Failed - get account type list.',
                errMsg: resultObject
            });
        }
    })
};

module.exports.getOne = function (req, res) {
    let params = {};
    params.id = req.params.id;

    if (!params.id) {
        return res.send({
            success: false,
            message: 'Failed : required Account Type ID.'
        });
    }

    accountTypeModel.getOne(params, function (resultObject, accountType) {
        if (accountType) {
            res.send({
                success: true,
                message: 'Succeed - get account type.',
                accountType: accountType
            });
        } else {
            res.send({
                success: false,
                message: 'Failed - get account type.',
                errMsg: resultObject
            });
        }
    })
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
        accountTypeModel.create(params, function (resultObject, createdAccountType) {
            if (createdAccountType) {
                res.send({
                    success: true,
                    message: 'Succeed - create new account type.',
                    accountType: createdAccountType
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - create new account type.',
                    errMsg: resultObject.message
                });
            }
        })
    }
};

module.exports.updateOne = function (req, res) {
    let params = {};
    params.id = req.params.id;
    params.name = req.body.name;
    params.des = req.body.des;

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
        accountTypeModel.updateOne(params, function (resultObject, updatedAccountType) {
            if (updatedAccountType) {
                res.send({
                    success: true,
                    message: 'Succeed - updated one account type.',
                    account: updatedAccountType
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - updated one account type.',
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
        accountTypeModel.removeOne(params, function (resultObject, removedAccountType) {
            if (removedAccountType) {
                res.send({
                    success: true,
                    message: 'Succeed - remove one account type.',
                    category: removedAccountType
                });
            } else {
                res.send({
                    success: false,
                    message: 'Failed - remove one account type.',
                    errMsg: resultObject
                });
            }
        })
    }

};

