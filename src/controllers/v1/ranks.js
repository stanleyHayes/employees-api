const Department = require("./../../model/department");
const Rank = require("./../../model/rank");

exports.createRank = async (req, res) => {
    try {
        const {department, name} = req.body;
        const existingDepartment = await Department.findById(department);
        if(!existingDepartment)
            return res.status(404).json({message: 'Department does not exist'});
        const existingRank = await Rank.findOne({department, name});
        if(existingRank)
            return res.status(409).json({message: 'Rank already exist'});
        const rank = await Rank.create({department, name});
        await rank.populate({path: 'department'});
        res.status(201).json({message: 'Rank created successfully', data: rank});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getRank = async (req, res) => {
    try {
        const rank = await Rank.findById(req.params.id).populate({path: 'department'});
        if(!rank)
            return res.status(404).json({message: 'Rank does not exist'});
        res.status(200).json({message: 'Rank retrieved successfully', data: rank});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getRanks = async (req, res) => {
    try {
        const match = {};
        if(req.query.department){
            match['department'] = req.query.department;
        }
        const ranks = await Rank.find(match).populate({path: 'department'});
        res.status(200).json({message: 'Ranks retrieved successfully', data: ranks});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}