import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { RefreshCw } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useCustomers } from '../hooks/useCustomers'
import { useState } from 'react'

export default function Customers() {
  const [search, setSearch] = useState('')
  const { data: customers, isLoading, error, refetch } = useCustomers()

  const filteredCustomers = customers?.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  return (
    <div>
      <Header title="客户管理" />
      
      <div className="p-6">
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">客户列表 ({customers?.length || 0})</h3>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="搜索客户..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64"
                />
                <Button variant="ghost" onClick={() => refetch()}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">加载中...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                加载失败: {error.message}
              </div>
            ) : filteredCustomers?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">暂无客户数据</div>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell header>客户姓名</Table.Cell>
                    <Table.Cell header>邮箱</Table.Cell>
                    <Table.Cell header>电话</Table.Cell>
                    <Table.Cell header>注册时间</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {filteredCustomers?.map((customer) => (
                    <Table.Row key={customer.id}>
                      <Table.Cell className="font-medium">
                        {customer.name || '-'}
                      </Table.Cell>
                      <Table.Cell>{customer.email || '-'}</Table.Cell>
                      <Table.Cell>{customer.phone || '-'}</Table.Cell>
                      <Table.Cell className="text-gray-500">
                        {format(new Date(customer.created_at), 'yyyy-MM-dd', { locale: zhCN })}
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
