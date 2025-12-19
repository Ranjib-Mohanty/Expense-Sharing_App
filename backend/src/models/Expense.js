const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, default: '', trim: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    settled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
