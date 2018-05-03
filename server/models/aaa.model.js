const mongooseJournalizing = require('../schemas/journalizing');
const mongooseCategory = require('../schemas/category');


module.exports.getA = function (params, callbackFunction) {
    let resultObject = {};
    // mongooseCategory.find({}).select('_id name').exec(function (err, returnedData) {
    //     if (err) {
    //         resultObject.success = false;
    //         resultObject.message = err;
    //         callbackFunction(resultObject);
    //     } else {
    //
    //     }
    //
    // })

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
    //date, category, amount
};