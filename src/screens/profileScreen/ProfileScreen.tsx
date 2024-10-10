// ProfileScreen.tsx  
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { commonStyles } from '../../styles/theme';
import { IconOutline } from '@ant-design/icons-react-native';
import { logoutUserAsync } from '../../redux-toolkit/slices/userSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

const options = [
    { id: '1', title: 'Ví', icon: 'wallet' },
    { id: '2', title: 'Thông tin tài khoản', icon: 'user' },
    { id: '3', title: 'Yêu cầu thuê nhà', icon: 'home' },
    { id: '4', title: 'Hợp đồng thuê nhà', icon: 'file-text' },
    { id: '5', title: 'Thanh toán hóa đơn', icon: 'dollar' },
    { id: '6', title: 'Cài đặt', icon: 'setting' },
];

const ProfileScreen = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogout = async () => {
        await dispatch(logoutUserAsync());
        navigation.navigate('Login');
    };
    const renderItem = ({ item }: { item: { id: string, title: string, icon: string } }) => (
        <TouchableOpacity
            style={styles.option}
            onPress={() => {
                if (item.id === '1') {
                    navigation.navigate('WalletManagement');
                } else if (item.id === '3') {
                    navigation.navigate('ManageRequestRental');
                } else if (item.id === '4') {
                    navigation.navigate('ManageContract');
                } else if (item.id === '5') {
                    navigation.navigate('PaymentScreen');
                }

            }}
        >
            <IconOutline name={item.icon as any} size={20} style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
        </TouchableOpacity>
    );

    // const renderItem = ({ item }: { item: { title: string, icon: string } }) => (
    //     <TouchableOpacity style={styles.option}>
    //         <IconOutline name={item.icon as any} size={20} style={styles.optionIcon} />
    //         <Text style={styles.optionText}>{item.title}</Text>
    //     </TouchableOpacity>
    // );

    if (loading) {
        return (
            <View style={commonStyles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Image source={{ uri: user?.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg' }} style={styles.avatar} />
                <Text style={styles.name}>{user?.name || 'Guest'}</Text>
                <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
            </View>
            <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <TouchableOpacity style={[commonStyles.button, styles.button]} onPress={handleLogout}>
                <Text style={commonStyles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    list: {
        flexGrow: 0,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionIcon: {
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
    },
    button: {
        marginTop: 30,
    }
});

export default ProfileScreen;