import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatStatus, IConversation } from '../../types/chat';
import { combineConversations } from '../../utils/combineConversations';
import { ITable } from '../../types/table';
import { IReadConversationSocket } from '../../types/conversation';
import { IPageInfo } from '../../types/page';

interface ConversationState {
    loading: boolean;
    isFirstLoad: boolean;
    conversations: IConversation[];
    selectedConversation: IConversation | null;
    pageInfo: IPageInfo;
    unreadCount: number;
}

const initialState: ConversationState = {
    loading: true,
    isFirstLoad: true,
    conversations: [],
    selectedConversation: null,
    pageInfo: {
        current: 0,
        pageSize: 10,
        total: 0,
    },
    unreadCount: 0,
};

const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        addConversation(state, action: PayloadAction<IConversation>) {
            const conversation = action.payload;
            const newConversations = combineConversations([conversation], state.conversations);
            const selectedConversation = state.selectedConversation
                ? newConversations.find(c => c.conversationId === state.selectedConversation?.conversationId) ?? null
                : null;

            state.conversations = newConversations;
            state.selectedConversation = selectedConversation;
            state.unreadCount += conversation.unreadCount;
        },
        addConversations(state, action: PayloadAction<ITable<IConversation>>) {
            const conversations = action.payload;
            const newConversations = combineConversations(state.conversations, conversations.data);
            const selectedConversation = state.selectedConversation
                ? newConversations.find(c => c.conversationId === state.selectedConversation?.conversationId) ?? null
                : null;

            const unreadCount = newConversations.reduce((acc, conversation) => acc + conversation.unreadCount, 0);

            state.conversations = newConversations;
            state.pageInfo = conversations.pageInfo;
            state.isFirstLoad = false;
            state.selectedConversation = selectedConversation;
            state.unreadCount = unreadCount;
            state.loading = false;
        },
        setSelectedConversation(state, action: PayloadAction<IConversation>) {
            const conversation = action.payload;
            const newConversations = state.conversations.map(c => {
                if (c.conversationId === conversation.conversationId) {
                    return { ...c, unreadCount: 0 };
                }
                return c;
            });

            state.selectedConversation = { ...conversation, unreadCount: 0 };
            state.unreadCount -= conversation.unreadCount;
            state.conversations = newConversations;
        },
        readConversation(state, action: PayloadAction<IReadConversationSocket>) {
            const { chatId, conversationId } = action.payload;
            const newConversations = state.conversations.map(oldConversation => {
                const conversation = { ...oldConversation };

                if (conversation.conversationId === conversationId) {
                    let index = Infinity;

                    const newChats = conversation.chats.map((chat, i) => {
                        if (chat.chatId === chatId) index = i;
                        if (i <= index) {
                            return { ...chat, status: 'READ' as ChatStatus };
                        }
                        return chat;
                    });

                    return { ...conversation, chats: newChats };
                }

                return conversation;
            });

            state.conversations = newConversations;

            // Handle selectedConversation safely
            const currentSelectedConversationId = state.selectedConversation?.conversationId;
            if (currentSelectedConversationId) {
                const foundConversation = newConversations.find(c => c.conversationId === currentSelectedConversationId);
                state.selectedConversation = foundConversation ?? null; // Use null if not found
            }
        },
    },
});

export const {
    setLoading,
    addConversation,
    addConversations,
    setSelectedConversation,
    readConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;


