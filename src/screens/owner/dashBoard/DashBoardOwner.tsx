import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardOwner: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Chủ Nhà</Text>
            {/* Thêm các thành phần khác cho màn hình chủ nhà */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default DashboardOwner;
