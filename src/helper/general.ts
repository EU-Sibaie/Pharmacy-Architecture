export const getAvatarInitials = ({
  isNewChatSelected,
  selectedChat,
  isSenderName,
}: {
  isNewChatSelected?: boolean;
  selectedChat?: any;
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