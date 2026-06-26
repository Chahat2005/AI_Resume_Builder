const express = require('express');
const { register, login, getProfile, updateProfile, changePassword, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const sanitize = require('../middleware/sanitize');

const router = express.Router();
router.post('/register', sanitize, register);
router.post('/login', sanitize, login);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, sanitize, updateProfile);
router.put('/password', protect, sanitize, changePassword);
router.delete('/profile', protect, deleteAccount);

module.exports = router;
