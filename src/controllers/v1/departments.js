const Department = require("./../../model/department");

exports.createDepartment = async (req, res) => {
    try {
        const {name} = req.body;
        const existingDepartment = await Department.findOne({name});
        if(existingDepartment)
            return res.status(409).json({message: 'Department already exists'});
        const department = await Department.create({name});
        res.status(201).json({message: 'Department created successfully', data: department});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department)
            return res.status(404).json({message: 'Department not found'});
        res.status(200).json({message: 'Department retrieved successfully', data: department});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});
        res.status(200).json({message: 'Departments retrieved successfully', data: departments});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}