// // import React, { useState, useEffect, useCallback } from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// // import { IconOutline } from '@ant-design/icons-react-native';
// // import { fetchNotifications } from '../../api/api';
// // import { truncate } from '../../utils/truncate';
// // import * as Location from 'expo-location';
// // import { useFocusEffect } from '@react-navigation/native';

// // interface HomeHeaderProps {
// //     avatar: string;
// // }

// // interface Notification {
// //     title: string;
// //     body: string;
// // }

// // const HomeHeader: React.FC<HomeHeaderProps> = ({ avatar }) => {
// //     const [notifications, setNotifications] = useState<Notification[]>([]);
// //     const [showNotifications, setShowNotifications] = useState(false);
// //     const [totalNotifications, setTotalNotifications] = useState(0);
// //     const [loading, setLoading] = useState(true);
// //     const [isLoadingMore, setIsLoadingMore] = useState(false);
// //     const [currentPage, setCurrentPage] = useState(0);
// //     const [location, setLocation] = useState('Hồ Chí Minh, Việt Nam');
// //     const ITEMS_PER_PAGE = 10;

// //     useEffect(() => {
// //         const loadTotalNotifications = async () => {
// //             try {
// //                 const data = await fetchNotifications(1, 10);
// //                 setTotalNotifications(data.pageInfo.total);
// //             } catch (error) {
// //                 console.error('Error fetching total notifications:', error);
// //             }
// //         };

// //         loadTotalNotifications();
// //     }, []);

// //     useFocusEffect(
// //         useCallback(() => {
// //             loadNotifications(0);
// //         }, [])
// //     );

// //     useEffect(() => {
// //         loadNotifications(currentPage);
// //     }, [currentPage]);

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
// //                 const { formattedAddress } = reverseGeocode[0];
// //                 setLocation(formattedAddress || 'Không tìm thấy vị trí');
// //             } else {
// //                 setLocation('Không tìm thấy vị trí');
// //             }
// //         };

// //         getLocation();
// //     }, []);

// //     const handleNotificationPress = async () => {
// //         setShowNotifications(!showNotifications);
// //         if (!showNotifications) {
// //             loadNotifications(0);
// //         }
// //     };

// //     const loadNotifications = async (page: number) => {
// //         try {
// //             if (page === 0) setLoading(true);
// //             else setIsLoadingMore(true);

// //             const skip = page * ITEMS_PER_PAGE;
// //             const data = await fetchNotifications(ITEMS_PER_PAGE, skip);
// //             setNotifications((prevNotifications) => [...prevNotifications, ...data.data]);
// //             setTotalNotifications(data.pageInfo.total);
// //         } catch (error) {
// //             console.error('Error fetching notifications:', error);
// //         } finally {
// //             setLoading(false);
// //             setIsLoadingMore(false);
// //         }
// //     };

