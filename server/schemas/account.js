const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var accountSchema = new Schema({
    _id : {type: Number},
    name : {type: String, required: true, unique: true},
    des : {type: String, required: true, unique: true},
    number: {type: Number, required: true, unique: true},
    balance: {type: Number, required: true, unique: true, default: 0},
    type: {type: Schema.Types.Number, ref: 'AccountType'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Account', accountSchema);
autoIncrement.initialize(mongoose.connection);
accountSchema.plugin(autoIncrement.plugin, { model: 'Accounts', field: '_id', startAt: 1});