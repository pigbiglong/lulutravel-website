import { useOrders } from '../../hooks/useOrders'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'

export default function SalesChart() {
  const { data: orders } = useOrders()

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return format(date, 'MM-dd')
  })

  const chartData = last7Days.map((day) => {
    const dayOrders = orders?.filter((order) => {
      const orderDate = format(new Date(order.created_at), 'MM-dd')
      return orderDate === day
    }) || []

    return {
      date: day,
      orders: dayOrders.length,
      revenue: dayOrders.reduce((sum, o) => sum + (o.price || 0), 0),
    }
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold mb-4">近7天订单趋势</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
              formatter={(value, name) => [
                name === 'revenue' ? `¥${value.toLocaleString()}` : value,
                name === 'revenue' ? '销售额' : '订单数'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#4A7C59" 
              strokeWidth={2}
              dot={{ fill: '#4A7C59' }}
              name="orders"
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#C4A77D" 
              strokeWidth={2}
              dot={{ fill: '#C4A77D' }}
              name="revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-bamboo"></div>
          <span className="text-sm text-gray-500">订单数</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-wood"></div>
          <span className="text-sm text-gray-500">销售额</span>
        </div>
      </div>
    </div>
  )
}
