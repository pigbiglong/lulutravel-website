import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Select = forwardRef(({ label, options = [], error, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg bg-white transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent',
          error ? 'border-red-500' : 'border-gray-200',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
