'use client';

import { useEffect, useState } from 'react';
import { Users, TrendingUp, Bell, PenLine, UserCheck, UserX, Send, RefreshCw } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import type { LeadStatus } from '@/types';

interface AnalyticsData {
  stats: {
    totalLeads: number;
    newLeads: number;
    convertedLeads: number;
    contactedLeads: number;
    closedLeads: number;
    activeSubscribers: number;
    publishedBlogs: number;
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

function ProgressBar({ value, max, color = 'bg-orange-500' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/analytics');
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => { fetchAnalytics(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const s = data?.stats;
  const total = s?.totalLeads ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white text-sm rounded-xl transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Leads" value={s?.totalLeads ?? 0} icon={Users} color="orange" />
        <StatsCard title="Converted" value={s?.convertedLeads ?? 0} icon={TrendingUp} color="green" subtitle="Paid clients" />
        <StatsCard title="Subscribers" value={s?.activeSubscribers ?? 0} icon={Bell} color="purple" />
        <StatsCard title="Published Blogs" value={s?.publishedBlogs ?? 0} icon={PenLine} color="blue" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Funnel */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Lead Funnel</h2>
          <div className="space-y-4">
            {[
              { label: 'New', value: s?.newLeads ?? 0, color: 'bg-blue-500' },
              { label: 'Contacted', value: s?.contactedLeads ?? 0, color: 'bg-yellow-500' },
              { label: 'Converted', value: s?.convertedLeads ?? 0, color: 'bg-green-500' },
              { label: 'Closed', value: s?.closedLeads ?? 0, color: 'bg-gray-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-400">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
                <ProgressBar value={item.value} max={total} color={item.color} />
              </div>
            ))}
          </div>

          {total > 0 && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Conversion rate:{' '}
                <span className="text-green-400 font-semibold">
                  {Math.round(((s?.convertedLeads ?? 0) / total) * 100)}%
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Lead Type Breakdown */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Lead Type Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: 'Business (B2B)', value: s?.leadsByType.business ?? 0, color: 'bg-orange-500' },
              { label: 'Individual', value: s?.leadsByType.individual ?? 0, color: 'bg-blue-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-400">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
                <ProgressBar value={item.value} max={total} color={item.color} />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            {[
              { label: 'Total Leads', value: total, icon: Users },
              { label: 'Subscribers', value: s?.activeSubscribers ?? 0, icon: Bell },
            ].map(item => (
              <div key={item.label} className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
        </div>
        {!data?.recentLeads?.length ? (
          <div className="px-6 py-10 text-center text-gray-500 text-sm">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Email', 'Type', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{lead.name}</td>
                    <td className="px-5 py-3.5 text-gray-400">{lead.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold uppercase ${lead.type === 'business' ? 'text-orange-400' : 'text-blue-400'}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
