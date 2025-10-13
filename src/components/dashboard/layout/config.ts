import { paths } from '@/paths';

export const navItems = [
  { key: 'dashboard', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'agents', title: 'Agents', href: paths.dashboard.contacts, icon: 'users' },
  { key: 'clients', title: 'Clients', href: paths.dashboard.clients, icon: 'users' },
] satisfies any[];
