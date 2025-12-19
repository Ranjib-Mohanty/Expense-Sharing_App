const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses.controller');
const auth = require('../middlewares/auth.middleware');

// Expenses routes
// - GET /expenses         -> list expenses (optionally by group/user)
// - POST /expenses        -> create a new expense (body: amount, paidBy, splitBetween, group, description)
// - GET /expenses/:id     -> fetch single expense details

router.get('/', auth, expenseController.listExpenses);
router.post('/', auth, expenseController.createExpense);
router.delete('/:id', auth, expenseController.deleteExpense);

module.exports = router;
