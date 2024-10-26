

import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { commonStyles, COLORS } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';
import CustomButton from '../../../components/customButton/CustomButton';
import { fetchNewestProperties } from '../../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { IProperty } from '../../../types/property';

const HomeScreen: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [nearbyProperties, setNearbyProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const ITEMS_PER_PAGE = 10;
    const user = useSelector((state: RootState) => state.user.user);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [location, setLocation] = useState('Gò Vấp,Hồ Chí Minh, Việt Nam');

    useEffect(() => {
        const initialize = async () => {
            await getLocation();
            console.log('Component mounted, loading properties');
            loadProperties(city, district);
        };

        initialize();
    }, [city, district]);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation('Quyền truy cập vị trí bị từ chối');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode.length > 0) {
            const { formattedAddress } = reverseGeocode[0];
            if (formattedAddress) {
                setLocation(formattedAddress || 'Không tìm thấy vị trí');

                console.log(formattedAddress);
                const addressParts = formattedAddress.split(',').map(part => part.trim());
                const city = addressParts[addressParts.length - 2] || '';
                const district = addressParts[addressParts.length - 3] || '';
                console.log('Extracted City:', city);
                console.log('Extracted District:', district);

                setCity(city);
                setDistrict(district);
            } else {
                setLocation('Không tìm thấy vị trí');
            }
        } else {
            setLocation('Không tìm thấy vị trí');
        }
    };

    const loadProperties = async (city?: string, district?: string) => {
        try {
            setLoading(true);
            // Fetch properties with city
            if (city && district) {
                const dataWithCityAndDistrict = await fetchNewestProperties(ITEMS_PER_PAGE, 0, district, city);
                setNearbyProperties(dataWithCityAndDistrict.properties);
                console.log('Total properties with city and district:', dataWithCityAndDistrict.total);
            }

            // Fetch properties without city
            const dataWithoutCity = await fetchNewestProperties(ITEMS_PER_PAGE, 0);
            setProperties(dataWithoutCity.properties);
            console.log('Total properties without city:', dataWithoutCity.total);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePressProperty = (property: IProperty) => {
        navigation.navigate('PropertyScreen', { property });
    };

    const handlePress = (label: string) => {
        console.log(`${label} button pressed!`);
    };

    const lastName = user?.name ? user.name.split(' ').pop() : 'Guest';
    const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';

    if (loading) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <HomeHeader avatar={avatar} />

            <TextInput
                style={commonStyles.input}
                placeholder="Tìm kiếm nhà, căn hộ, v.v."
            />

            <ScrollView scrollEventThrottle={400}>
                <Text style={styles.sectionTitle}>Địa điểm hàng đầu</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Hà Nội"
                        onPress={() => handlePress('Hà Nội')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="TP.HCM"
                        onPress={() => handlePress('TP.HCM')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Đà Nẵng"
                        onPress={() => handlePress('Đà Nẵng')}
                    />
                </ScrollView>

                <Text style={styles.sectionTitle}>Bất động sản nổi bật</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredContainer}>
                    {properties.map((property: IProperty, index: number) => (
                        <Properties
                            key={`${property.propertyId}-${index}`}
                            property={property}
                            onPress={() => handlePressProperty(property)}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Khám phá bất động sản gần đây</Text>
                <View style={styles.nearbyContainer}>
                    <View style={styles.grid}>
                        {nearbyProperties.map((property: IProperty, index: number) => (
                            <PropertyCard
                                key={`${property.propertyId}-${index}`}
                                property={property}
                                onPress={() => handlePressProperty(property)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    subGreeting: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 8,
    },
    featuredContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    scrollView: {
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    nearbyContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
    },
});

export default HomeScreen;