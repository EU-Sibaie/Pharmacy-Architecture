import type { Icon } from '@phosphor-icons/react';
import {
  Briefcase as BriefcaseIcon,
  Buildings as BuildingsIcon,
  ChartPie as ChartPieIcon,
  ChatDots,
  ClipboardText,
  GearSix as GearSixIcon,
  Handshake as HandshakeIcon,
  IdentificationBadge as IdentificationBadgeIcon,
  PlugsConnected as PlugsConnectedIcon,
  User as UserIcon,
  Users as UsersIcon,
  XSquare,
} from '@phosphor-icons/react';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  roles: IdentificationBadgeIcon,
  services: BriefcaseIcon,
  companies: BuildingsIcon,
  jobs: HandshakeIcon,
  messages: ChatDots,
  estimates: ClipboardText,
} as Record<string, Icon>;
