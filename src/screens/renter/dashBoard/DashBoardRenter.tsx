import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';


const DashboardRenter: React.FC = () => {
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
            <Text style={styles.title}>Dashboard Người Thuê</Text>
            {/* Thêm các thành phần khác cho màn hình người thuê */}
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

export default DashboardRenter;
