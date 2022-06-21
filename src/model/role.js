const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;