// //     const loadMoreNotifications = () => {
// //         if (!isLoadingMore && notifications.length < totalNotifications) {
// //             const nextPage = currentPage + 1;
// //             setCurrentPage(nextPage);
// //             loadNotifications(nextPage);
// //         }
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <View style={styles.locationContainer}>
// //                 <IconOutline name="environment" size={20} color="#000" />
// //                 <Text style={styles.locationText}>{truncate(location, 20)}</Text>
// //                 <IconOutline name="down" size={20} color="#000" />
// //             </View>
// //             <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
// //                 <View style={styles.bellIconContainer}>
// //                     <IconOutline name="bell" size={20} color="#000" />
// //                     <View style={styles.notificationBadge}>
// //                         <Text style={styles.badgeText}>{totalNotifications}</Text>
// //                     </View>
// //                 </View>
// //             </TouchableOpacity>
// //             <Image
// //                 source={{ uri: avatar }}
// //                 style={styles.profileImage}
// //             />
// //             {showNotifications && (
// //                 <View style={styles.notificationsContainer}>
// //                     {loading && currentPage === 0 ? (
// //                         <ActivityIndicator size="large" color="#0000ff" />
// //                     ) : (
// //                         <FlatList
// //                             data={notifications}
// //                             keyExtractor={(item, index) => index.toString()}
// //                             renderItem={({ item }) => (
// //                                 <View style={styles.notificationItem}>
// //                                     <Text>{item.title}</Text>
// //                                     <Text>{item.body}</Text>
// //                                 </View>
// //                             )}
// //                             onEndReached={loadMoreNotifications}
// //                             onEndReachedThreshold={0.5}
// //                             ListFooterComponent={isLoadingMore ? (
// //                                 <View style={styles.loadingContainer}>
// //                                     <ActivityIndicator size="small" color="#0000ff" />
// //                                     <Text style={styles.loadingText}>Đang tải thêm...</Text>
// //                                 </View>
// //                             ) : null}
// //                         />
// //                     )}
// //                 </View>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         borderRadius: 10,
// //         justifyContent: 'space-between',
// //     },
// //     locationContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //     },
// //     locationText: {
// //         marginHorizontal: 5,
// //         fontSize: 16,
// //     },
// //     iconContainer: {
// //         marginHorizontal: 10,
// //     },
// //     bellIconContainer: {
// //         width: 40,
// //         height: 40,
// //         borderRadius: 20,
// //         borderWidth: 2,
// //         borderColor: '#000',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         position: 'relative',
// //     },
// //     notificationBadge: {
// //         position: 'absolute',
// //         right: -5,
// //         top: -5,
// //         backgroundColor: 'red',
// //         borderRadius: 10,
// //         width: 20,
// //         height: 20,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     badgeText: {
// //         color: 'white',
// //         fontSize: 12,
// //         fontWeight: 'bold',
// //     },
// //     profileImage: {
// //         width: 40,
// //         height: 40,
// //         borderRadius: 20,
// //     },
// //     notificationsContainer: {
// //         position: 'absolute',
// //         top: 60,
// //         right: 10,
// //         width: 250,
// //         maxHeight: 300,
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.8,
// //         shadowRadius: 2,
// //         elevation: 5,
// //         zIndex: 1000,
// //     },
// //     notificationItem: {
// //         padding: 10,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ccc',
// //     },
// //     loadingContainer: {
// //         paddingVertical: 10,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     loadingText: {
// //         marginTop: 5,
// //         color: 'gray',
// //         fontSize: 16,
// //     },
// // });

// // export default HomeHeader;

// import React, { useEffect, useCallback, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import { IconOutline } from '@ant-design/icons-react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchNotifications } from '../../api/api';
// import { truncate } from '../../utils/truncate';
// import * as Location from 'expo-location';
// import { useFocusEffect } from '@react-navigation/native';
// import { AppDispatch, RootState } from '../../redux-toolkit/store';
// import { readNotification, setNotifications } from '../../redux-toolkit/slices/notificationSlice';
// import { setLoading } from '../../redux-toolkit/slices/chatSlice';
// import { INotification } from '../../types/notification';
// import { ITable } from '../../types/table';

// interface HomeHeaderProps {
//     avatar: string;
// }

// const HomeHeader: React.FC<HomeHeaderProps> = ({ avatar }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const notifications = useSelector((state: RootState) => state.notifications.notifications.data);
//     const loading = useSelector((state: RootState) => state.notifications.loading);
//     const totalNotifications = useSelector((state: RootState) => state.notifications.notifications.pageInfo.total);
//     const unreadNotifications = notifications.filter(notification => notification.status !== 'READ').length; // Số thông báo chưa đọc

//     const [showNotifications, setShowNotifications] = useState(false);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [location, setLocation] = useState('Hồ Chí Minh, Việt Nam');
//     const ITEMS_PER_PAGE = 10;

//     useEffect(() => {
//         const loadTotalNotifications = async () => {
//             try {
//                 const data = await fetchNotifications(1, ITEMS_PER_PAGE);
//                 dispatch(setNotifications(data)); // Sử dụng action từ Redux
//             } catch (error) {
//                 console.error('Error fetching total notifications:', error);
//             }
//         };

//         loadTotalNotifications();
//     }, [dispatch]);

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
//                 const { formattedAddress } = reverseGeocode[0];
//                 setLocation(formattedAddress || 'Không tìm thấy vị trí');
//             } else {
//                 setLocation('Không tìm thấy vị trí');
//             }
//         };

//         getLocation();
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             loadNotifications(0);
//         }, [dispatch])
//     );

//     const loadNotifications = async (page: number) => {
//         try {
//             dispatch(setLoading(true)); // Đánh dấu đang tải

//             const skip = page * ITEMS_PER_PAGE;
//             const response: ITable<INotification> = await fetchNotifications(ITEMS_PER_PAGE, skip);

