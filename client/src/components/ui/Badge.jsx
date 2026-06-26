const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-900',
    success: 'bg-green-100 text-green-900',
    error: 'bg-red-100 text-red-900',
    warning: 'bg-yellow-100 text-yellow-900',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
