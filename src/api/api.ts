// import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IConversation } from '../types/chat';
import { IFilterProperty } from '../types/property';
import { ICreatePropertyInteraction } from '../types/propertyInteraction';
import { IDeleteReview } from '../types/review';
import { IUser } from '../types/user';

const API_URL = 'https://kltn-be.iuh-mern.id.vn/api/v1';

const API_BASE_URL = `${API_URL}/estate-manager-service`;
console.log('API_BASE_URL', API_BASE_URL);

export const fetchProperties = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw (error as any).response;
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
        throw (error as any).response;
    }
};

export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        console.log('Sending login request with credentials:', credentials);
        console.log(API_BASE_URL);
        const loginResponse = await axios.post(
            `${API_BASE_URL}/auth/login`,
            credentials,
        );
        console.log('Login response:', loginResponse.data);
        return loginResponse.data;
    } catch (error) {
        throw (error as any).response;
    }
};

export const registerUser = async (registrationData: {
    name: string;
    email: string;
    password: string;
    userType: string;
    otp: string;
}) => {
    try {
        console.log(
            'Sending registration request with data:',
            registrationData,
        );
        const registerResponse = await axios.post(
            `${API_BASE_URL}/auth/register`,
            registrationData,
        );
        console.log('Registration response:', registerResponse.data);
        return registerResponse.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw (error as any).response;
    }
};

// export const updateUserInfo = async (phoneNumber: string, avatar: string) => {
//     try {
//         const token = await AsyncStorage.getItem('accessToken');

//         if (!token) {
//             throw new Error('No token provided');
//         }

//         const response = await axios.put(
//             `${API_BASE_URL}/users`,
//             { phoneNumber, avatar },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         return response.data;
//     } catch (error: any) {
//         if (error.response && error.response.data && error.response.data.message) {
//             console.error('Error message:', error.response.data.message);
//             throw new Error(error.response.data.message);
//         } else {
//             console.error('Error updating user info:', error);
//             throw error;
//         }
//     }
// };

// api.ts
export const updateUserInfo = async (
    phoneNumber: string,
    avatarUri: string,
    name: string,
) => {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('name', name);
    formData.append('avatar', {
        uri: avatarUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
    } as any);

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // No need to set 'Content-Type' for FormData
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Response error data:', errorData);
            throw new Error(errorData.message || 'Failed to update user info');
        }

        return await response.json();
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating user info:', error);
            throw error;
        }
    }
};
export const updateUserPassword = async (
    oldPassword: string,
    newPassword: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        console.log(
            'Updating password with URL:',
            `${API_BASE_URL}/users/update-password`,
        );
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);

        const response = await axios.post(
            `${API_BASE_URL}/users/update-password`,
            { oldPassword, password: newPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to update password' };
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating password:', error);
            throw error;
        }
    }
};

export const fetchPropertyDetail = async (slug: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/properties/slug/${slug}`,
        );
        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property detail:', error);
            throw (error as any).response;
        }
    }
};

export const fetchUnreadNotificationsCount = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/notifications/count`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching unread notifications count:', error);
            throw (error as any).response;
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching notifications:', error);
            throw (error as any).response;
        }
    }
};

export const updateNotificationStatus = async (
    notificationIds: string[],
    status: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/notifications/update-status`,
            {
                notificationIds,
                status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log('Update notification status response:', response.data);

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating notification status:', error);
            throw (error as any).response;
        }
    }
};

export const readAll = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/notifications/read-all`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log('Update notification status response:', response.data);

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating notification status:', error);
            throw (error as any).response;
        }
    }
};

export const fetchPropertiesWithFilters = async (
    filters: IFilterProperty,
    take: number,
    skip: number,
) => {
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching properties with filters:', error);
            throw (error as any).response;
        }
    }
};

