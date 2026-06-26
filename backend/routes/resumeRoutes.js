const express = require('express');
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  getRecentResumes,
  getStats,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const sanitize = require('../middleware/sanitize');

const router = express.Router();

// All resume routes require authentication
router.use(protect);

// GET routes
router.get('/', getResumes);
router.get('/recent', getRecentResumes);
router.get('/stats', getStats);
router.get('/:id', getResumeById);

// POST routes
router.post('/', sanitize, createResume);
router.post('/:id/duplicate', duplicateResume);

// PUT routes
router.put('/:id', sanitize, updateResume);

// DELETE routes
router.delete('/:id', deleteResume);

module.exports = router;
