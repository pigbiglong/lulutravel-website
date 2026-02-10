import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useRecentOrders } from '../../hooks/useOrders'
import Badge from '../ui/Badge'
import { Link } from 'react-router-dom'

export default function RecentOrders() {
  const { data: orders, isLoading } = useRecentOrders(5)

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">加载中...</div>
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold">近期订单</h3>
        <Link to="/orders" className="text-sm text-forest hover:underline">
          查看全部
        </Link>
      </div>
      <div className="divide-y divide-gray-100">
        {orders?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">暂无订单</div>
        ) : (
          orders?.map((order) => (
            <div key={order.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{order.tour_name}</p>
                <p className="text-sm text-gray-500">
                  {order.contact_name || '未知客户'} · {format(new Date(order.created_at), 'MM-dd HH:mm', { locale: zhCN })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">¥{(order.price || 0).toLocaleString()}</p>
                <Badge status={order.status}>
                  {order.status === 'pending' && '待处理'}
                  {order.status === 'confirmed' && '已确认'}
                  {order.status === 'completed' && '已完成'}
                  {order.status === 'cancelled' && '已取消'}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
