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

// Async action to login user
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
            const userResponse = await axios.get(`${API_URL}/estate-manager-service/users/me`, {
                params: { email: credentials.email },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('User data response:', userResponse.data);

            const userInfo: userInfoInterfaceI = {
                user: {
                    userId: userResponse.data.userId,
                    email: userResponse.data.email,
                    name: userResponse.data.name,
                    userTypes: userResponse.data.userTypes,
                    status: userResponse.data.status,
                    avatar: userResponse.data.avatar,
                    phoneNumber: userResponse.data.phoneNumber,
                    walletAddress: userResponse.data.walletAddress,
                    isVerified: userResponse.data.isVerified,
                    createdAt: userResponse.data.createdAt,
                    updatedAt: userResponse.data.updatedAt,
                },
                accessToken: accessToken,
                refreshToken: token.refreshToken.token,
                loading: false,
                error: null,
            };

            // Save accessToken and user info to AsyncStorage (Optional)
            await AsyncStorage.setItem('accessToken', accessToken || '');
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.user));

            return userInfo;
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error) && error.response?.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }
);

export const checkLoginStatus = createAsyncThunk(
    'user/checkLoginStatus',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userInfoString = await AsyncStorage.getItem('userInfo');

            if (!accessToken || !userInfoString) {
                return rejectWithValue('No tokens found');
            }

            const userInfo = JSON.parse(userInfoString);

            // Fetch user data using accessToken to verify token validity
            const userResponse = await axios.get(`${API_URL}/estate-manager-service/users/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assuming the API response structure
            if (!userResponse.data || !userResponse.data.userId) {
                throw new Error('Invalid token response');
            }

            return {
                user: userInfo,
                accessToken: accessToken,
                refreshToken: userResponse.data.token?.refreshToken?.token || '',
                loading: false,
                error: null,
            };
        } catch (error) {
            console.error('Check login status error:', error);
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || 'An unexpected error occurred');
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);

// Async action to logout user
export const logoutUserAsync = createAsyncThunk('user/logoutUserAsync', async (_, { dispatch }) => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userInfo');
    dispatch(userSlice.actions.logoutUser());
});

// Redux slice for user
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<userInfoInterfaceI>) => {
                console.log('Login fulfilled:', action.payload);
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action: PayloadAction<any>) => {
                console.log('Login rejected:', action.payload);
                state.loading = false;
                state.error = action.payload?.message || 'Đã xảy ra lỗi, vui lòng thử lại.';
            })
            .addCase(checkLoginStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkLoginStatus.fulfilled, (state, action: PayloadAction<userInfoInterfaceI>) => {
                console.log('Check login status fulfilled:', action.payload);
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(checkLoginStatus.rejected, (state, action: PayloadAction<any>) => {
                console.log('Check login status rejected:', action.payload);
                state.loading = false;
                state.error = action.payload.message || 'Đã xảy ra lỗi, vui lòng thử lại.';
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.user = undefined;
                state.accessToken = undefined;
                state.refreshToken = undefined;
                state.loading = false;
                state.error = null;
            });
    },
});

export const { setLoading, setError } = userSlice.actions;

export default userSlice.reducer;