const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var journalizingSchema = new Schema({
    account: {type: Schema.Types.id, ref: 'Account'},
    category: {type: Schema.Types.id, ref: 'Category'},
    amount: {type: Number, required: true, default: 0}, // 액수
    isIncome: {type: Boolean, required: true, default: true},
    des : {type: String, required: true},
    balance: {type: Number},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date
});

module.exports = mongoose.model('Journalizing', journalizingSchema);
autoIncrement.initialize(mongoose.connection);
journalizingSchema.plugin(autoIncrement.plugin, { model: 'Journalizings', field: 'id', startAt: 1});