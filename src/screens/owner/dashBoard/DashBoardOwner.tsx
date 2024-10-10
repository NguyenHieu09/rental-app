// // import React, { useEffect, useState } from 'react';
// // import * as Location from 'expo-location';
// // import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch, RootState } from '../../../redux-toolkit/store';
// // import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
// // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // import { RootStackParamList } from '../../../types/navigation'; // Import the type
// // import HomeHeader from '../../../components/homeHeader/HomeHeader'; // Import HomeHeader
// // import { commonStyles } from '../../../styles/theme';

// // const DashboardOwner: React.FC = () => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// //     const { user, loading } = useSelector((state: RootState) => state.user);

// //     const [location, setLocation] = useState('');

// //     const handleLogout = async () => {
// //         await dispatch(logoutUserAsync()).unwrap();
// //         navigation.navigate('Login');
// //     };

// //     useEffect(() => {
// //         if (!user && !loading) {
// //             navigation.navigate('Login');
// //         }
// //     }, [user, loading, navigation]);

// //     useEffect(() => {
// //         const getLocation = async () => {
// //             let { status } = await Location.requestForegroundPermissionsAsync();
// //             if (status !== 'granted') {
// //                 setLocation('Quyền truy cập vị trí bị từ chối');
// //                 return;
// //             }

// //             let { coords } = await Location.getCurrentPositionAsync({});
// //             const { latitude, longitude } = coords;

// //             // Reverse geocode to get human-readable address
// //             let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
// //             if (reverseGeocode.length > 0) {
// //                 const { street, district, city } = reverseGeocode[0];
// //                 setLocation(`${street}, ${district}, ${city}`);
// //             } else {
// //                 setLocation('Không tìm thấy vị trí');
// //             }
// //         };

// //         getLocation();
// //     }, []);

// //     const handleViewProperties = () => {
// //         navigation.navigate('ManageProperty');
// //     };

// //     const handleViewRequestRental = () => {
// //         navigation.navigate('ManageRequestRental');
// //     };

// //     const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg'; // Replace with actual avatar URL

// //     return (
// //         <View style={[commonStyles.container, styles.dashboard]}>
// //             <HomeHeader location={location} avatar={avatar} />
// //             <View>
// //                 <View style={styles.owner}>
// //                     <Text style={styles.title}>{user?.name || 'Guest'}</Text>
// //                     <Text style={styles.revenue}>Tổng Doanh Thu Thuê</Text>
// //                     <Text style={styles.amount}>42,000,000</Text>
// //                     <TouchableOpacity style={styles.button} onPress={handleViewProperties}>
// //                         <Text style={styles.buttonText}>Xem Tài Sản Của Tôi →</Text>
// //                     </TouchableOpacity>
// //                 </View>

// //                 <Text style={styles.summaryTitle}>Tóm Tắt</Text>
// //                 <View style={styles.summaryContainer}>
// //                     <TouchableOpacity style={styles.card} onPress={handleViewProperties}>
// //                         <Text style={styles.cardText}>04</Text>
// //                         <Text style={styles.cardLabel}>Tài Sản</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity style={styles.card}>
// //                         <Text style={styles.cardText}>11</Text>
// //                         <Text style={styles.cardLabel}>Hợp Đồng Thuê</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity style={styles.card} onPress={handleViewRequestRental}>
// //                         <Text style={styles.cardText}>88</Text>
// //                         <Text style={styles.cardLabel}>Yêu Cầu thuê nhà</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity style={styles.card}>
// //                         <Text style={styles.cardText}>31</Text>
// //                         <Text style={styles.cardLabel}>Kiểm Tra Nhà</Text>
// //                     </TouchableOpacity>
// //                 </View>
// //                 {/* <View style={styles.summaryContainer}>
// //                     <Card style={styles.card}>
// //                         <Text style={styles.cardText}>04</Text>
// //                         <Text style={styles.cardLabel}>Tài Sản</Text>
// //                     </Card>
// //                     <Card style={styles.card}>
// //                         <Text style={styles.cardText}>11</Text>
// //                         <Text style={styles.cardLabel}>Hợp Đồng Thuê</Text>
// //                     </Card>
// //                     <Card style={styles.card}>
// //                         <Text style={styles.cardText}>88</Text>
// //                         <Text style={styles.cardLabel}>Yêu Cầu thuê nhà</Text>
// //                     </Card>
// //                     <Card style={styles.card}>
// //                         <Text style={styles.cardText}>31</Text>
// //                         <Text style={styles.cardLabel}>Kiểm Tra Nhà</Text>
// //                     </Card>
// //                 </View> */}
// //             </View>

// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     dashboard: {
// //         justifyContent: 'flex-start',
// //     },
// //     owner: {
// //         marginTop: 20,
// //         backgroundColor: '#6a5acd',
// //         borderRadius: 10,
// //         padding: 20,
// //         marginBottom: 20,
// //     },
// //     title: {
// //         fontSize: 24,
// //         color: '#fff',
// //         fontWeight: 'bold',
// //     },
// //     revenue: {
// //         fontSize: 16,
// //         color: '#fff',
// //     },
// //     amount: {
// //         fontSize: 32,
// //         color: '#fff',
// //         fontWeight: 'bold',
// //         marginVertical: 10,
// //     },
// //     button: {
// //         backgroundColor: '#fff',
// //         borderRadius: 5,
// //         padding: 10,
// //         alignItems: 'center',
// //     },
// //     buttonText: {
// //         color: '#6a5acd',
// //         fontWeight: 'bold',
// //     },
// //     summaryTitle: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     summaryContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         flexWrap: 'wrap',
// //     },
// //     card: {
// //         width: '48%',
// //         padding: 20,
// //         marginBottom: 10,
// //         borderRadius: 10,
// //         backgroundColor: '#fff',
// //         elevation: 2,
// //         alignItems: 'center',
// //     },
// //     cardText: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //     },
// //     cardLabel: {
// //         fontSize: 14,
// //         color: '#6a5acd',
// //         textAlign: 'center',
// //     },
// // });

// // export default DashboardOwner;

// import React, { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../../redux-toolkit/store';
// import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../../types/navigation'; // Import the type
// import HomeHeader from '../../../components/homeHeader/HomeHeader'; // Import HomeHeader
// import { commonStyles } from '../../../styles/theme';
// import { fetchPropertiesWithFilters } from '../../../api/api'; // Import fetchPropertiesWithFilters
// import { IProperty, IFilterProperty } from '../../../types/property';

// const DashboardOwner: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//     const { user, loading } = useSelector((state: RootState) => state.user);

//     const [location, setLocation] = useState('');
//     const [properties, setProperties] = useState<IProperty[]>([]);
//     const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);


//     useEffect(() => {
//         if (!user && !loading) {
//             navigation.navigate('Login');
//         }
//     }, [user, loading, navigation]);

//     useEffect(() => {
//         const getLocation = async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setLocation('Quyền truy cập vị trí bị từ chối');
//                 return;
//             }

//             let { coords } = await Location.getCurrentPositionAsync({});
//             const { latitude, longitude } = coords;

//             // Reverse geocode to get human-readable address
//             let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//             if (reverseGeocode.length > 0) {
//                 const { street, district, city } = reverseGeocode[0];
//                 setLocation(`${street}, ${district}, ${city}`);
//             } else {
//                 setLocation('Không tìm thấy vị trí');
//             }
//         };

//         getLocation();
//     }, []);

//     useEffect(() => {
//         const loadProperties = async () => {
//             setLoadingProperties(true);
//             setError(null);

//             const filters: IFilterProperty = {
//                 // status: 'ACTIVE',
//             };

//             try {
//                 const { properties, total } = await fetchPropertiesWithFilters(filters);
//                 setProperties(properties);
//                 console.log('Total properties:', total);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoadingProperties(false);
//             }
//         };

//         loadProperties();
//     }, []);

//     const handleViewProperties = () => {
//         navigation.navigate('ManageProperty', { properties });
//     };

//     const handleViewRequestRental = () => {
//         navigation.navigate('ManageRequestRental');
//     };

//     const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg'; // Replace with actual avatar URL

