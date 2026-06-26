import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage = () => {
  const { login, showToast } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(values);
      showToast('Logged in successfully.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to login.');
      showToast('Login failed.', 'error');
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Login to your account</h1>
        <p className="mt-2 text-sm text-slate-600">Use your email and password to continue.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input label="Email" id="email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@example.com" required />
          <Input label="Password" id="password" name="password" type="password" value={values.password} onChange={handleChange} placeholder="Enter your password" required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit">Login</Button>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          New here? <Link to="/register" className="font-semibold text-slate-900">Create account</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
