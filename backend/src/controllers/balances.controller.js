const Balance = require('../models/Balance');
const Expense = require('../models/Expense');

/**
 * Helper to calculate balances for a group based on expenses
 */
async function calculateGroupBalances(groupId) {
  const expenses = await Expense.find({ group: groupId }).populate('paidBy splitBetween');

  const balancesMap = {};

  expenses.forEach(expense => {
    const amount = expense.amount;
    const payerId = expense.paidBy._id.toString();
    const participants = expense.splitBetween.map(u => u._id.toString());

    if (participants.length === 0) return;

    const share = amount / participants.length;

    // Subtract share from each participant
    participants.forEach(userId => {
      if (!balancesMap[userId]) balancesMap[userId] = 0;
      balancesMap[userId] -= share;
    });

    // Add full amount to payer
    if (!balancesMap[payerId]) balancesMap[payerId] = 0;
    balancesMap[payerId] += amount;
  });

  return balancesMap;
}

/**
 * GET /balances/:groupId
 * Get balances for all users in a group
 */
exports.getGroupBalances = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    // Calculate balances
    const balancesMap = await calculateGroupBalances(groupId);

    // Update or create Balance documents
    const balancePromises = Object.entries(balancesMap).map(([userId, balance]) =>
      Balance.findOneAndUpdate(
        { group: groupId, user: userId },
        { balance },
        { upsert: true, new: true }
      )
    );

    const balances = await Promise.all(balancePromises);

    res.json(balances);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /balances/:groupId/:userId
 * Get balance for a single user in a group
 */
exports.getUserBalance = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;

    let balanceDoc = await Balance.findOne({ group: groupId, user: userId });
    if (!balanceDoc) {
      // calculate if not exist
      const balancesMap = await calculateGroupBalances(groupId);
      const userBalance = balancesMap[userId] || 0;

      balanceDoc = await Balance.findOneAndUpdate(
        { group: groupId, user: userId },
        { balance: userBalance },
        { upsert: true, new: true }
      );
    }

    res.json(balanceDoc);
  } catch (err) {
    next(err);
  }
};
