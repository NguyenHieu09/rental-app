import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = `${API_URL}/estate-manager-service`;

export const fetchProperties = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

export const fetchUserData = async (token: string, email: string) => {
    try {
        console.log('Fetching user data with email:', email);
        const userResponse = await axios.get(`${API_BASE_URL}/users/me`, {
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



export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        console.log('Sending login request with credentials:', credentials);
        console.log(API_BASE_URL)
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        console.log('Login response:', loginResponse.data);
        return loginResponse.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (registrationData: { name: string; email: string; password: string; userType: string; otp: string }) => {
    try {
        console.log('Sending registration request with data:', registrationData);
        const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registrationData);
        console.log('Registration response:', registerResponse.data);
        return registerResponse.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const fetchPropertyDetail = async (slug: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/estate-manager-service/properties/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching property detail:', error);
        throw error;
    }
};

export const sendRentalRequest = async (rentalRequestData: {
    ownerId: string;
    property: { propertyId: string; title: string; images: string[]; slug: string };
    rentalDeposit: number;
    rentalEndDate: string;
    rentalPrice: number;
    rentalStartDate: string;
    renterId: string;
}) => {
    try {
        // Lấy token xác thực từ AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        console.log('Sending rental request with data:', rentalRequestData);

        const response = await axios.post(`${API_BASE_URL}/rental-requests`, rentalRequestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Rental request response:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            // Handle other errors
            console.error('Error sending rental request:', error);
            throw error;
        }
    }
};


// Hàm mới để lấy thông báo theo phân trang
export const fetchNotifications = async (page: number, pageSize: number) => {
    try {
        // Lấy token xác thực từ AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        // console.log(`Fetching notifications for page ${page} with page size ${pageSize}`);

        const response = await axios.get(`${API_BASE_URL}/notifications`, {
            params: {
                page,
                pageSize,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log('Notifications response:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            // Handle other errors
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestsForOwner = async (page: number, pageSize: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(`${API_BASE_URL}/rental-requests/owner`, {
            params: {
                page,
                pageSize,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Rental requests response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching rental requests:', error);
        throw error;
    }
};

