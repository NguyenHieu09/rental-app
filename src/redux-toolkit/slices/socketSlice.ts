// socketSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { NEXT_PUBLIC_SOCKET_ENDPOINT } from '@env';

interface SocketState {
    isConnected: boolean;
}

const initialState: SocketState = {
    isConnected: false,
};

// Tạo socket client và không tự động kết nối
const socket: Socket = io(NEXT_PUBLIC_SOCKET_ENDPOINT, {
    autoConnect: false,
});

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket(state) {
            if (!state.isConnected) {
                socket.connect(); // Kết nối socket
                state.isConnected = true; // Cập nhật trạng thái kết nối
            }
        },
        disconnectSocket(state) {
            if (state.isConnected) {
                socket.disconnect(); // Ngắt kết nối socket
            }
            state.isConnected = false; // Cập nhật trạng thái ngắt kết nối
        },
    },
});

// Export actions
export const { connectSocket, disconnectSocket } = socketSlice.actions;

// Export reducer
export default socketSlice.reducer;

// Export socket client để sử dụng ở nơi khác nếu cần
export { socket };
