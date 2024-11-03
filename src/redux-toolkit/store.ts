import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux-toolkit/slices/userSlice';
import chatReducer from '../redux-toolkit/slices/chatSlice';
import conversationReducer from '../redux-toolkit/slices/conversationSlice';
import socketReducer from '../redux-toolkit/slices/socketSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        conversations: conversationReducer,
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;