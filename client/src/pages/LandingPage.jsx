import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white inline-block">AI Resume Builder</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Build professional resumes faster with AI.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Generate modern resume content, manage templates, and download print-ready PDFs using a clean and secure MERN workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Get Started</Link>
            <Link to="/templates" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">View Templates</Link>
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-700 to-slate-950 p-10 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Modern features</p>
          <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-200">
            <li>- AI-powered summary, skills, and descriptions</li>
            <li>- Resume templates with instant previews</li>
            <li>- Secure JWT auth and profile management</li>
            <li>- Save, edit, duplicate, and preview resumes</li>
            <li>- Download print-ready PDF resumes</li>
          </ul>
        </div>
      </section>
      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {['Responsive layout', 'Clean design', 'Secure auth', 'AI drafting', 'Download PDF', 'Modern templates'].map((item) => (
          <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="font-semibold text-slate-900">{item}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
