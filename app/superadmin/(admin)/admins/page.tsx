'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';
import { RoleBadge } from '@/components/admin/RoleBadge';
import type { AdminUser, AdminRole } from '@/types';

const ROLES: AdminRole[] = ['superadmin', 'moderator', 'viewer'];

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'moderator' as AdminRole });

  const fetchAdmins = async () => {
    const res = await fetch('/api/admin/admins');
    const data = await res.json();
    setAdmins(data.admins ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', role: 'moderator' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Failed to create admin');
      setSaving(false);
      return;
    }

    await fetchAdmins();
    resetForm();
    setSaving(false);
  };

  const handleUpdateRole = async (uid: string, role: AdminRole) => {
    await fetch(`/api/admin/admins/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    setAdmins(prev => prev.map(a => a.uid === uid ? { ...a, role } : a));
  };

  const handleToggleActive = async (uid: string, current: boolean) => {
    await fetch(`/api/admin/admins/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !current }),
    });
    setAdmins(prev => prev.map(a => a.uid === uid ? { ...a, active: !current } : a));
  };

  const handleDelete = async (uid: string) => {
    if (!confirm('Delete this admin? This action cannot be undone.')) return;
    const res = await fetch(`/api/admin/admins/${uid}`, { method: 'DELETE' });
    if (res.ok) {
      setAdmins(prev => prev.filter(a => a.uid !== uid));
    } else {
      const data = await res.json();
      alert(data.error ?? 'Failed to delete');
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{admins.length} admin account{admins.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={15} /> Add Admin
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-[#1a1a1a] border border-orange-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">New Admin Account</h3>
            <button onClick={resetForm} className="text-gray-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@walktopus.in"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Min 8 characters"
                  className="w-full pr-10 px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Role</label>
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value as AdminRole }))}
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1).replace('admin', ' Admin')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? 'Creating…' : 'Create Admin'}
            </button>
            <button onClick={resetForm} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admins table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {admins.map(admin => (
                <tr key={admin.uid} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{admin.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{admin.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={admin.role}
                      onChange={e => handleUpdateRole(admin.uid, e.target.value as AdminRole)}
                      className="bg-transparent text-xs focus:outline-none cursor-pointer"
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <div className="mt-1"><RoleBadge role={admin.role} /></div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggleActive(admin.uid, admin.active)}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                        admin.active
                          ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30'
                      }`}
                    >
                      {admin.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">
                    {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(admin.uid)}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
