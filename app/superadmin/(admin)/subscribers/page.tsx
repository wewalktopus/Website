'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, RefreshCw, ToggleLeft, ToggleRight, Download } from 'lucide-react';
import type { NewsletterSubscriber } from '@/types';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '200' });
    if (filter) params.set('active', filter);
    const res = await fetch(`/api/admin/subscribers?${params}`);
    const data = await res.json();
    setSubscribers(data.subscribers ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const filtered = subscribers.filter(s =>
    !search || s.email.toLowerCase().includes(search.toLowerCase())
  );

  const togglePreference = async (
    id: string,
    preferences: NewsletterSubscriber['emailPreferences'] | undefined,
    key: 'newsletter' | 'campaigns',
  ) => {
    const currentNewsletter = preferences?.newsletter ?? true;
    const currentCampaigns = preferences?.campaigns ?? true;
    const nextNewsletter = key === 'newsletter' ? !currentNewsletter : currentNewsletter;
    const nextCampaigns = key === 'campaigns' ? !currentCampaigns : currentCampaigns;

    await fetch(`/api/admin/subscribers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailPreferences: {
          newsletter: nextNewsletter,
          campaigns: nextCampaigns,
        },
      }),
    });

    setSubscribers(prev =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              active: nextNewsletter || nextCampaigns,
              emailPreferences: {
                newsletter: nextNewsletter,
                campaigns: nextCampaigns,
              },
            }
          : s,
      ),
    );
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const exportCSV = () => {
    const csv = ['Email,Newsletter,Campaigns,Source,Subscribed At', ...filtered.map(s =>
      `${s.email},${s.emailPreferences?.newsletter ?? s.active},${s.emailPreferences?.campaigns ?? s.active},${s.source},${s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString('en-IN') : ''}`
    )].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inactiveCount = subscribers.filter((s) => !s.active).length;
  const newsletterEnabled = subscribers.filter((s) => (s.emailPreferences?.newsletter ?? s.active)).length;
  const campaignsEnabled = subscribers.filter((s) => (s.emailPreferences?.campaigns ?? s.active)).length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: total, color: 'text-white' },
          { label: 'Newsletter ON', value: newsletterEnabled, color: 'text-green-400' },
          { label: 'Campaigns ON', value: campaignsEnabled, color: 'text-blue-400' },
          { label: 'Fully Unsubscribed', value: inactiveCount, color: 'text-gray-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by email…"
            className="w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50"
        >
          <option value="">All</option>
          <option value="true">Active only</option>
          <option value="false">Inactive only</option>
        </select>
        <button onClick={fetchSubscribers} className="p-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <RefreshCw size={16} />
        </button>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Showing <span className="text-white font-medium">{filtered.length}</span> of <span className="text-white font-medium">{total}</span> subscribers
      </p>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No subscribers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Newsletter</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaigns</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(sub => (
                  <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{sub.email}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => togglePreference(sub.id, sub.emailPreferences, 'newsletter')}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border transition-colors ${(sub.emailPreferences?.newsletter ?? sub.active)
                          ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/30 hover:bg-white/10'}`}
                      >
                        {(sub.emailPreferences?.newsletter ?? sub.active) ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {(sub.emailPreferences?.newsletter ?? sub.active) ? 'On' : 'Off'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => togglePreference(sub.id, sub.emailPreferences, 'campaigns')}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border transition-colors ${(sub.emailPreferences?.campaigns ?? sub.active)
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/30 hover:bg-white/10'}`}
                      >
                        {(sub.emailPreferences?.campaigns ?? sub.active) ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {(sub.emailPreferences?.campaigns ?? sub.active) ? 'On' : 'Off'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{sub.source}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteSubscriber(sub.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
