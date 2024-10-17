import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFilterProperty } from '../types/property';
import { IGenerateContractRequest } from '../types/rentalRequest';
import { IUser } from '../types/user';


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

// export const fetchRentalRequestsForOwner = async (take: number, skip: number) => {
//     try {
//         const token = await AsyncStorage.getItem('accessToken');
//         if (!token) {
//             throw new Error('No token found');
//         }
//         const response = await axios.get(`${API_BASE_URL}/rental-requests/owner`, {
//             params: {
//                 take,
//                 skip,
//             },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         // console.log('Rental requests response:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching rental requests:', error);
//         throw error;
//     }
// };

export const fetchRentalRequestsForRenter = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(`${API_BASE_URL}/rental-requests/renter`, {
            params: {
                take,
                skip,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching rental requests for renter:', error);
        throw error;
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

export const fetchRentalRequestsBySlug = async (slug: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/rental-requests/owner/${slug}`, {
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
            console.error('Error fetching rental requests by slug:', error);
            throw error;
        }
    }
};

export const generateRentalContract = async (contractRequest: IGenerateContractRequest) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_BASE_URL}/rental-requests/generate-contract`, contractRequest, {
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
            console.error('Error generating rental contract:', error);
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


export const updateRentalRequestStatus = async (requestId: string, status: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(`${API_BASE_URL}/rental-requests/owner/status`, { requestId, status }, {
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
            console.error('Error updating rental request status:', error);
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
        throw new Error('Failed to verify user');
    }

    return await response.json();
};


// export const fetchNewestProperties = async (take: number, skip: number) => {
//     try {
//         const token = await AsyncStorage.getItem('accessToken');

//         if (!token) {
//             throw new Error('No token provided');
//         }

//         const response = await axios.get(`${API_BASE_URL}/properties/search`, {
//             params: {
//                 sort: 'newest',
//                 take,
//                 skip,
//             },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         // console.log('Newest properties response:', response.data);

//         const properties = response.data.data;
//         const total = response.data.pageInfo.total;

//         return { properties, total };
//     } catch (error: any) {
//         if (error.response && error.response.data && error.response.data.message) {
//             console.error('Error message:', error.response.data.message);
//             throw new Error(error.response.data.message);
//         } else {
//             console.error('Error fetching newest properties:', error);
//             throw error;
//         }
//     }
// };

export const fetchNewestProperties = async (take: number, skip: number, city?: string) => {
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

        if (city) {
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