const Department = require("./../../model/department");
const Role = require("./../../model/role");
const Rank = require("./../../model/rank");
const Employee = require("./../../model/employee");

exports.createEmployee = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            emergencyPhone,
            email,
            image,
            about,
            skills,
            rank,
            dateJoined,
            department,
            role,
            gender,
            birthDate
        } = req.body;

        const existingEmployee = await Employee.findOne({$or: [{email}, {phone}]});
        if (existingEmployee)
            return res.status(409).json({message: 'Email or phone already taken'});

        const existingDepartment = await Department.findById(department);
        if (!existingDepartment)
            return res.status(404).json({message: 'Department does not exist'});

        const existingRank = await Rank.findById(rank);
        if (!existingRank)
            return res.status(404).json({message: 'Rank does not exist'});

        const existingRole = await Role.findById(role);
        if (!existingRole)
            return res.status(404).json({message: 'Role does not exist'});

        const employee = await Employee.create({
            firstName,
            lastName,
            phone,
            emergencyPhone,
            email,
            image,
            about,
            skills,
            rank,
            dateJoined,
            department,
            role,
            gender,
            birthDate
        });

        await employee.populate({path: 'department'});
        await employee.populate({path: 'role'});
        await employee.populate({path: 'rank'});

        res.status(201).json({message: 'Employee added successfully', data: employee});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate({path: 'department'})
            .populate({path: 'role'})
            .populate({path: 'rank'});

        if (!employee)
            return res.status(404).json({message: 'Employee does not exist'});

        res.status(200).json({message: 'Employee retrieved successfully', data: employee});
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}


exports.getEmployees = async (req, res) => {
    try {
        const match = {};
        if (req.query.department) {
            const department = await Department.findOne({name: req.query.department});
            if (department) match['department'] = department._id;
        }
        if (req.query.role) {
            const role = await Role.findOne({name: req.query.role});
            if (role) match['role'] = role._id;
        }
        if (req.query.rank) {
            const rank = await Rank.findOne({name: req.query.rank});
            if (rank) match['rank'] = rank._id;
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 20;
        const skip = (page - 1) * limit;

        const employees = await Employee.find(match)
            .skip(skip).limit(limit).sort({createdAt: -1})
            .populate({path: 'department'})
            .populate({path: 'role'})
            .populate({path: 'rank'});
        const totalEmployees = await Employee.find(match).countDocuments();

        res.status(200).json({message: 'Employees retrieved successfully', count: totalEmployees, data: employees});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}