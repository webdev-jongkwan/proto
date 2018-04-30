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
    params.account = req.body.account;
    params.category = req.body.category;
    params.amount = req.body.amount;
    params.isIncome = req.body.isIncome;
    params.balance = req.body.balance;
    params.des = req.body.des;
    newCategory.name = params.name;
    newCategory.des = params.des;
    newCategory.save(function (err, category) {
        if (err) {
            resultObject.success = false;
            resultObject.message = err;
            callbackFunction(resultObject);
        } else {
            resultObject.success = true;
            resultObject.message = 'Succeed - create new category.';
            let returnedCategory = {
                id: category.id,
                _id: category._id,
                name: category.name,
                des: category.des
            };
            callbackFunction(resultObject, returnedCategory)
        }
    });
};