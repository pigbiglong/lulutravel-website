import { clsx } from 'clsx'

export default function Table({ children, className }) {
  return (
    <div className="overflow-x-auto">
      <table className={clsx('min-w-full divide-y divide-gray-200', className)}>
        {children}
      </table>
    </div>
  )
}

Table.Head = function TableHead({ children, className }) {
  return (
    <thead className={clsx('bg-gray-50', className)}>
      {children}
    </thead>
  )
}

Table.Body = function TableBody({ children, className }) {
  return (
    <tbody className={clsx('bg-white divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  )
}

Table.Row = function TableRow({ children, className, onClick }) {
  return (
    <tr 
      className={clsx(
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

Table.Cell = function TableCell({ children, className, header = false }) {
  const Component = header ? 'th' : 'td'
  return (
    <Component className={clsx(
      'px-6 py-4 whitespace-nowrap text-sm',
      header ? 'font-medium text-gray-500 text-left' : 'text-gray-900',
      className
    )}>
      {children}
    </Component>
  )
}
