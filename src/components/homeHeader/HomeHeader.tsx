// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { IconOutline, IconFill } from '@ant-design/icons-react-native';

// const HomeHeader: React.FC = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.locationContainer}>
//                 <IconFill name="environment" size={20} color="#000" />
//                 <Text style={styles.locationText}>Jakarta, Indonesia</Text>
//                 <IconOutline name="down" size={20} color="#000" />
//             </View>
//             <View style={styles.iconContainer}>
//                 <View style={styles.bellIconContainer}>
//                     <IconOutline name="bell" size={20} color="#000" />
//                     <View style={styles.notificationBadge}>
//                         <Text style={styles.badgeText}>3</Text>
//                     </View>
//                 </View>
//             </View>
//             <Image
//                 source={require('../../../assets/img/1.png')}
//                 style={styles.profileImage}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'space-between',
//     },
//     locationContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     locationText: {
//         marginHorizontal: 5,
//         fontSize: 16,
//     },
//     iconContainer: {
//         marginHorizontal: 10,
//     },
//     bellIconContainer: {
//         width: 40, // Kích thước vòng tròn
//         height: 40, // Kích thước vòng tròn
//         borderRadius: 20, // Bán kính để tạo vòng tròn
//         borderWidth: 2, // Độ dày đường viền
//         borderColor: '#000', // Màu của đường viền
//         justifyContent: 'center', // Căn giữa icon theo chiều dọc
//         alignItems: 'center', // Căn giữa icon theo chiều ngang
//         position: 'relative', // Để sử dụng position cho badge
//     },
//     notificationBadge: {
//         position: 'absolute', // Để đặt badge trên icon
//         right: -5, // Đặt badge lệch sang phải
//         top: -5, // Đặt badge lệch lên trên
//         backgroundColor: 'red', // Màu nền của badge
//         borderRadius: 10, // Bán kính của badge
//         width: 20, // Chiều rộng của badge
//         height: 20, // Chiều cao của badge
//         justifyContent: 'center', // Căn giữa chữ trong badge
//         alignItems: 'center', // Căn giữa chữ trong badge
//     },
//     badgeText: {
//         color: 'white', // Màu chữ trong badge
//         fontSize: 12, // Kích thước chữ trong badge
//         fontWeight: 'bold', // Độ đậm chữ
//     },
//     profileImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//     },
// });

// export default HomeHeader;


import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IconOutline, IconFill } from '@ant-design/icons-react-native';
import { truncate } from '../../utils/truncate';

interface HomeHeaderProps {
    location: string;
    avatar: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ location, avatar }) => {
    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <IconFill name="environment" size={20} color="#000" />
                <Text style={styles.locationText}>{truncate(location, 20)}</Text>
                <IconOutline name="down" size={20} color="#000" />
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.bellIconContainer}>
                    <IconOutline name="bell" size={20} color="#000" />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </View>
            </View>
            <Image
                source={{ uri: avatar }}
                style={styles.profileImage}
            />
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
});

export default HomeHeader;