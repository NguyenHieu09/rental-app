

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, fetchUnreadNotificationsCount, } from '../../api/api';
// import { truncate } from '../../utils/avatar';
import * as Location from 'expo-location';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { readAllNotifications, setCount, setLoading, setNotifications } from '../../redux-toolkit/slices/notificationSlice';
import { INotification } from '../../types/notification';
import { RootStackParamList } from '../../types/navigation';
import { ITable } from '../../types/table';
import { commonStyles } from '../../styles/theme';
import { getFirstAndLastName } from '../../utils/avatar';
import Feather from 'react-native-vector-icons/Feather';


interface HomeHeaderProps {
    avatar?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ avatar }) => {

    const dispatch = useDispatch<AppDispatch>();
    const totalNotifications = useSelector((state: RootState) => state.notifications.notifications.pageInfo.total);
    const unreadCount = useSelector((state: RootState) => state.notifications.count);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // const [location, setLocation] = useState('Gò Vấp, Hồ Chí Minh, Việt Nam');
    const user = useSelector((state: RootState) => state.user.user);

    const ITEMS_PER_PAGE = 10;

    // Hàm gọi API cho vị trí
    // const getLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setLocation('Quyền truy cập vị trí bị từ chối');
    //         return;
    //     }

    //     let { coords } = await Location.getCurrentPositionAsync({});
    //     const { latitude, longitude } = coords;

    //     let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    //     if (reverseGeocode.length > 0) {
    //         const { formattedAddress } = reverseGeocode[0];
    //         setLocation(formattedAddress || 'Không tìm thấy vị trí');
    //     } else {
    //         setLocation('Không tìm thấy vị trí');
    //     }
    // };

    const loadUnreadNotificationsCount = async () => {
        dispatch(setLoading(true));

        try {
            const count = await fetchUnreadNotificationsCount();
            console.log(count);

            dispatch(setCount(count));
        } catch (error) {
            console.error("Failed to fetch unread notifications count:", error);
            alert("Có lỗi xảy ra khi tải số lượng thông báo chưa đọc.");
        } finally {
            dispatch(setLoading(false));
        }
    };




    useFocusEffect(
        useCallback(() => {
            loadUnreadNotificationsCount(); // Tải số lượng thông báo chưa đọc khi component mount
            // getLocation(); // Gọi API để lấy vị trí
        }, [])
    );


    const handleNotificationPress = () => {
        navigation.navigate('NotificationScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.textWelcome}>Chào mừng bạn đến với SmartRent!</Text>
                {/* <IconOutline name="environment" size={20} color="#000" /> */}
                {/* <Text style={styles.locationText} numberOfLines={1}>{location}</Text> */}
                {/* <IconOutline name="down" size={20} color="#000" /> */}
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
                <View style={styles.bellIconContainer}>
                    <Feather name="bell" size={24} color="#000" />
                    {/* <IconOutline name="bell" size={20} color="#000" /> */}
                    {unreadCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            ) : (
                user?.name && (
                    <View style={styles.nameInitials}>
                        <Text style={styles.initials}>{getFirstAndLastName(user.name)}</Text>
                    </View>
                )
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
        width: 200,
        fontSize: 16,
    },
    iconContainer: {
        // marginHorizontal: 5,
    },
    bellIconContainer: {
        width: 35,
        height: 35,
        borderRadius: 20,
        // borderWidth: 2,
        // borderColor: '#000',
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
    nameInitials: {
        backgroundColor: '#f4f4f5',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    initials: {
        fontSize: 16,
        fontWeight: '500',
        color: '#09090b',
    },
    textWelcome: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',

    }

});

export default HomeHeader;
