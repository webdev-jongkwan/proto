const journalizingModel = require('../../models/journalizing.model');

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

module.exports.create = function (req, res) {
    let params = {};
    params.account = req.body.account;
    params.category = req.body.category;
    params.amount = req.body.amount;
    params.isIncome = req.body.isIncome;
    params.balance = req.body.balance;
    params.des = req.body.des;


    // if (!params.name) {
    //     return res.send({
    //         success: false,
    //         message: 'Name is required.'
    //     });
    // } else {
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
        })
    // }
};