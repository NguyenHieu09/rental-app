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

import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';

const HomeScreen: React.FC = () => {
    const properties = [
        {
            id: 1,
            imageUrl: 'https://example.com/apartment1.jpg',
            title: 'Sky Dandelions Apartment',
            rating: 4.9,
            location: 'Jakarta, Indonesia',
            price: 290,
            type: 'Apartment',
        },
        {
            id: 2,
            imageUrl: 'https://example.com/apartment2.jpg',
            title: 'Ocean View Villa',
            rating: 4.8,
            location: 'Bali, Indonesia',
            price: 450,
            type: 'Villa',
        },
        {
            id: 3,
            imageUrl: 'https://example.com/apartment3.jpg',
            title: 'City Center Studio',
            rating: 4.7,
            location: 'Hanoi, Vietnam',
            price: 200,
            type: 'Studio',
        },

    ];

    const nearbyProperties = [
        {
            id: 4,
            imageUrl: 'https://example.com/nearby1.jpg',
            title: 'Cozy Cottage',
            rating: 4.5,
            location: 'Jakarta, Indonesia',
            price: 150,
        },
        {
            id: 5,
            imageUrl: 'https://example.com/nearby2.jpg',
            title: 'Modern Loft',
            rating: 4.6,
            location: 'Bali, Indonesia',
            price: 300,
        },
        {
            id: 6,
            imageUrl: 'https://example.com/nearby3.jpg',
            title: 'Luxury Penthouse',
            rating: 4.9,
            location: 'Hanoi, Vietnam',
            price: 500,
        },
        {
            id: 7,
            imageUrl: 'https://example.com/nearby4.jpg',
            title: 'Charming Bungalow',
            rating: 4.4,
            location: 'Yogyakarta, Indonesia',
            price: 180,
        },
    ];

    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hey, Jonathan!</Text>
                    <Text style={styles.subGreeting}>Let's start exploring</Text>
                </View>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Search houses, apartments, etc."
            />

            <ScrollView>
                <Text style={styles.sectionTitle}>Top Locations</Text>
                <View style={styles.locationContainer}>
                    <Button title="Bali" type="clear" />
                    <Button title="Jakarta" type="clear" />
                    <Button title="Yogyakarta" type="clear" />
                </View>

                <Text style={styles.sectionTitle}>Featured Estates</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredContainer}>
                    {properties.map(property => (
                        <Properties
                            key={property.id}
                            imageUrl={property.imageUrl}
                            title={property.title}
                            rating={property.rating}
                            location={property.location}
                            price={property.price}
                            type={property.type}
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
    container: {
        flex: 1,
        backgroundColor: '#f0f4ff',
        padding: 14,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    subGreeting: {
        fontSize: 16,
        color: '#888',
        marginLeft: 8,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    featuredContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        width: 150,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    cardPrice: {
        color: '#888',
    },
    agentContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    nearbyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default HomeScreen;

