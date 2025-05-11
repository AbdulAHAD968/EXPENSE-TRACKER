const express = require('express');
const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  updatePassword,
  uploadAvatar
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../utils/fileUpload');

const router = express.Router();

// Current user routes
router.route('/me')
  .get(protect, getCurrentUser)
  .put(protect, updateCurrentUser)
  .delete(protect, deleteCurrentUser);

// Password update
router.put('/me/password', protect, updatePassword);

// Avatar upload
router.post('/me/avatar', protect, upload.single('avatar'), uploadAvatar);

module.exports = router;