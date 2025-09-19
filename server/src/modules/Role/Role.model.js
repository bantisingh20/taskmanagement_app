const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: { type: String, required: true }, 
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    createDate: { type: Date, default: Date.now },
    modifyBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    modifyDate: { type: Date },

});

module.exports = mongoose.model("Role", Schema);
