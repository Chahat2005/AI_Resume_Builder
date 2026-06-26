import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          AI Resume Builder
        </Link>
        <div className="flex items-center gap-3 text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Home</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Dashboard</NavLink>
              <NavLink to="/templates" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Templates</NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Profile</NavLink>
              <button onClick={() => { logout(); navigate('/login'); }} className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600'}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
