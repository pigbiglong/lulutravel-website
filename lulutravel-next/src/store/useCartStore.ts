import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, guests: number, date?: string, addons?: string[]) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, guests: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, guests, date, addons = []) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === product.id
                  ? { ...item, guests: item.guests + guests }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, product, guests, date, addons }],
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId),
        }));
      },
      
      updateQuantity: (productId, guests) => {
        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId ? { ...item, guests } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      total: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.guests, 0);
      },
    }),
    {
      name: 'lulutravel-cart',
    }
  )
);
