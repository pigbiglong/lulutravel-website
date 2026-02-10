import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuth()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] State changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAdmin(false)
        setLoading(false)
      } else if (session?.user) {
        setUser(session.user)
        checkAdminStatus(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('[Auth] Initial session:', session?.user?.email)
      
      if (session?.user) {
        setUser(session.user)
        await checkAdminStatus(session.user.id)
      }
    } catch (error) {
      console.error('[Auth] Check error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function checkAdminStatus(userId) {
    console.log('[Auth] Checking admin status for:', userId)
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, role, name')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        console.error('[Auth] Admin check error:', error)
        setIsAdmin(false)
        return false
      }
      
      console.log('[Auth] Admin data:', data)
      const adminStatus = !!data
      setIsAdmin(adminStatus)
      return adminStatus
    } catch (error) {
      console.error('[Auth] Admin check exception:', error)
      setIsAdmin(false)
      return false
    }
  }

  async function signIn(email, password) {
    setError(null)
    console.log('[Auth] Signing in:', email)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('[Auth] Sign in error:', error)
      setError(error.message)
      throw error
    }
    
    console.log('[Auth] Sign in success:', data.user?.email)
    setUser(data.user)
    
    // 立即检查管理员状态
    const adminStatus = await checkAdminStatus(data.user.id)
    console.log('[Auth] Is admin:', adminStatus)
    
    if (!adminStatus) {
      throw new Error('您的账户不是管理员，无法访问后台')
    }
    
    return data
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setIsAdmin(false)
  }

  return { user, isAdmin, loading, error, signIn, signOut }
}
