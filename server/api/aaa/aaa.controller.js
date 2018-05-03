const lodash = require('lodash');
const aaaModel = require('../../models/aaa.model');

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






        // if (newAccount) {
        res.send({
            success: true,
            message: 'Succeed - create new account.',
            aaa: resultObj
        });
        // } else {
        //     res.send({
        //         success: false,
        //         message: 'Failed - create new account.',
        //         errMsg: resultObject.message
        //     });
        // }
    })
};