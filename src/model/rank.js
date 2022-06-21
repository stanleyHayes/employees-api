const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
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

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;