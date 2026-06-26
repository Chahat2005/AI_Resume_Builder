import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-slate-900">404</h1>
        <p className="mt-4 text-lg font-semibold text-slate-900">This page does not exist.</p>
        <p className="mt-2 text-slate-600">Check the URL or navigate back to the home page.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Go home</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
