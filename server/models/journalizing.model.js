let mongooseJournalizing = require('../schemas/journalizing');

module.exports.getList = function (params, callbackFunction) {
    let resultObject = {};
    mongooseJournalizing.find({}, function (err, journalizingList) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get journalizing list.';
            callbackFunction(resultObject, journalizingList);
        }
    })
};

module.exports.getOne = function (params, callbackFunction) {
    let resultObject = {};
    mongooseJournalizing.findOne({_id: params._id}).populate('account').populate('category').exec(function (err, journalizing) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - get journalizing.';
            callbackFunction(resultObject, journalizing);
        }
    });
};

// module.exports.updateOne = function (params, callbackFunction) {
//     let resultObject = {};
//     mongooseCategory.findOneAndUpdate({id: params.id}, {
//         name: params.name,
//         des: params.des
//     }, function (err, category) {
//         if (err) {
//             resultObject.success = false;
//             resultObject.message = err;
//             callbackFunction(resultObject);
//         } else {
//             resultObject.success = true;
//             resultObject.message = 'Succeed - update one category.';
//             callbackFunction(resultObject, category);
//         }
//     })
// };
//
// module.exports.removeOne = function (params, callbackFunction) {
//     let resultObject = {};
//     mongooseCategory.findOneAndRemove({id: params.id}, function (err, category) {
//         if (err) {
//             resultObject.success = false;
//             resultObject.message = err;
//             callbackFunction(resultObject);
//         } else {
//             resultObject.success = true;
//             resultObject.message = 'Succeed - remove one category.';
//             callbackFunction(resultObject, category);
//         }
//     })
// };

module.exports.create = function (params, callbackFunction) {
    let resultObject = {};

    const newJournalizing = new mongooseJournalizing;
    newJournalizing.datetime = params.datetime;
    newJournalizing.account = params.account;
    newJournalizing.category = params.category;
    newJournalizing.amount = params.amount;
    newJournalizing.isIncome = params.isIncome;
    newJournalizing.balance = params.balance;
    newJournalizing.des = params.des;
    newJournalizing.userType = params.userType;

    newJournalizing.save(function (err, journalizing) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - create new journalizing.';
            let createdJournalizing = {
                _id: journalizing._id,
                datetime: journalizing.datetime,
                account: journalizing.account,
                category: journalizing.category,
                amount: journalizing.amount,
                isIncome: journalizing.isIncome,
                balance: journalizing.balance,
                des: journalizing.des,
                userType: journalizing.userType
            };
            callbackFunction(resultObject, createdJournalizing)
        }
    });
};