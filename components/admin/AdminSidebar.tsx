'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Mail,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PenLine,
  Send,
  Bell,
  Shield,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import type { AdminSession } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  children?: { label: string; href: string }[];
}

const NAV: NavItem[] = [
  { label: 'Dashboard', href: '/superadmin/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', href: '/superadmin/analytics', icon: TrendingUp },
  { label: 'Leads', href: '/superadmin/leads', icon: Users },
  { label: 'Subscribers', href: '/superadmin/subscribers', icon: Bell },
  {
    label: 'Email',
    href: '/superadmin/emails',
    icon: Send,
    children: [
      { label: 'Compose & Send', href: '/superadmin/emails' },
      { label: 'Templates', href: '/superadmin/emails/templates' },
    ],
  },
  { label: 'Blogs', href: '/superadmin/blogs', icon: PenLine },
  { label: 'Admin Users', href: '/superadmin/admins', icon: Shield, roles: ['superadmin'] },
];

interface Props {
  admin: AdminSession;
}

export function AdminSidebar({ admin }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [emailExpanded, setEmailExpanded] = useState(
    pathname.startsWith('/superadmin/emails')
  );

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/superadmin');
  };

  const roleColor: Record<string, string> = {
    superadmin: 'border border-orange-500/30 bg-orange-500/25 text-orange-100!',
    moderator: 'border border-blue-500/30 bg-blue-500/25 text-blue-100!',
    viewer: 'border border-white/10 bg-gray-500/25 text-gray-100!',
  };

  const activeItemClass = 'bg-[#F7F4EA]! text-[#111111]! shadow-[inset_3px_0_0_0_#EF4D30] ring-1 ring-[#EF4D30]';
  const inactiveItemClass = 'text-[#F7F4EA]! hover:text-[#FFFFFF]! hover:bg-white/10!';

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <Link href="/superadmin/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">Walktopus</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-orange-500 text-white uppercase tracking-widest">
              Admin
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/superadmin/dashboard" className="mx-auto">
            <span className="text-xl font-bold text-orange-400">W</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md text-[#F7F4EA]! hover:text-white! hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Admin info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-sm font-semibold text-white truncate">{admin.name}</p>
          <p className="text-xs text-[#D9D2BF]! truncate">{admin.email}</p>
          <span className={`mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${roleColor[admin.role] ?? 'bg-gray-500/20 text-gray-400'}`}>
            {admin.role}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV.filter(item => !item.roles || item.roles.includes(admin.role)).map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => setEmailExpanded(e => !e)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? activeItemClass
                      : inactiveItemClass
                  }`}
                >
                  <Icon size={18} className={`shrink-0 ${isActive ? 'text-[#EF4D30]!' : 'text-[#F7F4EA]!'} `} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left text-inherit!">{item.label}</span>
                      <ChevronRight
                        size={14}
                        className={`text-inherit! transition-transform ${emailExpanded ? 'rotate-90' : ''}`}
                      />
                    </>
                  )}
                </button>
                {!collapsed && emailExpanded && (
                  <div className="ml-9 mt-0.5 space-y-0.5">
                    {item.children!.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          pathname === child.href
                            ? 'bg-[#FFF4E8]! text-[#111111]! ring-1 ring-[#EF4D30]'
                            : 'text-[#F7F4EA]! hover:text-white! hover:bg-white/10!'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? activeItemClass
                  : inactiveItemClass
              }`}
            >
              <Icon size={18} className={`shrink-0 ${isActive ? 'text-[#EF4D30]!' : 'text-[#F7F4EA]!'} `} />
              {!collapsed && <span className="text-inherit!">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#F7F4EA]! hover:text-red-200! hover:bg-red-500/12 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-[#111111] border-r border-white/10 transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-[#111111] border border-white/15 text-white! shadow-lg shadow-black/20"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 bg-[#111111] border-r border-white/10 flex flex-col h-full">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-[#F7F4EA]! hover:text-white!"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
