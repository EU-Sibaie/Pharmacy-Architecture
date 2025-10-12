import { NotePencil, CheckCircle, XCircle, Envelope } from "@phosphor-icons/react";

export const employeeFiltersOptions = [
  { label: 'Name', name: 'name', type: 'input' },
  { label: 'Email', name: 'email', type: 'input' },
  { label: 'Phone', name: 'phone', type: 'phone' },
  { label: 'Role', name: 'role', type: 'dropdown' },
  { label: 'Manager', name: 'manager', type: 'dropdown' },
  { label: 'Status', name: 'status', type: 'dropdown' },
  { label: 'Date', name: 'date', type: 'date' },
];



export type UserStatusKey = 'draft' | 'activated' | 'deactivated' | 'invited';

export const userStatusMap: Record<
  UserStatusKey,
  { label: string; icon: React.ElementType; bg: string; textColor: string }
> = {
  draft: {
    label: "Draft",
    icon: NotePencil,
    bg: "#fff7e6",
    textColor: "#b26a00",
  },
  activated: {
    label: "Activated",
    icon: CheckCircle,
    bg: "#e6ffed",
    textColor: "#027a48",
  },
  deactivated: {
    label: "Deactivated",
    icon: XCircle,
    bg: "#ffe6e6",
    textColor: "#d92d20",
  },
  invited: {
    label: "Invitation Sent",
    icon: Envelope,
    bg: "#e6f4ff",
    textColor: "#005999",
  },
};


export const columnsEmployee = [
  {
    id: '0',
    label: 'ID',
    show: true,
  },
  {
    id: '1',
    label: 'Name',
    show: true,
  },
  {
    id: '2',
    label: 'Email',
    show: true,
  },
  {
    id: '3',
    label: 'Phone',
    show: true,
  },
  {
    id: '4',
    label: 'Role',
    show: true,
  },
  {
    id: '5',
    label: 'Manage',
    show: true,
  },
  {
    id: '6',
    label: 'Status',
    show: true,
  },
  {
    id: '7',
    label: 'Actions',
    show: true,
  },
  {
    id: '8',
    label: 'Info',
    show: true,
  },
];