const Select = ({ label, id, value, onChange, options = [], className = '', ...props }) => {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
