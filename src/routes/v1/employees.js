const express = require("express");
const {getEmployees, createEmployee, getEmployee} = require("../../controllers/v1/employees");

const router = express.Router({mergeParams: true});

router.route('/').get(getEmployees).post(createEmployee);
router.route('/:id').get(getEmployee);

module.exports = router;