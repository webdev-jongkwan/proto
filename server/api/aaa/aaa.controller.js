const lodash = require('lodash');
const aaaModel = require('../../models/aaa.model');
const moment = require('moment');

function asd(item) {

}

module.exports.getA = function (req, res) {

    aaaModel.getA({}, function (resultObject, aaa) {
        let resultObj = {};
        resultObj.resultA = {};
        resultObj.resultB = {};
        for (let i = 0; i < aaa.length; i++) {
            let item = aaa[i];
            if (item.isIncome) {
                resultObj.resultA[item.account] = lodash.add(resultObj.resultA[item.account], item.amount);
                resultObj.resultB[item.category] = lodash.add(resultObj.resultB[item.category], item.amount);
            } else {
                resultObj.resultA[item.account] = lodash.subtract(resultObj.resultA[item.account], item.amount);
                resultObj.resultB[item.category] = lodash.subtract(resultObj.resultB[item.category], item.amount);
            }
        }


        res.send({
            success: true,
            message: 'Succeed - create new account.',
            aaa: resultObj
        });

    })
};


module.exports.getB = function (req, res) {
let params = {
    mode: req.params.mode,
    order: req.params.order
};

    aaaModel.getB(params, function (resultObject, bbb) {
        let resultObj = {};
        resultObj.resultA = {};
        resultObj.resultB = {};
        for (let i = 0; i < bbb.length; i++) {
            let item = bbb[i];
            let key = moment(item.datetime).format('YYYY-MM-DD');
            if (item.isIncome) {
                resultObj.resultA[key] = lodash.add(resultObj.resultA[key], item.amount);
                // resultObj.resultB[item.category] = lodash.add(resultObj.resultB[item.category], item.amount);
            } else {
                resultObj.resultA[key] = lodash.subtract(resultObj.resultA[key], item.amount);
                // resultObj.resultB[item.category] = lodash.subtract(resultObj.resultB[item.category], item.amount);
            }
        }


        res.send({
            success: true,
            message: 'Succeed - create new account.',
            bbb: resultObj
        });

    })
};