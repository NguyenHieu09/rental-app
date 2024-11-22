import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { IChatbot, IChatResponse } from '../../types/chatBot';

interface ChatBotState {
    chats: IChatResponse[];
    chat: string;
    loading: boolean;
}

const initialState: ChatBotState = {
    chats: [],
    chat: '',
    loading: false,
};

const chatBotSlice = createSlice({
    name: 'chatBot',
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<IChatResponse>) => {
            state.chats.push(action.payload);
        },
        addChats: (state, action: PayloadAction<IChatbot[]>) => {
            state.chats = action.payload.map((chat) => ({ response: chat }));
        },
        setChat: (state, action: PayloadAction<string>) => {
            state.chat = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearChat: (state) => {
            state.chats = [];
        },
    },
});

export const { addChat, addChats, setChat, setLoading, clearChat } = chatBotSlice.actions;
export default chatBotSlice.reducer;
