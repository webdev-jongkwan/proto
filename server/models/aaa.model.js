const mongooseJournalizing = require('../schemas/journalizing');
const mongooseCategory = require('../schemas/category');
const moment = require('moment');

module.exports.getA = function (params, callbackFunction) {
    let resultObject = {};
    mongooseJournalizing.find({}).select('account category isIncome amount').exec(function (err, resultList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultList);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account list.';
            callbackFunction(resultObject, resultList);
        }
    });
};

module.exports.getB = function (params, callbackFunction) {
    let resultObject = {};
    let startDate = moment(params.order, 'MM').format('YYYY-MM-DD HH:mm:ss.SSS');
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');
    mongooseJournalizing.find({
        $and: [{datetime: {$gte: startDate}}, {datetime: {$lte: endDate}}]
    }).select('datetime isIncome amount').exec(function (err, resultList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultList);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get account list.';
            callbackFunction(resultObject, resultList);
        }
    });
};