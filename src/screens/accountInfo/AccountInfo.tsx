// // AccountInfo.tsx
// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux-toolkit/store';
// import { commonStyles } from '../../styles/theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { getFirstAndLastName } from '../../utils/avatar';

// const AccountInfo = () => {
//     const user = useSelector((state: RootState) => state.user.user);

//     return (
//         <SafeAreaView style={commonStyles.container}>
//             <View style={commonStyles.header}>
//                 {user?.avatar ? (
//                     <Image source={{ uri: user.avatar }} style={styles.avatar} />
//                 ) : (
//                     user?.name && (
//                         <View style={styles.nameInitials}>
//                             <Text style={styles.initials}>{getFirstAndLastName(user.name)}</Text>
//                         </View>
//                     )
//                 )}
//                 <Text style={styles.name}>{user?.name || 'Guest'}</Text>
//                 <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
//             </View>
//             <View style={styles.infoContainer}>
//                 <Text style={styles.label}>Tên:</Text>
//                 <Text style={styles.value}>{user?.name || 'N/A'}</Text>
//                 <Text style={styles.label}>Email:</Text>
//                 <Text style={styles.value}>{user?.email || 'N/A'}</Text>
//                 <Text style={styles.label}>Số điện thoại:</Text>
//                 <Text style={styles.value}>{user?.phoneNumber || 'N/A'}</Text>
//                 {/* Add more fields as needed */}
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         backgroundColor: '#ccc',
//         marginBottom: 10,
//     },
//     name: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     email: {
//         fontSize: 14,
//         color: '#666',
//     },
//     infoContainer: {
//         marginTop: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
//     value: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
//     nameInitials: {
//         backgroundColor: '#f4f4f5',
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     initials: {
//         fontSize: 30,
//         fontWeight: '500',
//         color: '#09090b',
//     },
// });

// export default AccountInfo;


// AccountInfo.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import { COLORS, commonStyles, SIZES } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirstAndLastName } from '../../utils/avatar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IconOutline } from '@ant-design/icons-react-native';

const accountOptions = [
    { id: '1', title: 'Chỉnh sửa thông tin', icon: 'user' },
    { id: '2', title: 'Cập nhật mật khẩu', icon: 'lock' },
    { id: '3', title: 'Xác thực tài khoản', icon: 'idcard' },
];

const AccountInfo = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: { id: string, title: string, icon: string } }) => (
        <TouchableOpacity
            style={styles.option}
            onPress={() => {
                if (item.id === '1') {
                    navigation.navigate('PersonalInfo');
                } else if (item.id === '2') {
                    navigation.navigate('UpdatePassword');
                } else if (item.id === '3') {
                    navigation.navigate('AuthenticationScreen');
                }
            }}
        >
            <IconOutline name={item.icon as any} size={20} style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={commonStyles.header}>
                {user?.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                ) : (
                    user?.name && (
                        <View style={styles.nameInitials}>
                            <Text style={styles.initials}>{getFirstAndLastName(user.name)}</Text>
                        </View>
                    )
                )}
                <Text style={styles.name}>{user?.name || 'Guest'}</Text>
                <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
            </View>
            <FlatList
                data={accountOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        // justifyContent: 'center' as 'center',
        backgroundColor: COLORS.secondary,
    },
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
    nameInitials: {
        backgroundColor: '#f4f4f5',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    initials: {
        fontSize: 30,
        fontWeight: '500',
        color: '#09090b',
    },
});

export default AccountInfo;