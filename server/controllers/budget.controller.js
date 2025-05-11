const Budget = require('../models/Budget');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');

// @desc    Get all budgets
// @route   GET /api/budgets
// @access  Private
exports.getBudgets = asyncHandler(async (req, res, next) => {
  const budgets = await Budget.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: budgets.length,
    data: budgets,
  });
});

// @desc    Get single budget
// @route   GET /api/budgets/:id
// @access  Private
exports.getBudget = asyncHandler(async (req, res, next) => {
  const budget = await Budget.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!budget) {
    return next(
      new ErrorResponse(`No budget found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: budget,
  });
});

// @desc    Create new budget
// @route   POST /api/budgets
// @access  Private
exports.createBudget = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const budget = await Budget.create(req.body);

  res.status(201).json({
    success: true,
    data: budget,
  });
});

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
exports.updateBudget = asyncHandler(async (req, res, next) => {
  let budget = await Budget.findById(req.params.id);

  if (!budget) {
    return next(
      new ErrorResponse(`No budget found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is budget owner
  if (budget.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this budget`,
        401
      )
    );
  }

  budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: budget,
  });
});

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
exports.deleteBudget = asyncHandler(async (req, res, next) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget) {
    return next(
      new ErrorResponse(`No budget found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is budget owner
  if (budget.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this budget`,
        401
      )
    );
  }

  await budget.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});