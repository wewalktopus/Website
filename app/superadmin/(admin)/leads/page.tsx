'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Search, Filter, Trash2, Mail, RefreshCw, ChevronDown, X, Eye
} from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import type { Lead, LeadStatus } from '@/types';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'converted', 'closed'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100' });
    if (statusFilter) params.set('status', statusFilter);
    if (typeFilter) params.set('type', typeFilter);

    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [statusFilter, typeFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const filtered = leads.filter(l =>
    !search ||
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search)
  );

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(l => l.id)));
    }
  };

  const deleteSelected = async () => {
    if (!confirm(`Delete ${selected.size} lead(s)?`)) return;
    await fetch('/api/admin/leads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selected) }),
    });
    setSelected(new Set());
    fetchLeads();
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    setUpdatingId(id);
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (detailLead?.id === id) setDetailLead(prev => prev ? { ...prev, status } : prev);
    setUpdatingId(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    setLeads(prev => prev.filter(l => l.id !== id));
    if (detailLead?.id === id) setDetailLead(null);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            className="w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-colors"
          >
            <option value="">All Status</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-colors"
          >
            <option value="">All Types</option>
            <option value="business">Business</option>
            <option value="individual">Individual</option>
          </select>

          <button
            onClick={fetchLeads}
            className="p-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Bulk delete */}
        {selected.size > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/25 transition-colors"
          >
            <Trash2 size={15} />
            Delete {selected.size}
          </button>
        )}
      </div>

      {/* Stats row */}
      <p className="text-xs text-gray-500">
        Showing <span className="text-white font-medium">{filtered.length}</span> of <span className="text-white font-medium">{total}</span> leads
      </p>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={selectAll}
                      className="rounded border-gray-600 bg-transparent accent-orange-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                        className="rounded border-gray-600 bg-transparent accent-orange-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{lead.name}</p>
                      {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{lead.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold uppercase ${lead.type === 'business' ? 'text-orange-400' : 'text-blue-400'}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(lead.services ?? []).slice(0, 2).map(s => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400">{s}</span>
                        ))}
                        {(lead.services ?? []).length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500">+{lead.services.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative group">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="appearance-none bg-transparent border-0 cursor-pointer focus:outline-none"
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <StatusBadge status={lead.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDetailLead(lead)}
                          className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={14} />
                        </button>
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-1.5 text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
                          title="Send email"
                        >
                          <Mail size={14} />
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete lead"
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

      {/* Detail Panel */}
      {detailLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDetailLead(null)} />
          <div className="relative w-full max-w-md h-full bg-[#111111] border-l border-white/10 overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Lead Details</h2>
              <button onClick={() => setDetailLead(null)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                ['Name', detailLead.name],
                ['Email', detailLead.email],
                ['Phone', detailLead.phone],
                ['Company', detailLead.company ?? '—'],
                ['Type', detailLead.type],
                ['Budget', detailLead.budgetRange ?? '—'],
                ['Source', detailLead.source],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-white">{value}</p>
                </div>
              ))}

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Services</p>
                <div className="flex flex-wrap gap-1.5">
                  {detailLead.services.map(s => (
                    <span key={s} className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 rounded-md">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</p>
                <p className="text-sm text-gray-300 bg-white/5 rounded-lg p-3 leading-relaxed">{detailLead.message}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(detailLead.id, s)}
                      disabled={detailLead.status === s}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        detailLead.status === s
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${detailLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Mail size={15} /> Email Lead
                </a>
                <button
                  onClick={() => deleteLead(detailLead.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/25 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
