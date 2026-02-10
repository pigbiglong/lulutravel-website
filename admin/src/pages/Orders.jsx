import { useState } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Download, RefreshCw } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import { useOrders, useUpdateOrderStatus } from '../hooks/useOrders'

const statusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待处理' },
  { value: 'confirmed', label: '已确认' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
]

const statusLabels = {
  pending: '待处理',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消',
}

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState('all')
  const { data: orders, isLoading, error, refetch } = useOrders({ status: statusFilter })
  const updateStatus = useUpdateOrderStatus()

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus })
    } catch (error) {
      alert('更新失败: ' + error.message)
    }
  }

  const exportCSV = () => {
    if (!orders?.length) return
    
    const headers = ['订单ID', '产品名称', '联系人', '邮箱', '电话', '金额', '状态', '创建时间']
    const rows = orders.map(o => [
      o.id.slice(0, 8),
      o.tour_name,
      o.contact_name || '-',
      o.contact_email || '-',
      o.contact_phone || '-',
      o.price || 0,
      statusLabels[o.status],
      format(new Date(o.created_at), 'yyyy-MM-dd HH:mm'),
    ])
    
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  return (
    <div>
      <Header title="订单管理" />
      
      <div className="p-6">
        <Card>
          <Card.Header>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-40"
                />
                <Button variant="ghost" onClick={() => refetch()}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="secondary" onClick={exportCSV} disabled={!orders?.length}>
                <Download className="w-4 h-4 mr-2" />
                导出 CSV
              </Button>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">加载中...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                加载失败: {error.message}
              </div>
            ) : orders?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">暂无订单数据</div>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell header>订单ID</Table.Cell>
                    <Table.Cell header>产品</Table.Cell>
                    <Table.Cell header>联系人</Table.Cell>
                    <Table.Cell header>金额</Table.Cell>
                    <Table.Cell header>状态</Table.Cell>
                    <Table.Cell header>创建时间</Table.Cell>
                    <Table.Cell header>操作</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {orders?.map((order) => (
                    <Table.Row key={order.id}>
                      <Table.Cell className="font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <p className="font-medium">{order.tour_name}</p>
                          {order.tour_route && (
                            <p className="text-gray-500 text-sm">{order.tour_route}</p>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <p>{order.contact_name || '-'}</p>
                          <p className="text-gray-500 text-sm">{order.contact_email || '-'}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="font-medium">
                        ¥{(order.price || 0).toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge status={order.status}>{statusLabels[order.status]}</Badge>
                      </Table.Cell>
                      <Table.Cell className="text-gray-500">
                        {format(new Date(order.created_at), 'MM-dd HH:mm', { locale: zhCN })}
                      </Table.Cell>
                      <Table.Cell>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
