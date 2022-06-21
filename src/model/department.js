const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name required'],
        trim: true,
        unique: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;