const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var categorySchema = new Schema({
    _id: {type: Number},
    name : {type: String, required: true},
    des : {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Category', categorySchema);
autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, { model: 'Categories', field: '_id', startAt: 1});