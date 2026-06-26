const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  startDate: String,
  endDate: String,
  description: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
  link: String,
});

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    personal: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      linkedIn: String,
      github: String,
      portfolio: String,
    },
    summary: String,
    education: [sectionSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    skills: [String],
    languages: [String],
    certifications: [String],
    achievements: [String],
    interests: [String],
    photo: String,
    template: { type: String, default: 'modern' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