//             // Lọc thông báo mới để tránh trùng lặp
//             const existingIds = new Set(notifications.map(notification => notification.id));
//             const filteredNewNotifications = response.data.filter((notification: INotification) => !existingIds.has(notification.id));

//             // Cập nhật thông báo qua Redux
//             dispatch(setNotifications({
//                 data: [...notifications, ...filteredNewNotifications],
//                 pageInfo: response.pageInfo // Update with new pageInfo
//             }));
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         } finally {
//             dispatch(setLoading(false)); // Đánh dấu đã tải xong
//         }
//     };

//     const loadMoreNotifications = () => {
//         if (!isLoadingMore && notifications.length < totalNotifications) {
//             const nextPage = currentPage + 1;
//             setIsLoadingMore(true);
//             loadNotifications(nextPage);
//             setCurrentPage(nextPage);
//         }
//     };

//     const handleNotificationPress = async () => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//             loadNotifications(0); // Tải thông báo mới nếu không có thông báo nào được hiển thị
//         } else {
//             // Đánh dấu tất cả thông báo là đã đọc
//             notifications.forEach(notification => {
//                 if (notification.status !== 'READ') {
//                     handleReadNotification(notification.id);
//                 }
//             });
//         }
//     };

//     const handleReadNotification = (id: string) => {
//         // Gọi action để đánh dấu thông báo là đã đọc
//         dispatch(readNotification(id));
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.locationContainer}>
//                 <IconOutline name="environment" size={20} color="#000" />
//                 <Text style={styles.locationText}>{truncate(location, 20)}</Text>
//                 <IconOutline name="down" size={20} color="#000" />
//             </View>
//             <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
//                 <View style={styles.bellIconContainer}>
//                     <IconOutline name="bell" size={20} color="#000" />
//                     {unreadNotifications > 0 && ( // Hiển thị badge chỉ khi có thông báo chưa đọc
//                         <View style={styles.notificationBadge}>
//                             <Text style={styles.badgeText}>{unreadNotifications}</Text>
//                         </View>
//                     )}
//                 </View>
//             </TouchableOpacity>
//             <Image source={{ uri: avatar }} style={styles.profileImage} />
//             {showNotifications && (
//                 <View style={styles.notificationsContainer}>
//                     {loading && currentPage === 0 ? (
//                         <ActivityIndicator size="large" color="#0000ff" />
//                     ) : (
//                         <FlatList
//                             data={notifications}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity onPress={() => handleReadNotification(item.id)}>
//                                     <View style={[styles.notificationItem, item.status === 'READ' && styles.readNotification]}>
//                                         <Text>{item.title}</Text>
//                                         <Text>{item.body}</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             )}
//                             onEndReached={loadMoreNotifications}
//                             onEndReachedThreshold={0.5}
//                             ListFooterComponent={isLoadingMore ? (
//                                 <View style={styles.loadingContainer}>
//                                     <ActivityIndicator size="small" color="#0000ff" />
//                                     <Text style={styles.loadingText}>Đang tải thêm...</Text>
//                                 </View>
//                             ) : null}
//                         />
//                     )}
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderRadius: 10,
//         justifyContent: 'space-between',
//     },
//     locationContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     locationText: {
//         marginHorizontal: 5,
//         fontSize: 16,
//     },
//     iconContainer: {
//         marginHorizontal: 10,
//     },
//     bellIconContainer: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         borderWidth: 2,
//         borderColor: '#000',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     },
//     notificationBadge: {
//         position: 'absolute',
//         right: -5,
//         top: -5,
//         backgroundColor: 'red',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     badgeText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
//     profileImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//     },
//     notificationsContainer: {
//         position: 'absolute',
//         top: 60,
//         right: 10,
//         width: 250,
//         maxHeight: 300,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//         zIndex: 1000,
//     },
//     loadingContainer: {
//         paddingVertical: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loadingText: {
//         marginTop: 5,
//         color: 'gray',
//         fontSize: 16,
//     },
//     notificationItem: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     readNotification: {
//         backgroundColor: '#f0f0f0', // Màu nền cho thông báo đã đọc
//         opacity: 0.5, // Độ mờ cho thông báo đã đọc
//     },
// });

// export default HomeHeader;


import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, updateNotificationStatus } from '../../api/api';
import { truncate } from '../../utils/truncate';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { readAllNotifications, readNotification, setNotifications } from '../../redux-toolkit/slices/notificationSlice';
import { setLoading } from '../../redux-toolkit/slices/chatSlice';
import { INotification } from '../../types/notification';
import { ITable } from '../../types/table';

