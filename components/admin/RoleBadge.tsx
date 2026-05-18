import type { AdminRole } from '@/types';

const ROLE_CONFIG: Record<AdminRole, { label: string; className: string }> = {
  superadmin: { label: 'Super Admin', className: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  moderator: { label: 'Moderator', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  viewer: { label: 'Viewer', className: 'bg-gray-500/15 text-gray-400 border-gray-500/30' },
};

export function RoleBadge({ role }: { role: AdminRole }) {
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.viewer;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${config.className}`}>
      {config.label}
    </span>
  );
}
