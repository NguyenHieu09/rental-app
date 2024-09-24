import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../../types/role';
import { UserStatus } from '../../types/userStatus';
import { API_URL } from '@env';

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

const fetchUserData = async (token: string, email: string) => {
    try {
        console.log('Fetching user data with email:', email);
        const userResponse = await axios.get(`${API_URL}/estate-manager-service/users/me`, {
            params: { email },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('User data response:', userResponse.data);
        return userResponse.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

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
            const userInfo = await fetchUserData(accessToken, credentials.email);
            console.log('Fetched user data:', userInfo);

            // Save accessToken and user info to AsyncStorage (Optional)
            if (accessToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
            }
            if (userInfo) {
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
            await AsyncStorage.setItem('refreshToken', token.refreshToken.token);
            await AsyncStorage.setItem('email', credentials.email);

            console.log('Stored tokens and email in AsyncStorage');

            return { user: userInfo, accessToken, refreshToken: token.refreshToken.token };
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error) && error.response?.data) {
                console.error('Axios error details:', {
                    message: error.message,
                    code: error.code,
                    response: error.response,
                    config: error.config,
                });
                return rejectWithValue(error.response.data.message || `An error occurred: ${error.message}`);
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
            console.log(accessToken);


            // Gọi hàm lấy thông tin người dùng
            const userInfo = await fetchUserData(accessToken, registrationData.email);
            console.log('Fetched user data:', userInfo);

            // Save accessToken and user info to AsyncStorage (Optional)
            if (accessToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
            }
            if (userInfo) {
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
            await AsyncStorage.setItem('refreshToken', token.refreshToken.token);
            console.log('Stored refreshToken:', token.refreshToken.token);
            await AsyncStorage.setItem('email', registrationData.email);

            console.log('Stored tokens and email in AsyncStorage');

            return { user: userInfo, accessToken, refreshToken: token.refreshToken.token };
        } catch (error) {
            console.error('Registration error:', error);
            if (axios.isAxiosError(error) && error.response?.data) {
                console.error('Axios error details:', {
                    message: error.message,
                    code: error.code,
                    response: error.response,
                    config: error.config,
                });
                return rejectWithValue(error.response.data.message || `An error occurred: ${error.message}`);
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
                return rejectWithValue('');
            }
        } catch (error) {
            console.error('Check login status error:', error);
            return rejectWithValue(error);
        }
    }
);

// Đăng xuất
export const logoutUserAsync = createAsyncThunk(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('email');
            return null; // Trả về null để xóa thông tin người dùng
        } catch (error) {
            return rejectWithValue('Đăng xuất thất bại');
        }
    }
)

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
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.user = undefined;
                state.accessToken = undefined;
                state.refreshToken = undefined;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;