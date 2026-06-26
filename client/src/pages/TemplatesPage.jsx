import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const templateList = [
  { id: 'modern', title: 'Modern', description: 'Bold contrast, sleek layout, professional visuals.' },
  { id: 'professional', title: 'Professional', description: 'Clean structure with polished typography.' },
  { id: 'creative', title: 'Creative', description: 'Colorful blocks and expressive resume sections.' },
  { id: 'minimal', title: 'Minimal', description: 'Subtle layout that highlights essential details.' },
  { id: 'corporate', title: 'Corporate', description: 'Formal design with conservative branding.' },
];

const TemplatesPage = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Resume templates</h1>
        <p className="mt-3 text-slate-600">Choose a template style and start building a resume instantly.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {templateList.map((template) => (
          <div key={template.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="h-48 rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-xl font-semibold">{template.title}</p>
              <p className="mt-3 text-sm text-slate-200">{template.description}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={() => navigate('/resumes/new')} className="bg-slate-900">Use this template</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TemplatesPage;
