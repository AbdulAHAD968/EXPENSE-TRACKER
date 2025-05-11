const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Food',
      'Transportation',
      'Housing',
      'Entertainment',
      'Utilities',
      'Healthcare',
      'Education',
      'Shopping',
      'Other',
    ],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add a budget amount'],
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    default: 'monthly',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate budget categories for same user
BudgetSchema.index({ user: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);