const express = require("express");
const {createDepartment, getDepartment, getDepartments} = require("../../controllers/v1/departments");

const router = express.Router({mergeParams: true});

router.route('/').get(getDepartments).post(createDepartment);
router.route('/:id').get(getDepartment);

module.exports = router;