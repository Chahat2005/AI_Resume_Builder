import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createResume, updateResume, fetchResume } from '../services/resumeService';
import { generateAI } from '../services/aiService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Spinner from '../components/ui/Spinner';

const ResumeBuilderPage = ({ editMode }) => {
  const { id } = useParams();
  const { token, showToast } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(editMode);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [resume, setResume] = useState({
    title: 'Untitled Resume',
    personal: { fullName: '', email: '', phone: '', address: '', linkedIn: '', github: '', portfolio: '' },
    summary: '',
    education: [{ institution: '', degree: '', startDate: '', endDate: '', description: '' }],
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    projects: [{ name: '', description: '', technologies: [], link: '' }],
    skills: [],
    languages: [],
    certifications: [],
    achievements: [],
    interests: [],
    photo: '',
    template: 'modern',
  });

  useEffect(() => {
    if (editMode && id) {
      const loadResume = async () => {
        const data = await fetchResume(token, id);
        setResume(data);
        setLoading(false);
      };
      loadResume();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateResume(token, id, resume);
        showToast('Resume updated.');
      } else {
        const created = await createResume(token, resume);
        showToast('Resume created.');
        navigate(`/resumes/edit/${created._id}`);
      }
    } catch (err) {
      showToast('Unable to save resume.', 'error');
    }
  };

  const handleAI = async (type) => {
    const keywords = prompt('Enter keywords for AI generation:');
    if (!keywords) return;
    setAiGenerating(true);
    try {
      const { result } = await generateAI(token, { type, keywords });
      if (type === 'summary') {
        setResume({ ...resume, summary: result });
      } else if (type === 'skills') {
        setResume({ ...resume, skills: result.split(',').map((s) => s.trim()) });
      }
      showToast('AI content generated.');
    } catch (err) {
      showToast('AI generation failed.', 'error');
    }
    setAiGenerating(false);
  };

  if (loading) return <Spinner />;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <Input 
            label="Resume Title" 
            value={resume.title} 
            onChange={(e) => setResume({ ...resume, title: e.target.value })} 
            placeholder="My Professional Resume"
            required
          />
        </div>

        {/* Personal Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Personal Information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Input label="Full Name" value={resume.personal.fullName} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, fullName: e.target.value } })} />
            <Input label="Email" type="email" value={resume.personal.email} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, email: e.target.value } })} />
            <Input label="Phone" value={resume.personal.phone} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, phone: e.target.value } })} />
            <Input label="Address" value={resume.personal.address} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, address: e.target.value } })} />
            <Input label="LinkedIn URL" value={resume.personal.linkedIn} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, linkedIn: e.target.value } })} />
            <Input label="GitHub URL" value={resume.personal.github} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, github: e.target.value } })} />
            <Input label="Portfolio URL" value={resume.personal.portfolio} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, portfolio: e.target.value } })} />
          </div>
        </div>

        {/* Career Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Career Summary</h2>
            <button type="button" disabled={aiGenerating} onClick={() => handleAI('summary')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400">AI Generate</button>
          </div>
          <Textarea value={resume.summary} onChange={(e) => setResume({ ...resume, summary: e.target.value })} placeholder="Describe your professional background..." className="mt-6" rows="4" />
        </div>

        {/* Education */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Education</h2>
          {resume.education.map((edu, i) => (
            <div key={i} className="mt-6 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <Input label="Institution" value={edu.institution} onChange={(e) => { const updated = [...resume.education]; updated[i].institution = e.target.value; setResume({ ...resume, education: updated }); }} />
              <Input label="Degree" value={edu.degree} onChange={(e) => { const updated = [...resume.education]; updated[i].degree = e.target.value; setResume({ ...resume, education: updated }); }} />
              <Input label="Start Date" type="date" value={edu.startDate} onChange={(e) => { const updated = [...resume.education]; updated[i].startDate = e.target.value; setResume({ ...resume, education: updated }); }} />
              <Input label="End Date" type="date" value={edu.endDate} onChange={(e) => { const updated = [...resume.education]; updated[i].endDate = e.target.value; setResume({ ...resume, education: updated }); }} />
              <Textarea label="Description" value={edu.description} onChange={(e) => { const updated = [...resume.education]; updated[i].description = e.target.value; setResume({ ...resume, education: updated }); }} className="sm:col-span-2" rows="3" />
            </div>
          ))}
          <button type="button" onClick={() => setResume({ ...resume, education: [...resume.education, { institution: '', degree: '', startDate: '', endDate: '', description: '' }] })} className="mt-6 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">+ Add Education</button>
        </div>

        {/* Work Experience */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Work Experience</h2>
            <button type="button" disabled={aiGenerating} onClick={() => handleAI('experience')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400">AI Generate</button>
          </div>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mt-6 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <Input label="Company" value={exp.company} onChange={(e) => { const updated = [...resume.experience]; updated[i].company = e.target.value; setResume({ ...resume, experience: updated }); }} />
              <Input label="Role" value={exp.role} onChange={(e) => { const updated = [...resume.experience]; updated[i].role = e.target.value; setResume({ ...resume, experience: updated }); }} />
              <Input label="Start Date" type="date" value={exp.startDate} onChange={(e) => { const updated = [...resume.experience]; updated[i].startDate = e.target.value; setResume({ ...resume, experience: updated }); }} />
              <Input label="End Date" type="date" value={exp.endDate} onChange={(e) => { const updated = [...resume.experience]; updated[i].endDate = e.target.value; setResume({ ...resume, experience: updated }); }} />
              <Textarea label="Description" value={exp.description} onChange={(e) => { const updated = [...resume.experience]; updated[i].description = e.target.value; setResume({ ...resume, experience: updated }); }} className="sm:col-span-2" rows="3" />
            </div>
          ))}
          <button type="button" onClick={() => setResume({ ...resume, experience: [...resume.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }] })} className="mt-6 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">+ Add Experience</button>
        </div>

        {/* Projects */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Projects</h2>
            <button type="button" disabled={aiGenerating} onClick={() => handleAI('project')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400">AI Describe</button>
          </div>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mt-6 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <Input label="Project Name" value={proj.name} onChange={(e) => { const updated = [...resume.projects]; updated[i].name = e.target.value; setResume({ ...resume, projects: updated }); }} />
              <Input label="Project Link" value={proj.link} onChange={(e) => { const updated = [...resume.projects]; updated[i].link = e.target.value; setResume({ ...resume, projects: updated }); }} />
              <Textarea label="Description" value={proj.description} onChange={(e) => { const updated = [...resume.projects]; updated[i].description = e.target.value; setResume({ ...resume, projects: updated }); }} className="sm:col-span-2" rows="3" />
              <Input label="Technologies (comma-separated)" value={proj.technologies?.join(', ')} onChange={(e) => { const updated = [...resume.projects]; updated[i].technologies = e.target.value.split(',').map((t) => t.trim()); setResume({ ...resume, projects: updated }); }} className="sm:col-span-2" />
            </div>
          ))}
          <button type="button" onClick={() => setResume({ ...resume, projects: [...resume.projects, { name: '', description: '', technologies: [], link: '' }] })} className="mt-6 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">+ Add Project</button>
        </div>

        {/* Skills */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Skills</h2>
            <button type="button" disabled={aiGenerating} onClick={() => handleAI('skills')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400">AI Suggest</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white text-sm">
                {skill}
                <button type="button" onClick={() => setResume({ ...resume, skills: resume.skills.filter((_, idx) => idx !== i) })} className="font-bold">×</button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="Add a skill and press add" id="skillInput" className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('skillInput');
                if (input.value.trim()) {
                  setResume({ ...resume, skills: [...resume.skills, input.value.trim()] });
                  input.value = '';
                }
              }}
              className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Languages</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {resume.languages.map((lang, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white text-sm">
                {lang}
                <button type="button" onClick={() => setResume({ ...resume, languages: resume.languages.filter((_, idx) => idx !== i) })} className="font-bold">×</button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="Add a language" id="languageInput" className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('languageInput');
                if (input.value.trim()) {
                  setResume({ ...resume, languages: [...resume.languages, input.value.trim()] });
                  input.value = '';
                }
              }}
              className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Certifications</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {resume.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white text-sm">
                {cert}
                <button type="button" onClick={() => setResume({ ...resume, certifications: resume.certifications.filter((_, idx) => idx !== i) })} className="font-bold">×</button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="Add a certification" id="certInput" className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('certInput');
                if (input.value.trim()) {
                  setResume({ ...resume, certifications: [...resume.certifications, input.value.trim()] });
                  input.value = '';
                }
              }}
              className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Achievements</h2>
          <div className="mt-6 space-y-3">
            {resume.achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <input type="text" value={achievement} onChange={(e) => { const updated = [...resume.achievements]; updated[i] = e.target.value; setResume({ ...resume, achievements: updated }); }} className="flex-1 bg-transparent outline-none" />
                <button type="button" onClick={() => setResume({ ...resume, achievements: resume.achievements.filter((_, idx) => idx !== i) })} className="text-slate-400 hover:text-slate-900">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setResume({ ...resume, achievements: [...resume.achievements, ''] })} className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">+ Add Achievement</button>
        </div>

        {/* Interests */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Interests</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {resume.interests.map((interest, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white text-sm">
                {interest}
                <button type="button" onClick={() => setResume({ ...resume, interests: resume.interests.filter((_, idx) => idx !== i) })} className="font-bold">×</button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="Add an interest" id="interestInput" className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('interestInput');
                if (input.value.trim()) {
                  setResume({ ...resume, interests: [...resume.interests, input.value.trim()] });
                  input.value = '';
                }
              }}
              className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Template Selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <label className="block text-sm font-medium text-slate-700">
            Resume Template
            <select value={resume.template} onChange={(e) => setResume({ ...resume, template: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200">
              <option value="modern">Modern</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
              <option value="minimal">Minimal</option>
              <option value="corporate">Corporate</option>
            </select>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button type="button" onClick={() => navigate('/dashboard')} className="bg-slate-600">Cancel</Button>
          <Button type="submit">Save Resume</Button>
        </div>
      </form>
    </main>
  );
};

export default ResumeBuilderPage;
