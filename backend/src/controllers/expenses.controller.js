const Expense = require('../models/Expense');

// List expenses (optionally filter by groupId)
exports.listExpenses = async (req, res, next) => {
  try {
    const { groupId } = req.query;
    const filter = {};
    if (groupId) filter.group = groupId;

    const expenses = await Expense.find(filter).populate('paidBy splitBetween group');
    return res.json(expenses);
  } catch (err) {
    return next(err);
  }
};

// Create expense
exports.createExpense = async (req, res, next) => {
  try {
    const { amount, description, paidBy, splitBetween, group } = req.body;
    if (!amount || !paidBy) return res.status(400).json({ message: 'amount and paidBy are required' });

    const expense = await Expense.create({ amount, description, paidBy, splitBetween: splitBetween || [], group });
    return res.status(201).json(expense);
  } catch (err) {
    return next(err);
  }
};

// Delete expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    return res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    return next(err);
  }
};
