const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var journalizingSchema = new Schema({
    _id: {type: Number},
    datetime: {type: Date, required: true, default: Date.now},
    account: {type: Schema.Types.Number, ref: 'Account'},
    category: {type: Schema.Types.Number, ref: 'Category'},
    amount: {type: Number, required: true, default: 0}, // 액수
    isIncome: {type: Boolean, required: true, default: true},
    des : {type: String},
    balance: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    userType: {type: Number, default: 0}
});

module.exports = mongoose.model('Journalizing', journalizingSchema);
autoIncrement.initialize(mongoose.connection);
journalizingSchema.plugin(autoIncrement.plugin, { model: 'Journalizings', field: '_id', startAt: 1});