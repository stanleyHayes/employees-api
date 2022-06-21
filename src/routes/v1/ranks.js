const express = require("express");
const {createRank, getRank, getRanks} = require("../../controllers/v1/ranks");

const router = express.Router({mergeParams: true});

router.route('/').get(getRanks).post(createRank);
router.route('/:id').get(getRank);

module.exports = router;