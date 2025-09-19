const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    menuname: { type: String },
    icon: { type: String },
    path: { type: String },
    menuText: { type: String },
    parentmenuid: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
    schema : { type:String},
    schemaapi : {type:String},
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    createDate: { type: Date, default: Date.now },
    modifyBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    modifyDate: { type: Date },
});

module.exports = mongoose.model("Menu", Schema);