interface HomeHeaderProps {
    avatar: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ avatar }) => {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector((state: RootState) => state.notifications.notifications.data);
    const loading = useSelector((state: RootState) => state.notifications.loading);
    const totalNotifications = useSelector((state: RootState) => state.notifications.notifications.pageInfo.total);
    const unreadNotifications = notifications.filter(notification => notification.status == 'RECEIVED').length;

    const [showNotifications, setShowNotifications] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [location, setLocation] = useState('Hồ Chí Minh, Việt Nam');
    const ITEMS_PER_PAGE = 10;

    // Hàm gọi API cho thông báo
    const loadNotifications = async (page: number) => {
        try {
            dispatch(setLoading(true));
            const skip = page * ITEMS_PER_PAGE;
            const response: ITable<INotification> = await fetchNotifications(ITEMS_PER_PAGE, skip);

            const existingIds = new Set(notifications.map(notification => notification.id));
            const filteredNewNotifications = response.data.filter((notification: INotification) => !existingIds.has(notification.id));

            dispatch(setNotifications({
                data: [...notifications, ...filteredNewNotifications],
                pageInfo: response.pageInfo
            }));
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };




    // Hàm gọi API cho vị trí
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
            setLocation(formattedAddress || 'Không tìm thấy vị trí');
        } else {
            setLocation('Không tìm thấy vị trí');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                // Sử dụng Promise.all để thực hiện cả hai tác vụ cùng một lúc
                await Promise.all([
                    loadNotifications(0), // Tải thông báo
                    getLocation() // Tải vị trí
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, [dispatch]);

    useFocusEffect(
        useCallback(() => {
            loadNotifications(0);
        }, [dispatch])
    );

    const loadMoreNotifications = () => {
        if (!isLoadingMore && notifications.length < totalNotifications) {
            const nextPage = currentPage + 1;
            setIsLoadingMore(true);
            loadNotifications(nextPage);
            setCurrentPage(nextPage);
        }
    };

    // const handleNotificationPress = async () => {
    //     setShowNotifications(!showNotifications);

    //     if (!showNotifications) {
    //         loadNotifications(0); // Tải thông báo nếu đang mở
    //     } else {

    //         dispatch(readAllNotifications());
    //     }
    // };

    const handleNotificationPress = async () => {
        setShowNotifications(!showNotifications);

        if (!showNotifications) {
            await loadNotifications(0); // Tải thông báo nếu đang mở
        } else {
            const unreadNotificationIds = notifications
                .filter(notification => notification.status === 'RECEIVED')
                .map(notification => notification.id);

            if (unreadNotificationIds.length > 0) {
                try {
                    await updateNotificationStatus(unreadNotificationIds, 'READ'); // Cập nhật trạng thái cho thông báo
                    dispatch(readAllNotifications()); // Cập nhật trạng thái trong Redux store
                } catch (error) {
                    console.error('Error marking notifications as read:', error);
                }
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <IconOutline name="environment" size={20} color="#000" />
                <Text style={styles.locationText}>{truncate(location, 20)}</Text>
                <IconOutline name="down" size={20} color="#000" />
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
                <View style={styles.bellIconContainer}>
                    <IconOutline name="bell" size={20} color="#000" />
                    {unreadNotifications > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>{unreadNotifications}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <Image source={{ uri: avatar }} style={styles.profileImage} />
            {showNotifications && (
                <View style={styles.notificationsContainer}>
                    {loading && currentPage === 0 ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={notifications}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <View style={[styles.notificationItem, item.status === 'READ' && styles.readNotification]}>
                                        <Text>{item.title}</Text>
                                        <Text>{item.body}</Text>
                                        <Text>{item.createdAt}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            onEndReached={loadMoreNotifications}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={isLoadingMore ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color="#0000ff" />
                                    <Text style={styles.loadingText}>Đang tải thêm...</Text>
                                </View>
                            ) : null}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        marginHorizontal: 5,
        fontSize: 16,
    },
    iconContainer: {
        marginHorizontal: 10,
    },
    bellIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    notificationsContainer: {
        position: 'absolute',
        top: 60,
        right: 10,
        width: 250,
        maxHeight: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 1000,
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
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    readNotification: {
        backgroundColor: '#f0f0f0',
        opacity: 0.5,
    },
});

export default HomeHeader;
