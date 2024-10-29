import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFilterProperty } from '../types/property';
import { IGenerateContractRequest } from '../types/rentalRequest';
import { IUser } from '../types/user';
import { IConversation } from '../types/chat';


const API_BASE_URL = `${API_URL}/estate-manager-service`;
console.log(API_BASE_URL);


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
        const response = await axios.get(`${API_BASE_URL}/properties/slug/${slug}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property detail:', error);
            throw error;
        }
    }
};

export const fetchNotifications = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }
        const response = await axios.get(`${API_BASE_URL}/notifications`, {
            params: {
                take,
                skip,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }
};


export const fetchPropertiesWithFilters = async (filters: IFilterProperty, take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/properties/owner`, {
            params: { ...filters, take, skip },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log('Properties with filters response:', response.data);

        const properties = response.data.data;
        const total = response.data.pageInfo.total;

        return { properties, total };
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching properties with filters:', error);
            throw error;
        }
    }
};


export const updateWalletAddress = async (userId: string, walletAddress: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_BASE_URL}/users/wallet`, { userId, wallet_address: walletAddress }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating wallet address:', error);
            throw error;
        }
    }
};

export const fetchPropertyAttributes = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/attributes/cbb`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property attributes:', error);
            throw error;
        }
    }
};

export const fetchPropertyTypes = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/property-types`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property types:', error);
            throw error;
        }
    }
};

export const createProperty = async (formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_BASE_URL}/properties`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        // Kiểm tra mã trạng thái HTTP
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to create property' };
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating property:', error);
            throw error;
        }
    }
};

export const verifyUser = async (frontUri: string, backUri: string): Promise<IUser> => {
    const formData = new FormData();
    formData.append('front', {
        uri: frontUri,
        name: 'front.jpg',
        type: 'image/jpeg',
    } as any);
    formData.append('back', {
        uri: backUri,
        name: 'back.jpg',
        type: 'image/jpeg',
    } as any);

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No token provided');
    }

    const response = await fetch(`${API_BASE_URL}/users/verify`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            // No need to set 'Content-Type' for FormData
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error('CCCD đã được sử dụng');
    }

    return await response.json();
};

export const fetchNewestProperties = async (take: number, skip: number, district?: string, city?: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const params: any = {
            sort: 'newest',
            take,
            skip,
        };

        if (city && district) {
            params.district = district;
            params.city = city;
        }

        const response = await axios.get(`${API_BASE_URL}/properties/search`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const properties = response.data.data;
        const total = response.data.pageInfo.total;

        return { properties, total };
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching newest properties:', error);
            throw error;
        }
    }
};

export const deleteProperty = async (propertyId: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.delete(`${API_BASE_URL}/properties/${propertyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return { success: true, message: 'Property deleted successfully' };
        } else {
            return { success: false, message: 'Failed to delete property' };
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error deleting property:', error);
            throw error;
        }
    }
};

const cleanFilters = (filters: any) => {
    return Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== '')
    );
};

export const fetchFilteredProperties = async (take: number, skip: number, filters: any, query?: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const cleanedFilters = cleanFilters(filters);
        console.log('Cleaned filters:', cleanedFilters);

        const params: any = { ...cleanedFilters, take, skip };
        if (query) {
            params.q = query;
        }

        const response = await axios.get(`${API_BASE_URL}/properties/search`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching filtered properties:', error);
            throw error;
        }
    }
};

export const fetchAllConversations = async (): Promise<IConversation[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/conversations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }
};
