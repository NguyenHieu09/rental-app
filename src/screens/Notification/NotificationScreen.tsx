

import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { readAllNotifications, setNotifications, setLoading, readNotification } from '../../redux-toolkit/slices/notificationSlice';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { fetchNotifications, updateNotificationStatus } from '../../api/api';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ITable } from '../../types/table';
import { INotification } from '../../types/notification';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { convertDateToTimeAgo } from '../../types/convertDateTime';

const NotificationsScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector((state: RootState) => state.notifications.notifications.data);
    const loading = useSelector((state: RootState) => state.notifications.loading);
    const totalNotifications = useSelector((state: RootState) => state.notifications.notifications.pageInfo.total);
    const currentPage = useSelector((state: RootState) => state.notifications.notifications.pageInfo.current);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLoadingMore, setIsLoadingMore] = useState(false);

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

            // Sau khi load xong, cập nhật currentPage
            setIsLoadingMore(false);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setIsLoadingMore(false);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loadMoreNotifications = () => {
        if (!isLoadingMore && notifications.length < totalNotifications) {
            const nextPage = currentPage + 1;
            console.log(nextPage + ' notifications');

            setIsLoadingMore(true);
            loadNotifications(nextPage);
        }
    };

    // Hàm đánh dấu tất cả là đã đọc
    const markAllAsRead = async () => {
        const unreadNotificationIds = notifications
            .filter(notification => notification.status === 'RECEIVED')
            .map(notification => notification.id);
        console.log(unreadNotificationIds);
        await updateNotificationStatus(unreadNotificationIds, 'READ');
        dispatch(readAllNotifications());
    };

    const handleNotificationPress = async (notification: INotification) => {
        // Cập nhật trạng thái của thông báo thành 'READ'
        if (notification.status === 'RECEIVED') {
            await updateNotificationStatus([notification.id], 'READ');
            console.log("đã đọc");
            dispatch(readNotification(notification.id));
        }
        if (notification.type === 'RENTER_PAYMENT') {
            navigation.navigate('PaymentScreen');
        } else if (notification.type === 'RENTAL_REQUEST') {
            navigation.navigate('ManageRequestRental');
        } else if (notification.type === 'RENTER_RENTAL_REQUEST') {
            navigation.navigate('ManageRequestRental');
        } else if (notification.type === 'OWNER_CONTRACT') {
            navigation.navigate('Transactions');
        } else if (notification.type === 'CONTRACT_DETAIL') {
            navigation.navigate('ContractDetails', { contractId: notification.docId });
        } else if (notification.type === 'OWNER_DETAIL_PROPERTY') {
            navigation.navigate('ManageProperty');
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadNotifications(0);
            navigation.setOptions({
                headerTitle: () => (
                    <Text style={styles.customHeaderTitle}>Thông Báo</Text>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                        <Text style={styles.markAll}>Đánh dấu tất cả là đã đọc</Text>
                    </TouchableOpacity>
                ),
            });
        }, [dispatch, navigation])
    );

    return (
        <View style={styles.container}>
            {loading && currentPage === 0 ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => `${item?.id}-${index}`} // Ensure unique keys
                    renderItem={({ item }) => (
                        item ? (
                            <TouchableOpacity
                                style={[styles.notificationItem, item.status === 'READ' && styles.readNotification]}
                                onPress={() => handleNotificationPress(item)} // Khi nhấn vào thông báo
                            >
                                <Text style={styles.notificationTitle}>{item.title}</Text>
                                <Text style={styles.notificationBody}>{item.body}</Text>
                                <Text style={styles.notificationDate}>{convertDateToTimeAgo(new Date(item.createdAt))}</Text>
                                <Text>{item.type}</Text>
                            </TouchableOpacity>
                        ) : null
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    customHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    markAllButton: {
        marginRight: 10,
    },
    markAll: {
        color: '#007BFF',
    },
    notificationItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    readNotification: {
        backgroundColor: '#f0f0f0',
        opacity: 0.5,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationBody: {
        fontSize: 14,
        color: '#555',
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 8,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NotificationsScreen;
