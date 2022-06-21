const express = require("express");
const {createRole, getRole, getRoles} = require("../../controllers/v1/roles");

const router = express.Router({mergeParams: true});

router.route('/').get(getRoles).post(createRole);
router.route('/:id').get(getRole);

module.exports = router;