import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Package, 
  LogOut 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { clsx } from 'clsx'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: '概览' },
  { to: '/orders', icon: ClipboardList, label: '订单管理' },
  { to: '/customers', icon: Users, label: '客户管理' },
  { to: '/products', icon: Package, label: '产品管理' },
]

export default function Sidebar() {
  const { signOut, user } = useAuth()

  return (
    <aside className="w-64 bg-forest text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-semibold">lulutravel</h1>
        <p className="text-sm text-white/60 mt-1">商户后台</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  )
}
