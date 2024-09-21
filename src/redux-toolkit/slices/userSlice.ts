import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Role } from '../../types/role';
import { UserStatus } from '../../types/userStatus';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface userInfoInterfaceDetailI {
    userId: string;
    email: string;
    name: string;
    userTypes: Role[];
    status: UserStatus;
    avatar: string | null;
    phoneNumber: string | null;
    walletAddress: `0x${string}` | null;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface userInfoInterfaceI {
    user: userInfoInterfaceDetailI | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: userInfoInterfaceI = {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    loading: false,
    error: null,
};

// Hàm chung để lấy token và dữ liệu người dùng
const fetchUserData = async (token: string, email: string) => {
    const userResponse = await axios.get(`${API_URL}/estate-manager-service/users/me`, {
        params: { email },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return userResponse.data;
};

// Đăng nhập
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            console.log('Sending login request with credentials:', credentials);
            const loginResponse = await axios.post(`${API_URL}/estate-manager-service/auth/login`, credentials);
            console.log('Login response:', loginResponse.data);

            const { token } = loginResponse.data;
            const accessToken = token.accessToken.token;

            // Fetch user data using accessToken
            const userData = await fetchUserData(accessToken, credentials.email);
            return { user: userData, accessToken, refreshToken: token.refreshToken.token };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Đăng ký
export const registerUserAsync = createAsyncThunk(
    'user/registerUserAsync',
    async (registrationData: { name: string; email: string; password: string; userType: string; otp: string }, { rejectWithValue }) => {
        try {
            console.log('Sending registration request with data:', registrationData);
            const registerResponse = await axios.post(`${API_URL}/estate-manager-service/auth/register`, registrationData);
            console.log('Registration response:', registerResponse.data);

            const { token } = registerResponse.data;
            const accessToken = token.accessToken.token;

            // Fetch user data using accessToken
            const userData = await fetchUserData(accessToken, registrationData.email);
            return { user: userData, accessToken, refreshToken: token.refreshToken.token };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Kiểm tra trạng thái đăng nhập
export const checkLoginStatus = createAsyncThunk(
    'user/checkLoginStatus',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const email = await AsyncStorage.getItem('email');
            if (accessToken && email) {
                const userData = await fetchUserData(accessToken, email);
                return { user: userData, accessToken };
            } else {
                return rejectWithValue('No token found');
            }
        } catch (error) {
            console.error('Check login status error:', error);
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkLoginStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkLoginStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(checkLoginStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;