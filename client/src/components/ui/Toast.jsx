import { useAuth } from '../../context/AuthContext';

const Toast = () => {
  const { toast } = useAuth();

  if (!toast.visible) return null;

  return (
    <div className="fixed right-4 top-20 z-50 max-w-xs rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-soft">
      <p className="text-sm font-semibold text-slate-900">{toast.type === 'error' ? 'Error' : 'Success'}</p>
      <p className="mt-2 text-sm text-slate-700">{toast.message}</p>
    </div>
  );
};

export default Toast;
