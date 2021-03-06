const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var accountTypeSchema = new Schema({
    _id: {type: Number},
    name : {type: String, required: true},
    des : {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('AccountType', accountTypeSchema);
autoIncrement.initialize(mongoose.connection);
accountTypeSchema.plugin(autoIncrement.plugin, { model: 'AccountTypes', field: '_id', startAt: 1});