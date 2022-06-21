const Department = require("./../../model/department");
const Role = require("./../../model/role");

exports.createRole = async (req, res) => {
    try {
        const {department, name} = req.body;
        const existingDepartment = await Department.findById(department);
        if(!existingDepartment)
            return res.status(404).json({message: 'Department does not exist'});
        const existingRole = await Role.findOne({department, name});
        if(existingRole)
            return res.status(409).json({message: 'Role already exist'});
        const rank = await Role.create({department, name});
        await rank.populate({path: 'department'});
        res.status(201).json({message: 'Role created successfully', data: rank});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getRole = async (req, res) => {
    try {
        const rank = await Role.findById(req.params.id).populate({path: 'department'});
        if(!rank)
            return res.status(404).json({message: 'Role does not exist'});
        res.status(200).json({message: 'Role retrieved successfully', data: rank});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getRoles = async (req, res) => {
    try {
        const match = {};
        if(req.query.department){
            match['department'] = req.query.department;
        }
        const ranks = await Role.find(match).populate({path: 'department'});
        res.status(200).json({message: 'Roles retrieved successfully', data: ranks});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}