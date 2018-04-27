const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var accountSchema = new Schema({
    name : {type: String, required: true, unique: true},
    des : {type: String},
    number: {type: Number, required: true, unique: true},
    balance: {type: Number, required: true},
    types: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date
});

module.exports = mongoose.model('Account', accountSchema);
autoIncrement.initialize(mongoose.connection);
accountSchema.plugin(autoIncrement.plugin, { model: 'Accounts', field: 'id', startAt: 1});