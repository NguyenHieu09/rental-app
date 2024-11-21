import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux-toolkit/slices/userSlice';
import chatReducer from '../redux-toolkit/slices/chatSlice';
import conversationReducer from '../redux-toolkit/slices/conversationSlice';
import socketReducer from '../redux-toolkit/slices/socketSlice';
import notificationReducer from '../redux-toolkit/slices/notificationSlice';
import favoriteReducer from '../redux-toolkit/slices/favoriteSlice';
import chatBotReducer from '../redux-toolkit/slices/chatBotSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        conversations: conversationReducer,
        socket: socketReducer,
        notifications: notificationReducer,
        favorite: favoriteReducer,
        chatBot: chatBotReducer
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