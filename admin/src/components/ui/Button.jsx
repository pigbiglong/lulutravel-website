import { forwardRef } from 'react'
import { clsx } from 'clsx'

const variants = {
  primary: 'bg-forest text-white hover:bg-opacity-90',
  secondary: 'bg-white text-forest border border-forest hover:bg-forest hover:text-white',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent hover:bg-gray-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
