import { ClipboardList, Users, DollarSign, TrendingUp, RefreshCw } from 'lucide-react'
import Header from '../components/layout/Header'
import StatsCard from '../components/dashboard/StatsCard'
import SalesChart from '../components/dashboard/SalesChart'
import StatusChart from '../components/dashboard/StatusChart'
import RecentOrders from '../components/dashboard/RecentOrders'
import { useOrderStats } from '../hooks/useOrders'
import { useCustomerStats } from '../hooks/useCustomers'
import Button from '../components/ui/Button'

export default function Dashboard() {
  const { data: orderStats, isLoading: orderLoading, refetch: refetchOrders } = useOrderStats()
  const { data: customerStats, refetch: refetchCustomers } = useCustomerStats()

  const handleRefresh = () => {
    refetchOrders()
    refetchCustomers()
  }

  return (
    <div>
      <Header title="数据概览" />
      
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="总订单数"
            value={orderStats?.total || 0}
            icon={ClipboardList}
            color="forest"
          />
          <StatsCard
            title="客户数量"
            value={customerStats?.total || 0}
            icon={Users}
            color="bamboo"
          />
          <StatsCard
            title="总收入"
            value={`¥${(orderStats?.revenue || 0).toLocaleString()}`}
            icon={DollarSign}
            color="wood"
          />
          <StatsCard
            title="待处理订单"
            value={orderStats?.pending || 0}
            icon={TrendingUp}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SalesChart />
          <StatusChart />
        </div>

        <RecentOrders />
      </div>
    </div>
  )
}
