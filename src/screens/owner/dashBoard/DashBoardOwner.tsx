import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation'; // Import the type

const DashboardOwner: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use the type here
    const { user, loading } = useSelector((state: RootState) => state.user);

    const handleLogout = async () => {
        await dispatch(logoutUserAsync()).unwrap();
        navigation.navigate('Login');
    };

    useEffect(() => {
        if (!user && !loading) {
            navigation.navigate('Login');
        }
    }, [user, loading, navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Chủ Nhà</Text>
            <Button title="Đăng xuất" onPress={handleLogout} />
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