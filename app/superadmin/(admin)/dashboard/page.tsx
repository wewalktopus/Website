'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Bell, TrendingUp, FileText, UserCheck, UserX, Send, PenLine } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import type { LeadStatus } from '@/types';

interface Analytics {
  stats: {
    totalLeads: number;
    newLeads: number;
    convertedLeads: number;
    contactedLeads: number;
    closedLeads: number;
    activeSubscribers: number;
    publishedBlogs: number;
    emailsSentToday: number;
    emailDailyLimit: number;
    leadsByType: { business: number; individual: number };
  };
  recentLeads: {
    id: string;
    name: string;
    email: string;
    type: string;
    status: LeadStatus;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const s = data?.stats;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Leads" value={s?.totalLeads ?? 0} icon={Users} color="orange" />
        <StatsCard title="New Leads" value={s?.newLeads ?? 0} icon={UserCheck} color="blue" subtitle="Awaiting contact" />
        <StatsCard title="Converted" value={s?.convertedLeads ?? 0} icon={TrendingUp} color="green" />
        <StatsCard title="Subscribers" value={s?.activeSubscribers ?? 0} icon={Bell} color="purple" subtitle="Active newsletter" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Emails Sent Today"
          value={`${s?.emailsSentToday ?? 0} / ${s?.emailDailyLimit ?? 100}`}
          icon={Send}
          color="orange"
          subtitle="Daily campaign cap"
        />
        <StatsCard title="Contacted" value={s?.contactedLeads ?? 0} icon={Send} color="blue" />
        <StatsCard title="Closed" value={s?.closedLeads ?? 0} icon={UserX} color="red" />
        <StatsCard title="Published Blogs" value={s?.publishedBlogs ?? 0} icon={PenLine} color="purple" />
        <StatsCard title="B2B / Individual" value={`${s?.leadsByType.business ?? 0} / ${s?.leadsByType.individual ?? 0}`} icon={FileText} color="orange" />
      </div>

      {/* Recent Leads */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
          <Link
            href="/superadmin/leads"
            className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>

        {!data?.recentLeads?.length ? (
          <div className="px-6 py-10 text-center text-gray-500 text-sm">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{lead.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold uppercase ${lead.type === 'business' ? 'text-orange-400' : 'text-blue-400'}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/superadmin/leads', label: 'Manage Leads', icon: Users, color: 'text-orange-400' },
            { href: '/superadmin/emails', label: 'Send Email', icon: Send, color: 'text-blue-400' },
            { href: '/superadmin/blogs', label: 'Write Blog', icon: PenLine, color: 'text-purple-400' },
            { href: '/superadmin/subscribers', label: 'Subscribers', icon: Bell, color: 'text-green-400' },
          ].map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl text-center transition-colors group"
            >
              <action.icon size={22} className={`${action.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs font-medium text-gray-300">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
