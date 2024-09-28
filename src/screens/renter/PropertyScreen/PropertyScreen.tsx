import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import PropertyDetail from '../../../components/properties/PropertyDetail';
import { commonStyles } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import * as Location from 'expo-location';
// import { RootStackParamList } from '../../types/navigation'; // Adjust the import path as needed

const PropertyScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PropertyScreen'>>();
    const { property } = route.params; // Nhận thông tin property từ route params

    // Lấy thông tin người dùng từ Redux
    const user = useSelector((state: RootState) => state.user.user);

    // Sử dụng avatar từ Redux store, nếu không có sẽ dùng một avatar mặc định
    const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';

    // Giả sử bạn muốn hiển thị một vị trí cho HomeHeader
    const [location, setLocation] = useState('Hồ Chí Minh, Việt Nam');

    useEffect(() => {
        const getLocation = async () => {
            // Yêu cầu quyền truy cập vào vị trí của người dùng
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation('Quyền truy cập vị trí bị từ chối');
                return;
            }

            // Lấy tọa độ GPS của người dùng
            let { coords } = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = coords;

            // Sử dụng reverse geocoding để lấy địa chỉ từ tọa độ
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            // Log the reverse geocoding result to inspect the data
            console.log('Reverse Geocode Result:', reverseGeocode);

            if (reverseGeocode.length > 0) {
                const { district, city } = reverseGeocode[0];
                // Handle null values for district
                const locationString = `${district || 'Unknown District'}, ${city}`;
                setLocation(locationString);
            } else {
                setLocation('Không thể xác định vị trí');
            }
        };

        getLocation();
    }, []);


    return (
        <View style={commonStyles.container}>
            {/* <HomeHeader location={location} avatar={avatar} /> */}

            <ScrollView>
                <PropertyDetail
                    property={property}
                />
            </ScrollView>
        </View>
    );
};

export default PropertyScreen;