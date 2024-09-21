import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux-toolkit/slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;