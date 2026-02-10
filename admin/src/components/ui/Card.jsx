import { clsx } from 'clsx'

export default function Card({ children, className, ...props }) {
  return (
    <div 
      className={clsx('bg-white rounded-xl shadow-sm border border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className }) {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  )
}