export const updateWalletAddress = async (
    userId: string,
    walletAddress: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/users/wallet`,
            { userId, wallet_address: walletAddress },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating wallet address:', error);
            throw (error as any).response;
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property attributes:', error);
            throw (error as any).response;
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property types:', error);
            throw (error as any).response;
        }
    }
};

export const createProperty = async (formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/properties`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        // Kiểm tra mã trạng thái HTTP
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to create property' };
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating property:', error);
            throw (error as any).response;
        }
    }
};

export const verifyUser = async (
    frontUri: string,
    backUri: string,
): Promise<IUser> => {
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

export const fetchNewestProperties = async (
    take: number,
    skip: number,
    district?: string,
    city?: string,
) => {
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching newest properties:', error);
            throw (error as any).response;
        }
    }
};

export const deleteProperty = async (propertyId: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.delete(
            `${API_BASE_URL}/properties/${propertyId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, message: 'Property deleted successfully' };
        } else {
            return { success: false, message: 'Failed to delete property' };
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error deleting property:', error);
            throw (error as any).response;
        }
    }
};

const cleanFilters = (filters: any) => {
    return Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ''),
    );
};

export const fetchFilteredProperties = async (
    take: number,
    skip: number,
    filters: any,
    query?: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const cleanedFilters = cleanFilters(filters);
        // console.log('Cleaned filters:', cleanedFilters);

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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching filtered properties:', error);
            throw (error as any).response;
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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching conversations:', error);
            throw (error as any).response;
        }
    }
};

export const createPropertyToFavorites = async (
    data: ICreatePropertyInteraction,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/property-interactions`,
            {
                propertyId: data.propertyId,
                interactionType: data.interactionType,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error adding property to favorites:', error);
            throw (error as any).response;
        }
    }
};

export const getFavoriteProperties = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/property-interactions/favorites`,
            {
                params: {
                    take, // Số lượng yêu thích mỗi lần load
                    skip, // Bắt đầu từ vị trí này (tính từ 0)
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data; // Trả về danh sách yêu thích
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching favorite properties:', error);
            throw (error as any).response;
        }
    }
};

export const fetchPropertyReviews = async (slug: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/reviews/property/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data; // Trả về danh sách đánh giá
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property reviews:', error);
            throw (error as any).response;
        }
    }
};

export const fetchContractReviews = async (contractId: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/reviews/contract/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data; // Return the list of reviews
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching contract reviews:', error);
            throw (error as any).response;
        }
    }
};

export const createReview = async (formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_BASE_URL}/reviews`, {
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
            throw new Error('Failed to update user info');
        }

        return await response.json();
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating review:', error);
            throw (error as any).response;
        }
    }
};

export const updateReview = async (reviewId: string, formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // No need to set 'Content-Type' for FormData
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error('Failed to update user info');
        }

        return await response.json();
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating review:', error);
            throw (error as any).response;
        }
    }
};

export const deleteReview = async ({ reviewId, replyId }: IDeleteReview) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.delete(
            `${API_BASE_URL}/reviews/${reviewId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ...(replyId && { replyId }),
                },
            },
        );

        return response.data; // Return the created review
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error deleting review:', error);
            throw (error as any).response;
        }
    }
};

export const fetchPropertyOverview = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/dashboard/owner/overview`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching owner dashboard overview:', error);
            throw (error as any).response;
        }
    }
};


export const updatePropertyVisibility = async (
    properties: string[],
    status: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_BASE_URL}/properties/visible`,
            {
                properties,
                status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating property visibility:', error);
            throw (error as any).response;
        }
    }
};


export const updateProperty = async (propertyId: string, formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.put(
            `${API_BASE_URL}/properties/${propertyId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to update property' };
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating property:', error);
            throw (error as any).response;
        }
    }
};


export const fetchOwnerProperties = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/properties/owner/cbb`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching property list:', error);
            throw (error as any).response;
        }
    }
};

export const fetchRentersList = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_BASE_URL}/users/renters/cbb`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching renters list:', error);
            throw (error as any).response;
        }
    }
};