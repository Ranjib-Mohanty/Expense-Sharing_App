const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balances.controller');


// GET /balances/:groupId - get balances for all users in a group
router.get('/:groupId', balanceController.getGroupBalances);

// GET /balances/:groupId/:userId - get balance for a single user in a group
router.get('/:groupId/:userId', balanceController.getUserBalance);

module.exports = router;
