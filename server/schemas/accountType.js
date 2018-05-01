const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var accountTypeSchema = new Schema({
    name : {type: String, required: true, unique: true},
    des : {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('AccountType', accountTypeSchema);
autoIncrement.initialize(mongoose.connection);
accountTypeSchema.plugin(autoIncrement.plugin, { model: 'AccountTypes', field: 'id', startAt: 1});