import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const RegisterPage = () => {
  const { register, showToast } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(values);
      showToast('Account created successfully.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to register.');
      showToast('Registration failed.', 'error');
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600">Register with your details and start building resumes.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input label="Full Name" id="name" name="name" value={values.name} onChange={handleChange} placeholder="John Doe" required />
          <Input label="Email" id="email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@example.com" required />
          <Input label="Password" id="password" name="password" type="password" value={values.password} onChange={handleChange} placeholder="Create a secure password" required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit">Register</Button>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-slate-900">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
