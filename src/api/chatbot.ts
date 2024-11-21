import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChatbot, IChatRequest, IChatResponse } from '../types/chatBot';

const API_BASE_URL = `${API_URL}/chat-service`;

export const fetchChatBotMessages = async (): Promise<IChatbot[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_BASE_URL}/chats`, {
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
            console.error('Error fetching chatbot messages:', error);
            throw error;
        }
    }
};


export const sendChatBotQuery = async (query: IChatRequest): Promise<IChatResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(`${API_BASE_URL}/generate`, query, {
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
            console.error('Error sending chatbot query:', error);
            throw error;
        }
    }
};