import { createSlice } from '@reduxjs/toolkit';

interface BaseState {
    reload: boolean;
}

const initialState: BaseState = {
    reload: false
};

const base = createSlice({
    name: 'chatBot',
    initialState,
    reducers: {
        setReLoad: (state, { payload }) => {
            state.reload = payload;
        }
    },
});

export const { setReLoad } = base.actions;
export default base.reducer;
