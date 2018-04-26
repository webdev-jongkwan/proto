const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var categorySchema = new Schema({
    name : {type: String, required: true, unique: true},
    des : {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date
});

module.exports = mongoose.model('Category', categorySchema);
autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, { model: 'Categories', field: 'id', startAt: 1});