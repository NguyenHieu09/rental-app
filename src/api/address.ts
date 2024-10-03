import axios from 'axios';

const BASE_URL = 'https://vietnam-addresses.vercel.app/api/v1';

export interface City {
    _id: string;
    name: string;
}

export interface District {
    _id: string;
    name: string;
    parent_id: string;
}

export interface Ward {
    _id: string;
    name: string;
    parent_id: string;
}

export const getCities = async (): Promise<City[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/cities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

export const getDistricts = async (cityId: string): Promise<District[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/districts`, {
            params: { cityId },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching districts for cityId ${cityId}:`, error);
        throw error;
    }
};

export const getWards = async (districtId: string): Promise<Ward[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/wards`, {
            params: { districtId },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching wards for districtId ${districtId}:`, error);
        throw error;
    }
};