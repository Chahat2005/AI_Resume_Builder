import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchRecentResumes, fetchStats, fetchResumes, deleteResume, duplicateResume } from '../services/resumeService';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const DashboardPage = () => {
  const { token, showToast } = useAuth();
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadResumes = async () => {
    setLoading(true);
    const [statsData, resumeData] = await Promise.all([fetchStats(token), fetchResumes(token, { search, sort })]);
    setStats(statsData);
    setResumes(resumeData);
    setLoading(false);
  };

  useEffect(() => {
    loadResumes();
  }, [search, sort]);

  const handleDelete = async (id) => {
    await deleteResume(token, id);
    showToast('Resume deleted.');
    loadResumes();
  };

  const handleDuplicate = async (id) => {
    await duplicateResume(token, id);
    showToast('Resume duplicated.');
    loadResumes();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Manage your resume collection and generate new professional resumes.</p>
        </div>
        <Button onClick={() => navigate('/resumes/new')}>Create New Resume</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total resumes</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Recent updates</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {stats.recent.length === 0 ? <li>No recent resumes yet.</li> : stats.recent.map((item) => <li key={item._id}>{item.title}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Resume flow</p>
          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold text-slate-900">Search, edit, preview, share.</p>
            <p className="text-sm text-slate-600">Sort by creation date or recent update for faster access.</p>
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resumes by title"
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
            />
          </div>
          <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="updated">Recently Updated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="space-y-4">
            {resumes.length === 0 ? (
              <p className="text-sm text-slate-600">No resumes found. Create one to get started.</p>
            ) : (
              resumes.map((resume) => (
                <div key={resume._id} className="rounded-3xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{resume.title}</h2>
                      <p className="mt-2 text-sm text-slate-600">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button className="bg-slate-900" onClick={() => navigate(`/resumes/preview/${resume._id}`)}>Preview</Button>
                      <Button className="bg-slate-900" onClick={() => navigate(`/resumes/edit/${resume._id}`)}>Edit</Button>
                      <Button className="bg-slate-900" onClick={() => handleDuplicate(resume._id)}>Duplicate</Button>
                      <button onClick={() => handleDelete(resume._id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
