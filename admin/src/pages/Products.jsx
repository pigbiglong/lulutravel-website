import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts'

const categoryOptions = [
  { value: 'classic', label: '经典之旅' },
  { value: 'culinary', label: '美食之旅' },
  { value: 'nature', label: '自然风光' },
  { value: 'custom', label: '定制路线' },
]

const categoryLabels = {
  classic: '经典之旅',
  culinary: '美食之旅',
  nature: '自然风光',
  custom: '定制路线',
}

const defaultForm = {
  name: '',
  description: '',
  route: '',
  icon: '🏛️',
  base_price: 0,
  days: 7,
  category: 'classic',
  is_active: true,
}

export default function Products() {
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(defaultForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const { data: products, isLoading } = useProducts()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const openCreateModal = () => {
    setFormData(defaultForm)
    setEditingProduct(null)
    setShowModal(true)
  }

  const openEditModal = (product) => {
    setFormData(product)
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, ...formData })
      } else {
        await createProduct.mutateAsync(formData)
      }
      setShowModal(false)
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct.mutateAsync(id)
      setDeleteConfirm(null)
    } catch (error) {
      alert('删除失败: ' + error.message)
    }
  }

  return (
    <div>
      <Header title="产品管理" />
      
      <div className="p-6">
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">产品列表</h3>
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                添加产品
              </Button>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">加载中...</div>
            ) : products?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">暂无产品数据</div>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell header>图标</Table.Cell>
                    <Table.Cell header>产品名称</Table.Cell>
                    <Table.Cell header>路线</Table.Cell>
                    <Table.Cell header>分类</Table.Cell>
                    <Table.Cell header>天数</Table.Cell>
                    <Table.Cell header>价格</Table.Cell>
                    <Table.Cell header>状态</Table.Cell>
                    <Table.Cell header>操作</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {products?.map((product) => (
                    <Table.Row key={product.id}>
                      <Table.Cell className="text-2xl">{product.icon}</Table.Cell>
                      <Table.Cell className="font-medium">{product.name}</Table.Cell>
                      <Table.Cell className="text-gray-500">{product.route || '-'}</Table.Cell>
                      <Table.Cell>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {categoryLabels[product.category]}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{product.days} 天</Table.Cell>
                      <Table.Cell className="font-medium">
                        ¥{product.base_price?.toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={product.is_active ? 'success' : 'default'}>
                          {product.is_active ? '上架' : '下架'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => openEditModal(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setDeleteConfirm(product)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? '编辑产品' : '添加产品'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="产品名称"
              value={formData.name}
              onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
              required
            />
            <Select
              label="分类"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => setFormData(f => ({ ...f, category: e.target.value }))}
            />
          </div>
          <Input
            label="路线"
            value={formData.route}
            onChange={(e) => setFormData(f => ({ ...f, route: e.target.value }))}
            placeholder="北京-西安-上海"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="图标"
              value={formData.icon}
              onChange={(e) => setFormData(f => ({ ...f, icon: e.target.value }))}
            />
            <Input
              label="天数"
              type="number"
              value={formData.days}
              onChange={(e) => setFormData(f => ({ ...f, days: parseInt(e.target.value) || 1 }))}
            />
            <Input
              label="基础价格"
              type="number"
              value={formData.base_price}
              onChange={(e) => setFormData(f => ({ ...f, base_price: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(f => ({ ...f, is_active: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest"
            />
            <label htmlFor="is_active" className="text-sm">上架销售</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
              取消
            </Button>
            <Button type="submit">
              {editingProduct ? '保存修改' : '创建产品'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="确认删除"
        size="sm"
      >
        <p className="text-gray-600 mb-6">
          确定要删除产品「{deleteConfirm?.name}」吗？此操作无法撤销。
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
            取消
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirm?.id)}>
            确认删除
          </Button>
        </div>
      </Modal>
    </div>
  )
}
