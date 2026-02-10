import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      console.log('[useCustomers] Fetching customers')
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('[useCustomers] Error:', error)
        throw error
      }
      
      console.log('[useCustomers] Fetched:', data?.length, data)
      return data || []
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}

export function useCustomerStats() {
  return useQuery({
    queryKey: ['customerStats'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
      
      if (error) throw error
      return { total: count || 0 }
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}
