const mongoose = require("mongoose");

const validator = require("validator");

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error(`Invalid phone number: ${value}`);
            }
        }
    },
    emergencyPhone: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error(`Invalid phone number: ${value}`);
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email: ${value}`);
            }
        }
    },
    image: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    rank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank',
        required: true
    },
    dateJoined: {
        type: Date,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

employeeSchema.index({firstName: 'text', lastName: 'text', about: 'text'});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;