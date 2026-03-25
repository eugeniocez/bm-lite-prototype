export default function PhoneInput({ value, onChange, className = '' }) {
  const handleChange = (e) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10)
    onChange(clean)
  }

  return (
    <div className={`flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden focus-within:border-gray-900 dark:focus-within:border-gray-400 transition-all ${className}`}>
      <div className="flex items-center gap-1.5 px-3.5 py-3.5 border-r border-gray-200 dark:border-gray-700 shrink-0 select-none">
        <span className="text-base leading-none">🇲🇽</span>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">+52</span>
      </div>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder="10 dígitos"
        className="flex-1 px-3.5 py-3.5 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 bg-transparent focus:outline-none"
      />
    </div>
  )
}