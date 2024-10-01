import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Menu } from 'react-native-paper';

const Notification = () => {
    const notifications = [
        { id: 1, message: 'Bạn có một yêu cầu thuê nhà mới từ HÀ TRÚC LAN', time: '2 ngày trước' },
        { id: 2, message: 'Bạn có một yêu cầu thuê nhà mới từ NGUYỄN THỊ TRUNG HIẾU', time: '7 ngày trước' },
        { id: 3, message: 'Bạn có một yêu cầu thuê nhà mới từ NGUYỄN THỊ TRUNG HIẾU', time: '10 ngày trước' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Thông báo</Text>
            {notifications.map(notification => (
                <View key={notification.id} style={styles.notificationItem}>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationMessage: {
        fontSize: 16,
        marginBottom: 5,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
});

export default Notification;
