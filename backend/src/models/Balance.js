const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema(
  {
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 }, // positive = user is owed, negative = user owes
  },
  { timestamps: true }
);

balanceSchema.index({ group: 1, user: 1 }, { unique: true }); // one balance per user per group

module.exports = mongoose.model('Balance', balanceSchema);
