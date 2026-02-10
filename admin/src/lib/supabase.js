import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zhlldovnjbfyznyrvwma.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobGxkb3ZuamJmeXpueXJ2d21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDg5MDcsImV4cCI6MjA4NTgyNDkwN30.lzljjCLKrph6ZXN_VZycVfYHHN90yMljwwreoFULsMQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
