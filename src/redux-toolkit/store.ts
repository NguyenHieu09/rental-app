import { configureStore } from '@reduxjs/toolkit';
import baseReducer from '../redux-toolkit/slices/baseSlice';
import chatBotReducer from '../redux-toolkit/slices/chatBotSlice';
import chatReducer from '../redux-toolkit/slices/chatSlice';
import conversationReducer from '../redux-toolkit/slices/conversationSlice';
import favoriteReducer from '../redux-toolkit/slices/favoriteSlice';
import notificationReducer from '../redux-toolkit/slices/notificationSlice';
import socketReducer from '../redux-toolkit/slices/socketSlice';
import userReducer from '../redux-toolkit/slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        conversations: conversationReducer,
        socket: socketReducer,
        notifications: notificationReducer,
        favorite: favoriteReducer,
        chatBot: chatBotReducer,
        base: baseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                warnAfter: 100, // tăng ngưỡng lên 100ms
            },
        }),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;