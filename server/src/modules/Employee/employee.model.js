const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, },
    employeecode : { type: String, },
    contactno : { type: String, },
    emailid : { type: String, require: true ,  },
    isUser : { type : Boolean, default:true},
    password : { type: String},
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    createDate: { type: Date, default: Date.now },
    modifyBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    modifyDate: { type: Date },
});

module.exports = mongoose.model("Employee", Schema);