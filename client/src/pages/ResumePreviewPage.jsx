import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchResume } from '../services/resumeService';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const ResumePreviewPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchResume(token, id);
      setResume(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <Spinner />;
  if (!resume) return <p>Resume not found.</p>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap gap-3">
        <Button onClick={() => navigate(`/resumes/edit/${id}`)}>Edit Resume</Button>
        <Button onClick={() => window.print()} className="bg-slate-600">Download PDF</Button>
        <Button onClick={() => navigate('/dashboard')} className="bg-slate-600">Back to Dashboard</Button>
      </div>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-12 shadow-soft print:border-0 print:shadow-none">
        {/* Header */}
        <div className="border-b-2 border-slate-300 pb-6">
          <h1 className="text-4xl font-bold text-slate-900">{resume.personal.fullName || 'Your Name'}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            {resume.personal.email && <p>📧 {resume.personal.email}</p>}
            {resume.personal.phone && <p>📞 {resume.personal.phone}</p>}
            {resume.personal.address && <p>📍 {resume.personal.address}</p>}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {resume.personal.linkedIn && <a href={resume.personal.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">LinkedIn</a>}
            {resume.personal.github && <a href={resume.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">GitHub</a>}
            {resume.personal.portfolio && <a href={resume.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Portfolio</a>}
          </div>
        </div>

        {/* Professional Summary */}
        {resume.summary && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Professional Summary</h2>
            <p className="mt-4 text-slate-700 leading-relaxed text-justify">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
            {resume.experience.map((exp, i) => (
              <div key={i} className="mt-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-slate-900">{exp.role}</h3>
                  {exp.startDate && exp.endDate && <p className="text-sm text-slate-600">{exp.startDate} - {exp.endDate}</p>}
                </div>
                <p className="text-sm text-slate-700 italic">{exp.company}</p>
                {exp.description && <p className="mt-2 text-slate-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Education</h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="mt-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-slate-900">{edu.degree}</h3>
                  {edu.startDate && edu.endDate && <p className="text-sm text-slate-600">{edu.startDate} - {edu.endDate}</p>}
                </div>
                <p className="text-sm text-slate-700">{edu.institution}</p>
                {edu.description && <p className="mt-2 text-slate-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="mt-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">{proj.name}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">View Project</a>}
                </div>
                {proj.description && <p className="mt-2 text-slate-700">{proj.description}</p>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="mt-2 text-sm text-slate-600">
                    <strong>Technologies:</strong> {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {resume.skills.map((skill, i) => (
                <span key={i} className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Languages</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {resume.languages.map((lang, i) => (
                <span key={i} className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
            <ul className="mt-4 space-y-2">
              {resume.certifications.map((cert, i) => (
                <li key={i} className="text-slate-700">• {cert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {resume.achievements && resume.achievements.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
            <ul className="mt-4 space-y-2">
              {resume.achievements.map((achievement, i) => (
                <li key={i} className="text-slate-700">• {achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {resume.interests && resume.interests.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">Interests</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {resume.interests.map((interest, i) => (
                <span key={i} className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResumePreviewPage;
