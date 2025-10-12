import dayjs from 'dayjs';

import { FilterProps } from '@/types/company';
import { ConversationList } from '@/types/message';

export const getAvatarInitials = ({
  isNewChatSelected,
  selectedChat,
  isSenderName,
}: {
  isNewChatSelected?: boolean;
  selectedChat?: ConversationList;
  isSenderName?: string;
}) => {
  if (!isNewChatSelected && selectedChat) {
    const [first = '', second = ''] = selectedChat.conversationName?.trim().split(' ') || [];
    return `${first[0]?.toUpperCase() ?? ''}${second[0]?.toUpperCase() ?? ''}`;
  } else if (isSenderName) {
    const [first = '', second = ''] = isSenderName?.trim().split(' ') || [];
    return `${first[0]?.toUpperCase() ?? ''}${second[0]?.toUpperCase() ?? ''}`;
  } else if (selectedChat) {
    return `${selectedChat.firstName?.[0]?.toUpperCase() ?? ''}${selectedChat.lastName?.[0]?.toUpperCase() ?? ''}`;
  }
};

export const getConversationName = (newChatList: boolean, selectedChat: ConversationList) => {
  if (!selectedChat) return '';
  return !newChatList ? `${selectedChat?.conversationName}` : `${selectedChat?.firstName} ${selectedChat?.lastName}`;
};

export const formatWithCommas = (x: string) => {
  return Number(x).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const nameRegex = /^[A-Za-z\s'-]+$/;

export const getAvatarColors = (seed: string): { backgroundColor: string; textColor: string } => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed?.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  const backgroundColor = `hsl(${hue}, 80%, 85%)`; // Light pastel
  const textColor = `hsl(${hue}, 50%, 25%)`; // Darker tone of same hue

  return { backgroundColor, textColor };
};

export const getActiveFilterCount = (getFilterValues: any) => {
  const filters = getFilterValues();
  return Object.values(filters).filter((val) => {
    if (typeof val === 'string') return val.trim() !== '';
    if (typeof val === 'number') return val !== undefined;
    if (val instanceof Date) return !isNaN(val.getTime());
    return val !== undefined && val !== null;
  }).length;
};

export const setTableColumns = ({ setColumns, items }: { setColumns: any; items: any }) => {
  setColumns((prev: any) => {
    const map = new Map(items.map((c: any) => [c.id, c]));
    return prev
      .slice()
      .sort((a: any, b: any) => {
        const ia = items.findIndex((c: any) => JSON.parse(c.id) === a.order);
        const ib = items.findIndex((c: any) => JSON.parse(c.id) === b.order);
        return ia - ib;
      })
      .map((col: any) => ({
        ...col,
        show: items.find((c: any) => JSON.parse(c.id) === col.order)?.show ? true : false,
      }));
  });
};

export const createPayload = ({
  page,
  rowsPerPage,
  all,
  filter,
  contact,
}: {
  page?: number;
  rowsPerPage?: number;
  all?: boolean;
  filter?: FilterProps;
  contact?: string;
}) => {
  const payload: Record<string, any> = {};
  const {
    fullName,
    email,
    phone,
    dateCreated,
    companyId,
    website,
    name,
    estimatedCostMax,
    estimatedCostMin,
    contactId,
    estimateNo,
    status,
    totalAmountMin,
    totalAmountMax,
    estimationDate,
  } = filter || {};
  if (page !== undefined) payload.page = page + 1;
  if (rowsPerPage !== undefined) payload.limit = rowsPerPage;
  if (all) payload.all = all;
  if (fullName) payload.fullName = `${fullName}`;
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  if (dateCreated) payload.createdAt = dayjs(dateCreated).format('YYYY-MM-DD');
  if (companyId !== undefined) payload.company = companyId;
  if (contactId !== undefined) payload.contact = contactId;
  if (contact !== undefined) payload.contact = contact;
  if (website) payload.website = website;
  if (name) payload.name = name;
  if (estimatedCostMin) payload.estimatedCostMin = estimatedCostMin;
  if (estimatedCostMax) payload.estimatedCostMax = estimatedCostMax;
  if (estimateNo) payload.estimateNo = estimateNo;
  if (status) payload.status = status;
  if (totalAmountMin) payload.totalAmountMin = totalAmountMin;
  if (totalAmountMax) payload.totalAmountMax = totalAmountMax;
  if (estimationDate) payload.estimationDate = estimationDate;

  return payload;
};
