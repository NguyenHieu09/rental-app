import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { commonStyles, COLORS } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';
import CustomButton from '../../../components/customButton/CustomButton';
import { fetchProperties } from '../../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Property, RootStackParamList } from '../../../types/navigation';

const HomeScreen: React.FC = () => {

    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState('');

    const [nearbyProperties, setNearbyProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user.user);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation('Permission to access location was denied');
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = coords;

            // Reverse geocode to get human-readable address
            let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (reverseGeocode.length > 0) {
                const { street, district, city } = reverseGeocode[0];
                setLocation(`${street}, ${district}, ${city}`);
            } else {
                setLocation('Location not found');
            }
        };

        getLocation();

        const getProperties = async () => {
            try {
                const data = await fetchProperties();
                setProperties(data);
                setNearbyProperties(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        getProperties();
    }, []);

    const handlePressProperty = (property: Property) => {
        // Điều hướng đến màn hình PropertyDetail với thông tin property
        navigation.navigate('PropertyScreen', { property });
    };


    const handlePress = (label: string) => {
        console.log(`${label} button pressed!`);
    };

    // Lấy từ cuối cùng từ tên người dùng
    const lastName = user?.name ? user.name.split(' ').pop() : 'Guest';
    const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';

    return (
        <View style={commonStyles.container}>
            <HomeHeader location={location} avatar={avatar} />

            <TextInput
                style={commonStyles.input} // Using common input style
                placeholder="Tìm kiếm nhà, căn hộ, v.v."
            />

            <ScrollView>
                <Text style={styles.sectionTitle}>Địa điểm hàng đầu</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Hà Nội"
                        onPress={() => handlePress('Bali')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="TP.HCM"
                        onPress={() => handlePress('Jakarta')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Đà Nẵng"
                        onPress={() => handlePress('Yogyakarta')}
                    />
                </ScrollView>

                <Text style={styles.sectionTitle}>Bất động sản nổi bật</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredContainer}>
                    {properties.map((property: any) => (
                        <Properties
                            key={property.propertyId}
                            imageUrl={property.images[0]}
                            title={property.title}
                            location={`${property.address.street}, ${property.address.ward}, ${property.address.district}, ${property.address.city}`}
                            price={property.price}
                            type={property.type.name}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Khám phá bất động sản gần đây</Text>
                <View style={styles.nearbyContainer}>
                    <View style={styles.grid}>
                        {nearbyProperties.map((property: any) => (
                            <PropertyCard
                                key={property.propertyId}
                                property={property}
                                onPress={() => handlePressProperty(property)} // Gọi hàm khi nhấn
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    // header: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 16,
    // },
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
        // marginBottom: 8,
    },
});

export default HomeScreen;

