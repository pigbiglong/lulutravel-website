import { clsx } from 'clsx'

export default function StatsCard({ title, value, icon: Icon, trend, color = 'forest' }) {
  const colors = {
    forest: 'bg-forest',
    bamboo: 'bg-bamboo',
    wood: 'bg-wood',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={clsx(
              'text-sm mt-2',
              trend > 0 ? 'text-green-500' : 'text-red-500'
            )}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% 较上周
            </p>
          )}
        </div>
        <div className={clsx('p-3 rounded-xl', colors[color])}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
