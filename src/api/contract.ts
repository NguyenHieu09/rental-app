import axios from 'axios';
import { IContract, ICreateContractRequest } from '../types/contract';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IDepositTransaction, ITransaction } from '../types/transaction';

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

export const fetchRentalContractsForOwner = async (take: number, skip: number) => {
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


export const makePayment = async (depositTransaction: IDepositTransaction): Promise<void> => {
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