//     return (
//         <View style={[commonStyles.container, styles.dashboard]}>
//             <HomeHeader location={location} avatar={avatar} />
//             <View>
//                 <View style={styles.owner}>
//                     <Text style={styles.title}>{user?.name || 'Guest'}</Text>
//                     <Text style={styles.revenue}>Tổng Doanh Thu Thuê</Text>
//                     <Text style={styles.amount}>42,000,000</Text>
//                     <TouchableOpacity style={styles.button} onPress={handleViewProperties}>
//                         <Text style={styles.buttonText}>Xem Tài Sản Của Tôi →</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.summaryTitle}>Tóm Tắt</Text>
//                 <View style={styles.summaryContainer}>
//                     <TouchableOpacity style={styles.card} onPress={handleViewProperties}>
//                         <Text style={styles.cardText}>{properties.length}</Text>
//                         <Text style={styles.cardLabel}>Tài Sản</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.card}>
//                         <Text style={styles.cardText}>11</Text>
//                         <Text style={styles.cardLabel}>Hợp Đồng Thuê</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.card} onPress={handleViewRequestRental}>
//                         <Text style={styles.cardText}>88</Text>
//                         <Text style={styles.cardLabel}>Yêu Cầu thuê nhà</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.card}>
//                         <Text style={styles.cardText}>31</Text>
//                         <Text style={styles.cardLabel}>Kiểm Tra Nhà</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     dashboard: {
//         justifyContent: 'flex-start',
//     },
//     owner: {
//         marginTop: 20,
//         backgroundColor: '#6a5acd',
//         borderRadius: 10,
//         padding: 20,
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 24,
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     revenue: {
//         fontSize: 16,
//         color: '#fff',
//     },
//     amount: {
//         fontSize: 32,
//         color: '#fff',
//         fontWeight: 'bold',
//         marginVertical: 10,
//     },
//     button: {
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         padding: 10,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#6a5acd',
//         fontWeight: 'bold',
//     },
//     summaryTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     summaryContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//     },
//     card: {
//         width: '48%',
//         padding: 20,
//         marginBottom: 10,
//         borderRadius: 10,
//         backgroundColor: '#fff',
//         elevation: 2,
//         alignItems: 'center',
//     },
//     cardText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     cardLabel: {
//         fontSize: 14,
//         color: '#6a5acd',
//         textAlign: 'center',
//     },
// });

// export default DashboardOwner;

import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation'; // Import the type
import HomeHeader from '../../../components/homeHeader/HomeHeader'; // Import HomeHeader
import { commonStyles } from '../../../styles/theme';
import { fetchPropertiesWithFilters, fetchRentalRequestsForOwner } from '../../../api/api'; // Import fetchPropertiesWithFilters and fetchRentalRequestsForOwner
import { IProperty, IFilterProperty } from '../../../types/property';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { fetchRentalContractsForOwner } from '../../../api/contract';

const DashboardOwner: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user, loading } = useSelector((state: RootState) => state.user);

    const [location, setLocation] = useState('');
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [rentalRequests, setRentalRequests] = useState([]);
    const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
    const [loadingRequests, setLoadingRequests] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalRequests, setTotalRequests] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalContracts, setTotalContracts] = useState<number>(0);

    const handleLogout = async () => {
        await dispatch(logoutUserAsync()).unwrap();
        navigation.navigate('Login');
    };

    useEffect(() => {
        if (!user && !loading) {
            navigation.navigate('Login');
        }
    }, [user, loading, navigation]);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation('Quyền truy cập vị trí bị từ chối');
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
                setLocation('Không tìm thấy vị trí');
            }
        };

        getLocation();
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            setLoadingProperties(true);
            setError(null);

            const filters: IFilterProperty = {
                // status: 'ACTIVE',
            };

            try {
                const { properties, total } = await fetchPropertiesWithFilters(filters, 10, 0);
                setProperties(properties);
                setTotalProperties(total);
                console.log('Total properties:', total);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingProperties(false);
            }
        };

        loadProperties();
    }, []);

    useEffect(() => {
        const loadRentalRequests = async () => {
            setLoadingRequests(true);
            setError(null);

            try {
                const response = await fetchRentalRequestsForOwner(10, 0);
                const { data, pageInfo } = response;
                setRentalRequests(data);
                setTotalRequests(pageInfo.total);
                console.log('Total rental requests:', pageInfo.total);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingRequests(false);
            }
        };

        loadRentalRequests();
    }, []);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const { total } = await fetchRentalContractsForOwner(10, 0); // Fetch total contracts
                setTotalContracts(total); // Set total contracts
            } catch (error) {
                console.error('Error fetching contracts:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu hợp đồng.');
            }
        };

        fetchContracts();
    }, []);

    const handleViewProperties = () => {
        navigation.navigate('ManageProperty', { properties });
    };

    const handleViewRequestRental = () => {
        navigation.navigate('ManageRequestRental');
    };

    const handleViewContracts = () => {
        navigation.navigate('ManageContract');
    };

    const avatar = user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg'; // Replace with actual avatar URL

    return (
        <View style={[commonStyles.container, styles.dashboard]}>
            <HomeHeader location={location} avatar={avatar} />
            <View>
                <View style={styles.owner}>
                    <Text style={styles.title}>{user?.name || 'Guest'}</Text>
                    <Text style={styles.revenue}>Tổng Doanh Thu Thuê</Text>
                    <Text style={styles.amount}>42,000,000</Text>
                    <TouchableOpacity style={styles.button} onPress={handleViewProperties}>
                        <Text style={styles.buttonText}>Xem Tài Sản Của Tôi →</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.summaryTitle}>Tóm Tắt</Text>
                <View style={styles.summaryContainer}>
                    <TouchableOpacity style={styles.card} onPress={handleViewProperties}>
                        <Text style={styles.cardText}>{totalProperties}</Text>
                        <Text style={styles.cardLabel}>Tài Sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleViewContracts}>
                        <Text style={styles.cardText}>{totalContracts}</Text>
                        <Text style={styles.cardLabel}>Hợp Đồng Thuê</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleViewRequestRental}>
                        <Text style={styles.cardText}>{totalRequests}</Text>
                        <Text style={styles.cardLabel}>Yêu Cầu thuê nhà</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.cardText}>31</Text>
                        <Text style={styles.cardLabel}>Kiểm Tra Nhà</Text>
                    </TouchableOpacity>
                    <W3mButton />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        justifyContent: 'flex-start',
    },
    owner: {
        marginTop: 20,
        backgroundColor: '#1463b8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    revenue: {
        fontSize: 16,
        color: '#fff',
    },
    amount: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#6a5acd',
        fontWeight: 'bold',
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        width: '48%',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardLabel: {
        fontSize: 14,
        color: '#6a5acd',
        textAlign: 'center',
    },
});

export default DashboardOwner;