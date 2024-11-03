import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../types/chat';
import { combineChats } from '../../utils/combineConversations';

interface ChatState {
    chats: {
        [key: string]: Array<IChat>;
    };
    firstGet: string[];
    loading: boolean;
}

const initialState: ChatState = {
    firstGet: [],
    chats: {},
    loading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        addChat(state, action: PayloadAction<{ receiver: string; chat: IChat }>) {
            const { receiver, chat } = action.payload;
            state.chats[receiver] = combineChats([chat], state.chats[receiver] || []);
        },
        addChats(state, action: PayloadAction<{ receiver: string; chats: Array<IChat> }>) {
            const { receiver, chats } = action.payload;
            state.chats[receiver] = combineChats(state.chats[receiver] || [], chats);
            state.firstGet.push(receiver);
        },
    },
});

// Selector để lấy danh sách chat cho một receiver
export const selectChats = (state: { chat: ChatState }, receiver: string) => {
    return state.chat.chats[receiver] || [];
};

export const { setLoading, addChat, addChats } = chatSlice.actions;

export default chatSlice.reducer;
