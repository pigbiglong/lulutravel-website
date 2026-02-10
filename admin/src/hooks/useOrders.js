import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useOrders(filters = {}) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: async () => {
      console.log('[useOrders] Fetching orders with filters:', filters)
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }
      if (filters.search) {
        query = query.ilike('tour_name', `%${filters.search}%`)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('[useOrders] Error:', error)
        throw error
      }
      
      console.log('[useOrders] Fetched orders:', data?.length, data)
      return data
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}

export function useOrderStats() {
  return useQuery({
    queryKey: ['orderStats'],
    queryFn: async () => {
      console.log('[useOrderStats] Fetching stats')
      
      const { data: orders, error } = await supabase
        .from('orders')
        .select('id, status, price')
      
      if (error) {
        console.error('[useOrderStats] Error:', error)
        throw error
      }
      
      const stats = {
        total: orders?.length || 0,
        pending: orders?.filter(o => o.status === 'pending').length || 0,
        confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
        completed: orders?.filter(o => o.status === 'completed').length || 0,
        cancelled: orders?.filter(o => o.status === 'cancelled').length || 0,
        revenue: orders?.filter(o => ['confirmed', 'completed'].includes(o.status))
          .reduce((sum, o) => sum + (o.price || 0), 0) || 0,
      }
      
      console.log('[useOrderStats] Stats:', stats)
      return stats
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
      queryClient.invalidateQueries(['orderStats'])
    }
  })
}

export function useRecentOrders(limit = 5) {
  return useQuery({
    queryKey: ['recentOrders', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}
