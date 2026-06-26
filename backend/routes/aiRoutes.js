const express = require('express');
const { generateAIContent } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const sanitize = require('../middleware/sanitize');

const router = express.Router();
router.use(protect);
router.post('/generate', sanitize, generateAIContent);

module.exports = router;
