const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');
const path = require('path');
const multer = require('multer');

// Configure avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `user-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorResponse('Only image files are allowed', 400), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 } // 2MB limit
});

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
exports.updateCurrentUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const fieldsToUpdate = { name, email, phone };

  try {
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ErrorResponse('Email already in use', 400));
    }
    next(err);
  }
});

// @desc    Update user password
// @route   PUT /api/users/me/password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Verify current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  // Set new password
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    data: { id: user._id }
  });
});

// @desc    Upload user avatar
// @route   POST /api/users/me/avatar
// @access  Private
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: avatarUrl },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: {
      avatarUrl,
      user
    }
  });
});

// @desc    Delete current user account
// @route   DELETE /api/users/me
// @access  Private
exports.deleteCurrentUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});