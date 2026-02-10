import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isInitialized: false,

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            set({
              user: {
                id: session.user.id,
                email: session.user.email || '',
                name: profile?.name || session.user.email?.split('@')[0] || 'User',
                phone: profile?.phone,
              },
              isInitialized: true,
            });
          } else {
            set({ user: null, isInitialized: true });
          }

          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              set({
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: profile?.name || session.user.email?.split('@')[0] || 'User',
                  phone: profile?.phone,
                },
              });
            } else if (event === 'SIGNED_OUT') {
              set({ user: null });
            }
          });
        } catch {
          set({ user: null, isInitialized: true });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({
              user: {
                id: data.user.id,
                email: data.user.email || '',
                name: profile?.name || data.user.email?.split('@')[0] || 'User',
                phone: profile?.phone,
              },
              isLoading: false,
            });
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Login failed' };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: 'An unexpected error occurred' };
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
              },
            },
          });

          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user) {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              name,
              email,
            });

            set({
              user: {
                id: data.user.id,
                email: data.user.email || '',
                name,
              },
              isLoading: false,
            });
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Signup failed' };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: 'An unexpected error occurred' };
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },

      setUser: (user) => set({ user, isLoading: false }),
    }),
    {
      name: 'lulutravel-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
