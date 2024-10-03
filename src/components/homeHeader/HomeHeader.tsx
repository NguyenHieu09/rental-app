// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// // import { IconOutline } from '@ant-design/icons-react-native';
// // import { fetchNotifications } from '../../api/api';
// // import { truncate } from '../../utils/truncate';

// // interface HomeHeaderProps {
// //     location: string;
// //     avatar: string;
// // }

// // interface Notification {
// //     title: string;
// //     body: string;
// // }

// // const HomeHeader: React.FC<HomeHeaderProps> = ({ location, avatar }) => {
// //     const [notifications, setNotifications] = useState<Notification[]>([]);
// //     const [showNotifications, setShowNotifications] = useState(false);
// //     const [totalNotifications, setTotalNotifications] = useState(0);

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

// //     const handleNotificationPress = async () => {
// //         setShowNotifications(!showNotifications);
// //         if (!showNotifications) {
// //             try {
// //                 const data = await fetchNotifications(1, 10);
// //                 setNotifications(data.data);
// //             } catch (error) {
// //                 console.error('Error fetching notifications:', error);
// //             }
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
// //                     <FlatList
// //                         data={notifications}
// //                         keyExtractor={(item, index) => index.toString()}
// //                         renderItem={({ item }) => (
// //                             <View style={styles.notificationItem}>
// //                                 <Text>{item.title}</Text>
// //                                 <Text>{item.body}</Text>

// //                             </View>
// //                         )}
// //                     />
// //                 </View>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         padding: 10,
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
// // });

// // export default HomeHeader;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import { IconOutline } from '@ant-design/icons-react-native';
// import { fetchNotifications } from '../../api/api';
// import { truncate } from '../../utils/truncate';

// interface HomeHeaderProps {
//     location: string;
//     avatar: string;
// }

// interface Notification {
//     title: string;
//     body: string;
// }

// const HomeHeader: React.FC<HomeHeaderProps> = ({ location, avatar }) => {
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [totalNotifications, setTotalNotifications] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const ITEMS_PER_PAGE = 10;

//     useEffect(() => {
//         const loadTotalNotifications = async () => {
//             try {
//                 const data = await fetchNotifications(1, 10);
//                 setTotalNotifications(data.pageInfo.total);
//             } catch (error) {
//                 console.error('Error fetching total notifications:', error);
//             }
//         };

//         loadTotalNotifications();
//     }, []);

//     useEffect(() => {
//         loadNotifications(currentPage);
//     }, [currentPage]);

//     const handleNotificationPress = async () => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//             loadNotifications(0);
//         }
//     };

//     const loadNotifications = async (page: number) => {
//         try {
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             const data = await fetchNotifications(ITEMS_PER_PAGE, skip);
//             setNotifications((prevNotifications) => [...prevNotifications, ...data.data]);
//             setTotalNotifications(data.pageInfo.total);
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//         }
//     };

//     const loadMoreNotifications = () => {
//         if (!isLoadingMore && notifications.length < totalNotifications) {
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadNotifications(nextPage);
//         }
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
//                     <View style={styles.notificationBadge}>
//                         <Text style={styles.badgeText}>{totalNotifications}</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             <Image
//                 source={{ uri: avatar }}
//                 style={styles.profileImage}
//             />
//             {showNotifications && (
//                 <View style={styles.notificationsContainer}>
//                     {loading && currentPage === 0 ? (
//                         <ActivityIndicator size="large" color="#0000ff" />
//                     ) : (
//                         <FlatList
//                             data={notifications}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }) => (
//                                 <View style={styles.notificationItem}>
//                                     <Text>{item.title}</Text>
//                                     <Text>{item.body}</Text>
//                                 </View>
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
//         padding: 10,
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
//     notificationItem: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
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
// });

// export default HomeHeader;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { fetchNotifications } from '../../api/api';
import { truncate } from '../../utils/truncate';

interface HomeHeaderProps {
    location: string;
    avatar: string;
}

interface Notification {
    id: string;
    title: string;
    body: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ location, avatar }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [totalNotifications, setTotalNotifications] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const loadTotalNotifications = async () => {
            try {
                const data = await fetchNotifications(1, 10);
                setTotalNotifications(data.pageInfo.total);
            } catch (error) {
                console.error('Error fetching total notifications:', error);
            }
        };

        loadTotalNotifications();
    }, []);

    useEffect(() => {
        if (showNotifications) {
            loadNotifications(currentPage);
        }
    }, [currentPage, showNotifications]);

    const handleNotificationPress = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setCurrentPage(0);
            setNotifications([]);
        }
    };

    const loadNotifications = async (page: number) => {
        try {
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            const data = await fetchNotifications(ITEMS_PER_PAGE, skip);
            setNotifications((prevNotifications) => {
                const newNotifications = data.data.filter(
                    (newNotification: Notification) => !prevNotifications.some(
                        (notification) => notification.id === newNotification.id
                    )
                );
                return [...prevNotifications, ...newNotifications];
            });
            setTotalNotifications(data.pageInfo.total);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const loadMoreNotifications = () => {
        if (!isLoadingMore && notifications.length < totalNotifications) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
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
                    <View style={styles.notificationBadge}>
                        <Text style={styles.badgeText}>{totalNotifications}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Image
                source={{ uri: avatar }}
                style={styles.profileImage}
            />
            {showNotifications && (
                <View style={styles.notificationsContainer}>
                    {loading && currentPage === 0 ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={notifications}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.notificationItem}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.body}</Text>
                                </View>
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
        padding: 10,
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
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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

export default HomeHeader;