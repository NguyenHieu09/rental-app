import axios from 'axios';
import { IContract, ICreateContractRequest } from '../types/contract';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IDepositTransaction, ITransaction } from '../types/transaction';
import { IContractDetail } from '../types/contractDetail';
import { IGenerateContractRequest } from '../types/rentalRequest';
import { ICancelContractRequest, ICancelContractResponse } from '../types/cancelContract';


const API_CONTRACT_URL = `${API_URL}/contract-service`;

// Function to fetch contracts from the API
export const createContract = async (contractRequest: ICreateContractRequest): Promise<IContract> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post<IContract>(`${API_CONTRACT_URL}/contracts`, contractRequest, {
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
            console.error('Error creating contract:', error);
            throw error;
        }
    }
};

export const fetchTransactions = async (userId: string, type: string, take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/transactions`, {
            params: {
                userId,
                type,
                take,
                skip,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const transactions = response.data.data;
        const total = response.data.pageInfo.total;

        return { transactions, total };
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
};

export const fetchContractsForOwner = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/contracts/owner`, {
            params: { take, skip },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const contracts = response.data.data;
        const total = response.data.pageInfo.total;

        return { contracts, total };
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental contracts:', error);
            throw error;
        }
    }
};

export const fetchRentalContractsForRenter = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/contracts/renter`, {
            params: { take, skip },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const contracts = response.data.data;
        const total = response.data.pageInfo.total;

        return { contracts, total };
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental contracts:', error);
            throw error;
        }
    }
};

export const fetchAllTransactionsForRenter = async (): Promise<ITransaction[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/transactions/renter`, {
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
            console.error('Error fetching transactions for renter:', error);
            throw error;
        }
    }
};


export const fetchContractDetails = async (contractId: string): Promise<IContractDetail> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IContractDetail>(`${API_CONTRACT_URL}/contracts/${contractId}`, {
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
            console.error('Error fetching contract details:', error);
            throw error;
        }
    }
};

export const fetchWalletBalance = async (): Promise<number> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/contracts/wallet-balance`, {
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
            console.error('Error fetching wallet balance:', error);
            throw error;
        }
    }
};

export const payMonthlyRent = async (rentTransaction: IDepositTransaction): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        await axios.post(`${API_CONTRACT_URL}/contracts/pay`, rentTransaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error making payment:', error);
            throw error;
        }
    }
};

export const deposit = async (depositTransaction: IDepositTransaction): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        await axios.post(`${API_CONTRACT_URL}/contracts/deposit`, depositTransaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error making payment:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestsForOwner = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(`${API_CONTRACT_URL}/rental-requests/owner`, {
            params: {
                take,
                skip,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('Rental requests response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching rental requests:', error);
        throw error;
    }
};

export const sendRentalRequest = async (rentalRequestData: {
    ownerId: string;
    // property: { propertyId: string };
    propertyId: string;
    rentalDeposit: number;
    rentalEndDate: string;
    rentalPrice: number;
    rentalStartDate: string;
    // renterId: string;
}) => {
    try {
        // Lấy token xác thực từ AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        console.log('Sending rental request with data:', rentalRequestData);

        const response = await axios.post(`${API_CONTRACT_URL}/rental-requests`, rentalRequestData, {
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

export const updateRentalRequestStatus = async (requestId: string, status: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(`${API_CONTRACT_URL}/rental-requests/owner/status`, { requestId, status }, {
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

export const generateContract = async (contractRequest: IGenerateContractRequest) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_CONTRACT_URL}/rental-requests/generate-contract`, contractRequest, {
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

export const fetchRentalRequestsBySlug = async (slug: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/rental-requests/owner/${slug}`, {
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

export const fetchRentalRequestsForRenter = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(`${API_CONTRACT_URL}/rental-requests/renter`, {
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


export const createCancelContractRequest = async (cancelRequest: ICancelContractRequest): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_CONTRACT_URL}/contract-cancellation-requests`, cancelRequest, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log('Cancel contract request successful:');
        } else {
            throw new Error('Failed to create cancel contract request');
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating cancel contract request:', error);
            throw error;
        }
    }
};


export const fetchNotHandledCancelContractRequest = async (contractId: string): Promise<ICancelContractResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/contract-cancellation-requests/not-handled/${contractId}`, {
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
            console.error('Error fetching cancel contract request:', error);
            throw error;
        }
    }
};

export const fetchHandledCancelContractRequest = async (contractId: string): Promise<ICancelContractResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/contract-cancellation-requests/handled/${contractId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log(response.data);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching handled cancel contract request:', error);
            throw error;
        }
    }
};

export const updateCancelContractRequestStatus = async (requestId: number, status: string): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(`${API_CONTRACT_URL}/contract-cancellation-requests/${requestId}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log('Cancel contract request status updated successfully');
        } else {
            throw new Error('Failed to update cancel contract request status');
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating cancel contract request status:', error);
            throw error;
        }
    }
};