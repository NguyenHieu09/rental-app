import axios from 'axios';
import { IContract, ICreateContractRequest } from '../types/contract';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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