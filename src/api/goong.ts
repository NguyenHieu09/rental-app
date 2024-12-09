import axios from 'axios';
import { ILngLatToAddressRes } from '../types/goong';

const GOONG_API_KEY = process.env.NEXT_PUBLIC_GOONG_API_KEY;

export const lngLatToAddressService = async (lngLat: [number, number]) => {
    const res = await axios.get<ILngLatToAddressRes>(
        `https://rsapi.goong.io/geocode`,
        {
            params: {
                latlng: lngLat.join(','),
                api_key: GOONG_API_KEY,
            },
        },
    );

    return res.data;
};

export const addressToLngLatService = async (address: string) => {
    const res = await axios.get<ILngLatToAddressRes>(
        `https://rsapi.goong.io/geocode`,
        {
            params: {
                address,
                api_key: GOONG_API_KEY,
            },
        },
    );

    return res.data;
};
