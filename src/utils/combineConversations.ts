import { IChat, IConversation } from "../types/chat";

export const combineConversations = (
    conversationsNew: Array<IConversation>,
    conversationsOld: Array<IConversation>,
) => {
    const conversationIds = conversationsNew.map((conversation) => conversation.conversationId);
    const newConversations = conversationsOld.filter(
        (conversation) => !conversationIds.includes(conversation.conversationId),
    );
    const conversationsNewCombined = conversationsNew.map((conversation) => {
        const oldConversation = conversationsOld.find((old) => old.conversationId === conversation.conversationId);

        if (!oldConversation) return conversation;

        const newChats = conversation.chats || [];
        const oldChats = (oldConversation.chats || []).filter(
            (chat) => !(conversation.chats || []).find((c) => c.chatId === chat.chatId),
        );

        return {
            ...oldConversation,
            ...conversation,
            chats: [...oldChats, ...newChats],
            unreadCount: oldConversation.unreadCount + conversation.unreadCount,
        };
    });

    return [...conversationsNewCombined, ...newConversations];
};


export const combineChats = (chatsLast: Array<IChat>, chatsOld?: Array<IChat>) => {
    if (!chatsOld) return chatsLast;

    const chatIds = chatsLast.map((chat) => chat.chatId);
    const newChats = chatsOld.filter((chat) => !chatIds.includes(chat.chatId));

    return [...chatsLast, ...newChats];
};