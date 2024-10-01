import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { fetchNotifications } from '../../api/api';
import { truncate } from '../../utils/truncate';

interface HomeHeaderProps {
    location: string;
    avatar: string;
}

interface Notification {
    title: string;
    body: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ location, avatar }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [totalNotifications, setTotalNotifications] = useState(0);

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

    const handleNotificationPress = async () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            try {
                const data = await fetchNotifications(1, 10);
                setNotifications(data.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
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
                    <FlatList
                        data={notifications}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.notificationItem}>
                                <Text>{item.title}</Text>
                                <Text>{item.body}</Text>

                            </View>
                        )}
                    />
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
});

export default HomeHeader;