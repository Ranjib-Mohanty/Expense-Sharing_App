require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../src/models/User');
const Group = require('../src/models/Group');
const Expense = require('../src/models/Expense');
const Balance = require('../src/models/Balance');

(async () => {
  try {
    const DEFAULT_LOCAL = 'mongodb://127.0.0.1:27017/expenseapp';
    const uri = process.env.MONGO_URI || DEFAULT_LOCAL;
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB for seeding:', uri);

    // Clean up optional: comment out if you don't want to delete collections
    await Promise.all([
      User.deleteMany({}),
      Group.deleteMany({}),
      Expense.deleteMany({}),
      Balance.deleteMany({}),
    ]);
    console.log('Cleared existing Users/Groups/Expenses/Balances');

    // Create users
    const pwd1 = await bcrypt.hash('Secret123', 10);
    const pwd2 = await bcrypt.hash('Secret456', 10);

    const alice = await User.create({ name: 'Alice', email: 'alice@example.com', password: pwd1 });
    const bob = await User.create({ name: 'Bob', email: 'bob@example.com', password: pwd2 });

    console.log('Created users:', alice._id.toString(), bob._id.toString());

    // Create group
    const group = await Group.create({
      name: 'Weekend Trip',
      members: [alice._id, bob._id],
      createdBy: alice._id,
      description: 'Trip to the hills',
      settings: { currency: 'USD' },
    });

    console.log('Created group:', group._id.toString());

    // Create expense (Alice paid $120 split between Alice and Bob)
    const expense = await Expense.create({
      amount: 120,
      description: 'Dinner',
      paidBy: alice._id,
      splitBetween: [alice._id, bob._id],
      group: group._id,
    });

    console.log('Created expense:', expense._id.toString());

    // Simple balances: Bob owes $60, Alice +$60
    const balanceBob = await Balance.create({ user: bob._id, group: group._id, amount: -60 });
    const balanceAlice = await Balance.create({ user: alice._id, group: group._id, amount: 60 });

    console.log('Created balances:', balanceAlice._id.toString(), balanceBob._id.toString());

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message || err);
    process.exit(1);
  }
})();