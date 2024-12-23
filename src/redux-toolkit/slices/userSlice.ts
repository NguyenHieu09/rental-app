import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData, loginUser, registerUser } from '../../api/api';
import { IUser } from '../../types/user';

export interface userInfoInterfaceI {
    user: IUser | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    loading: boolean;
    error: string | null;
    errorDetails: {
        [key: string]: string;
    }[];
}

const initialState: userInfoInterfaceI = {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    loading: false,
    error: null,
    errorDetails: [],
};

export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const loginResponse = await loginUser(credentials);
            const { token } = loginResponse;
            const accessToken = token.accessToken.token;

            // Fetch user data using accessToken
            const userInfo = await fetchUserData(
                accessToken,
                credentials.email,
            );

            // Save accessToken and user info to AsyncStorage (Optional)
            if (accessToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
            }
            if (userInfo) {
                await AsyncStorage.setItem(
                    'userInfo',
                    JSON.stringify(userInfo),
                );
            }
            await AsyncStorage.setItem(
                'refreshToken',
                token.refreshToken.token,
            );
            await AsyncStorage.setItem('email', credentials.email);

            return {
                user: userInfo,
                accessToken,
                refreshToken: token.refreshToken.token,
            };
        } catch (error) {
            return rejectWithValue((error as any).data);
        }
    },
);

export const registerUserAsync = createAsyncThunk(
    'user/registerUserAsync',
    async (
        registrationData: {
            name: string;
            email: string;
            password: string;
            userType: string;
            otp: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const registerResponse = await registerUser(registrationData);
            const { token } = registerResponse;
            const accessToken = token.accessToken.token;

            // Fetch user data using accessToken
            const userInfo = await fetchUserData(
                accessToken,
                registrationData.email,
            );

            // Save accessToken and user info to AsyncStorage (Optional)
            if (accessToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
            }
            if (userInfo) {
                await AsyncStorage.setItem(
                    'userInfo',
                    JSON.stringify(userInfo),
                );
            }
            await AsyncStorage.setItem(
                'refreshToken',
                token.refreshToken.token,
            );
            await AsyncStorage.setItem('email', registrationData.email);

            return {
                user: userInfo,
                accessToken,
                refreshToken: token.refreshToken.token,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    },
);

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
                return { user: undefined, accessToken: undefined };
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    },
);

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
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload!.user;
                state.accessToken = action.payload!.accessToken;
                state.refreshToken = action.payload!.refreshToken;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                if ((action.payload as any).details) {
                    state.errorDetails = (action.payload as any).details.reduce(
                        (prev: any, curr: any) => {
                            const last = prev[prev.length - 1];

                            if (last && last.field === curr.field) return prev;

                            return [...prev, curr];
                        },
                        [],
                    );
                } else {
                    state.error = (action.payload as any).message;
                }
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

export const { saveUser } = userSlice.actions;
