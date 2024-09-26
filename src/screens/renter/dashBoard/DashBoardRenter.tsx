// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
// import { AppDispatch, RootState } from '../../../redux-toolkit/store';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../../types/navigation';
// import { useDispatch, useSelector } from 'react-redux';


// const DashboardRenter: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use the type here
//     const { user, loading } = useSelector((state: RootState) => state.user);
//     const handleLogout = async () => {
//         await dispatch(logoutUserAsync()).unwrap();
//         navigation.navigate('Login');
//     };

//     useEffect(() => {
//         if (!user && !loading) {
//             navigation.navigate('Login');
//         }
//     }, [user, loading, navigation])
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard Người Thuê</Text>
//             {/* Thêm các thành phần khác cho màn hình người thuê */}
//             <Button title="Đăng xuất" onPress={handleLogout} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });

// export default DashboardRenter;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { commonStyles, COLORS } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { fetchProperties } from '../../../api/api';

const HomeScreen: React.FC = () => {

    const nearbyProperties = [
        {
            id: 4,
            imageUrl: 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1699325615/Image_226_hge2bb.png',
            title: 'Cozy Cottage',
            rating: 4.5,
            location: 'Jakarta, Indonesia',
            price: 150,
        },
        {
            id: 5,
            imageUrl: 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1699325615/Image_226_hge2bb.png',
            title: 'Modern Loft',
            rating: 4.6,
            location: 'Bali, Indonesia',
            price: 300,
        },
        {
            id: 6,
            imageUrl: 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1699325615/Image_226_hge2bb.png',
            title: 'Luxury Penthouse',
            rating: 4.9,
            location: 'Hanoi, Vietnam',
            price: 500,
        },
        {
            id: 7,
            imageUrl: 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1699325615/Image_226_hge2bb.png',
            title: 'Charming Bungalow',
            rating: 4.4,
            location: 'Yogyakarta, Indonesia',
            price: 180,
        },
    ];

    const [properties, setProperties] = useState([]);
    // const [nearbyProperties, setNearbyProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const data = await fetchProperties();
                setProperties(data);
                // setNearbyProperties(data); // Assuming the same endpoint for nearby properties
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

    if (loading) {
        return (
            <View style={commonStyles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <HomeHeader />
            <View style={commonStyles.header}>
                <View>
                    <Text style={styles.greeting}>Hey, Jonathan!</Text>
                    <Text style={styles.subGreeting}>Let's start exploring</Text>
                </View>
            </View>

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
                        {nearbyProperties.map(property => (
                            <PropertyCard
                                key={property.id}
                                imageUrl={property.imageUrl}
                                title={property.title}
                                rating={property.rating}
                                location={property.location}
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
    },
    nearbyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default HomeScreen;

