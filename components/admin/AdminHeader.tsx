'use client';

import { usePathname } from 'next/navigation';

const TITLES: Record<string, string> = {
  '/superadmin/dashboard': 'Dashboard',
  '/superadmin/analytics': 'Analytics',
  '/superadmin/leads': 'Leads',
  '/superadmin/subscribers': 'Newsletter Subscribers',
  '/superadmin/pricing': 'Pricing & Services',
  '/superadmin/emails': 'Email Campaigns',
  '/superadmin/emails/templates': 'Email Templates',
  '/superadmin/blogs': 'Blog Posts',
  '/superadmin/admins': 'Admin Users',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? 'Admin Panel';

  return (
    <header className="sticky top-0 z-30 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center gap-4">
      {/* Spacer for mobile menu button */}
      <div className="lg:hidden w-8" />
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </header>
  );
}
