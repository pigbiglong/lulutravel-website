import { useOrderStats } from '../../hooks/useOrders'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = {
  pending: '#EAB308',
  confirmed: '#3B82F6',
  completed: '#22C55E',
  cancelled: '#EF4444',
}

export default function StatusChart() {
  const { data: stats } = useOrderStats()

  const chartData = [
    { name: '待处理', value: stats?.pending || 0, color: COLORS.pending },
    { name: '已确认', value: stats?.confirmed || 0, color: COLORS.confirmed },
    { name: '已完成', value: stats?.completed || 0, color: COLORS.completed },
    { name: '已取消', value: stats?.cancelled || 0, color: COLORS.cancelled },
  ].filter(item => item.value > 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold mb-4">订单状态分布</h3>
      <div className="h-64">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            暂无数据
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
