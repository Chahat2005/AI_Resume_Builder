const Button = ({ type = 'button', children, className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
