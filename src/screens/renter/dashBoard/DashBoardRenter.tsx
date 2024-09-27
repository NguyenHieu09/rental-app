import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { commonStyles, COLORS } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { fetchProperties } from '../../../api/api';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';

const HomeScreen: React.FC = () => {

    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState('');

    const [nearbyProperties, setNearbyProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user.user);

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
                const { city, region, country } = reverseGeocode[0];
                setLocation(`${city}, ${region}, ${country}`);
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
                placeholder="Search houses, apartments, etc."
            />

            <ScrollView>
                <Text style={styles.sectionTitle}>Top Locations</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Bali"
                        onPress={() => handlePress('Bali')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Jakarta"
                        onPress={() => handlePress('Jakarta')}
                    />
                    <CustomButton
                        imageSource={require("../../../../assets/img/1.png")}
                        label="Yogyakarta"
                        onPress={() => handlePress('Yogyakarta')}
                    />
                </ScrollView>

                <Text style={styles.sectionTitle}>Featured Estates</Text>
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

                <Text style={styles.sectionTitle}>Explore Nearby Estates</Text>
                <View style={styles.nearbyContainer}>
                    <View style={styles.grid}>
                        {nearbyProperties.map((property: any) => (
                            <PropertyCard
                                key={property.propertyId}
                                imageUrl={property.images[0]}
                                title={property.title}
                                location={`${property.address.street}, ${property.address.ward}, ${property.address.district}, ${property.address.city}`}
                                price={property.price}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
        // marginBottom: 8,
    },
});

export default HomeScreen;

