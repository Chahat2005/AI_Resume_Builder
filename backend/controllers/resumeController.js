const Resume = require('../models/Resume');

exports.createResume = async (req, res, next) => {
  try {
    const draft = req.body;
    const resume = await Resume.create({ user: req.user.id, ...draft });
    res.status(201).json(resume);
  } catch (error) {
    next(error);
  }
};

exports.getResumes = async (req, res, next) => {
  try {
    const { search, sort } = req.query;
    const filter = { user: req.user.id };
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      updated: { updatedAt: -1 },
    };

    const resumes = await Resume.find(filter).sort(sortOptions[sort] || { updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    next(error);
  }
};

exports.getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });
    res.json(resume);
  } catch (error) {
    next(error);
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Resume not found.' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteResume = async (req, res, next) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Resume not found.' });
    res.json({ message: 'Resume deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!original) return res.status(404).json({ error: 'Resume not found.' });
    const copy = original.toObject();
    delete copy._id;
    copy.title = `${copy.title} (Copy)`;
    const duplicated = await Resume.create(copy);
    res.status(201).json(duplicated);
  } catch (error) {
    next(error);
  }
};

exports.getRecentResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 }).limit(4);
    res.json(resumes);
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const total = await Resume.countDocuments({ user: req.user.id });
    const recent = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 }).limit(3);
    res.json({ total, recent });
  } catch (error) {
    next(error);
  }
};
