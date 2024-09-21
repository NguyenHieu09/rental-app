import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardRenter: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Người Thuê</Text>
            {/* Thêm các thành phần khác cho màn hình người thuê */}
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

export default DashboardRenter;
