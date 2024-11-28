// // import React from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// // import { IProperty } from '../../types/property';
// // import { AntDesign } from '@expo/vector-icons';
// // import { Swipeable } from 'react-native-gesture-handler';
// // import { formatPrice } from '../../utils/formattedPrice';
// // import { RootStackParamList } from '../../types/navigation';
// // import { NavigationProp, useNavigation } from '@react-navigation/native';
// // import { getPropertyStatusColor } from '../../utils/colorTag';
// // import Tag from '../tag/Tag';

// // interface PropertyItemProps {
// //     item: IProperty;
// //     onDelete: (id: string) => void;
// // }

// // const statusMapping: { [key: string]: string } = {
// //     PENDING: 'Đang chờ duyệt',
// //     ACTIVE: 'Đã duyệt',
// //     INACTIVE: 'Đã ẩn',
// //     REJECTED: 'Đã từ chối',
// //     UNAVAILABLE: 'Đã cho thuê',
// // };

// // const PropertyItem: React.FC<PropertyItemProps> = ({ item, onDelete }) => {
// //     const { address, title, price, images, propertyId, status, slug } = item;
// //     const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
// //     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// //     const renderRightActions = () => {
// //         return (
// //             <View style={styles.buttonContainer}>
// //                 <TouchableOpacity
// //                     style={styles.deleteButton}
// //                     onPress={() => onDelete(propertyId)}
// //                 >
// //                     <AntDesign name='delete' size={24} color='white' />
// //                 </TouchableOpacity>
// //             </View>
// //         );
// //     };

// //     return (
// //         <Swipeable renderRightActions={renderRightActions}>
// //             <TouchableOpacity
// //                 style={styles.container}
// //                 onPress={() => {
// //                     navigation.navigate('PropertyDetail', { slug: slug });
// //                 }}
// //             >
// //                 <View style={styles.imageContainer}>
// //                     <Image source={{ uri: images[0] }} style={styles.image} />
// //                 </View>
// //                 <View style={styles.details}>
// //                     <Text style={styles.title} numberOfLines={2}>{title}</Text>
// //                     <View style={styles.row}>
// //                         <Text style={styles.location}>{location}</Text>
// //                     </View>
// //                     <View style={styles.row}>
// //                         {/* <Text
// //                             style={[
// //                                 {
// //                                     color: getPropertyStatusColor(item.status),
// //                                     fontWeight: '400',
// //                                 },
// //                             ]}
// //                         >
// //                             {statusMapping[item.status] || item.status}
// //                         </Text> */}
// //                         <Tag color={getPropertyStatusColor(item.status)}>
// //                             {statusMapping[item.status] || item.status}
// //                         </Tag>
// //                     </View>
// //                     <View style={styles.row}>
// //                         <Text style={styles.price}>
// //                             {formatPrice(price)}/tháng
// //                         </Text>
// //                     </View>
// //                 </View>
// //             </TouchableOpacity>
// //         </Swipeable>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: 'row',
// //         borderRadius: 18,
// //         overflow: 'hidden',
// //         backgroundColor: '#F5F4F8',
// //         elevation: 2,
// //         marginBottom: 10,
// //     },
// //     imageContainer: {
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         padding: 10,
// //         gap: 8,
// //     },
// //     image: {
// //         width: 150,
// //         height: 150,
// //         resizeMode: 'cover',
// //         borderRadius: 8,
// //     },
// //     details: {
// //         flex: 1,
// //         padding: 10,
// //         gap: 6,
// //     },
// //     title: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     location: {
// //         fontSize: 14,
// //         color: '#888',
// //     },
// //     price: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         color: '#2e7d32',
// //     },
// //     row: {
// //         flexDirection: 'row',
// //     },
// //     deleteButton: {
// //         backgroundColor: '#d9534f',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         width: 70,
// //         height: '90%',
// //         borderRadius: 20,
// //     },
// //     buttonContainer: {
// //         justifyContent: 'center',
// //     },
// // });

// // export default PropertyItem;


// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { IProperty } from '../../types/property';
// import { AntDesign } from '@expo/vector-icons';
// import { Swipeable } from 'react-native-gesture-handler';
// import { formatPrice } from '../../utils/formattedPrice';
// import { RootStackParamList } from '../../types/navigation';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { getPropertyStatusColor } from '../../utils/colorTag';
// import Tag from '../tag/Tag';
// import { Checkbox } from 'react-native-paper';

// interface PropertyItemProps {
//     item: IProperty;
//     onDelete: (id: string) => void;
//     onSelect: (id: string) => void;
//     isSelected: boolean;
//     showCheckboxes: boolean;
// }

// const statusMapping: { [key: string]: string } = {
//     PENDING: 'Đang chờ duyệt',
//     ACTIVE: 'Đã duyệt',
//     INACTIVE: 'Đã ẩn',
//     REJECTED: 'Đã từ chối',
//     UNAVAILABLE: 'Đã cho thuê',
// };

// const PropertyItem: React.FC<PropertyItemProps> = ({ item, onDelete, onSelect, isSelected, showCheckboxes }) => {
//     const { address, title, price, images, propertyId, status, slug } = item;
//     const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//     const renderRightActions = () => {
//         return (
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     style={styles.deleteButton}
//                     onPress={() => onDelete(propertyId)}
//                 >
//                     <AntDesign name='delete' size={24} color='white' />
//                 </TouchableOpacity>
//             </View>
//         );
//     };

//     return (
//         <Swipeable renderRightActions={renderRightActions}>
//             <View style={[styles.container, isSelected && styles.selectedContainer]}>
//                 {showCheckboxes && (
//                     <Checkbox
//                         status={isSelected ? 'checked' : 'unchecked'}
//                         onPress={() => onSelect(propertyId)}
//                     />
//                 )}
//                 <TouchableOpacity
//                     style={styles.touchableContainer}
//                     onPress={() => {
//                         navigation.navigate('PropertyDetail', { slug: slug });
//                     }}
//                 >
//                     <View style={styles.imageContainer}>
//                         <Image source={{ uri: images[0] }} style={styles.image} />
//                     </View>
//                     <View style={styles.details}>
//                         <Text style={styles.title} numberOfLines={2}>{title}</Text>
//                         <View style={styles.row}>
//                             <Text style={styles.location}>{location}</Text>
//                         </View>
//                         <View style={styles.row}>
//                             <Tag color={getPropertyStatusColor(item.status)}>
//                                 {statusMapping[item.status] || item.status}
//                             </Tag>
//                         </View>
//                         <View style={styles.row}>
//                             <Text style={styles.price}>
//                                 {formatPrice(price)}/tháng
//                             </Text>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </Swipeable>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         borderRadius: 18,
//         overflow: 'hidden',
//         backgroundColor: '#F5F4F8',
//         elevation: 2,
//         marginBottom: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     selectedContainer: {
//         backgroundColor: '#d3d3d3',
//     },
//     touchableContainer: {
//         flexDirection: 'row',
//         flex: 1,

//     },
//     imageContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 10,
//         gap: 8,
//     },
//     image: {
//         width: 150,
//         height: 150,
//         resizeMode: 'cover',
//         borderRadius: 8,
//     },
//     details: {
//         flex: 1,
//         padding: 10,
//         gap: 6,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     location: {
//         fontSize: 14,
//         color: '#888',
//     },
//     price: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#2e7d32',
//     },
//     row: {
//         flexDirection: 'row',
//     },
//     deleteButton: {
//         backgroundColor: '#d9534f',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 70,
//         height: '90%',
//         borderRadius: 20,
//     },
//     buttonContainer: {
//         justifyContent: 'center',
//     },
// });

// export default PropertyItem;

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IProperty } from '../../types/property';
import { AntDesign } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { formatPrice } from '../../utils/formattedPrice';
import { RootStackParamList } from '../../types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getPropertyStatusColor } from '../../utils/colorTag';
import Tag from '../tag/Tag';
import { Checkbox } from 'react-native-paper';

interface PropertyItemProps {
    item: IProperty;
    onDelete: (id: string) => void;
    onSelect: (id: string) => void;
    isSelected: boolean;
    showCheckboxes: boolean; // Add prop for checkbox visibility
}

const statusMapping: { [key: string]: string } = {
    PENDING: 'Đang chờ duyệt',
    ACTIVE: 'Đã duyệt',
    INACTIVE: 'Đã ẩn',
    REJECTED: 'Đã từ chối',
    UNAVAILABLE: 'Đã cho thuê',
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onDelete, onSelect, isSelected, showCheckboxes }) => {
    const { address, title, price, images, propertyId, status, slug } = item;
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const disabledStatuses = ['UNAVAILABLE', 'PENDING', 'REJECTED'];
    const renderRightActions = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(propertyId)}
                >
                    <AntDesign name='delete' size={24} color='white' />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={[styles.container, isSelected && styles.selectedContainer]}>
                {showCheckboxes && (
                    <Checkbox
                        color="#007BFF"
                        status={isSelected ? 'checked' : 'unchecked'}
                        onPress={() => !disabledStatuses.includes(status) && onSelect(propertyId)}
                        disabled={disabledStatuses.includes(status)}


                    />
                )}
                <TouchableOpacity
                    style={styles.touchableContainer}
                    onPress={() => {
                        navigation.navigate('PropertyDetail', { slug: slug });
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: images[0] }} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title} numberOfLines={2}>{title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.location}>{location}</Text>
                        </View>
                        <View style={styles.row}>
                            <Tag color={getPropertyStatusColor(item.status)}>
                                {statusMapping[item.status] || item.status}
                            </Tag>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>
                                {formatPrice(price)}/tháng
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#F5F4F8',
        elevation: 2,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedContainer: {
        backgroundColor: '#d3d3d3',
    },
    touchableContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 8,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    details: {
        flex: 1,
        padding: 10,
        gap: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#888',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    row: {
        flexDirection: 'row',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '90%',
        borderRadius: 20,
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    checkbox: {
        marginRight: 10,
    },
    // Kiểu khi checkbox có trạng thái ACTIVE
    activeCheckbox: {
        borderColor: 'green', // Màu viền khi checkbox đã chọn
    },
    // Kiểu khi checkbox có trạng thái INACTIVE
    inactiveCheckbox: {
        borderColor: 'gray', // Màu viền khi checkbox chưa chọn
    },
    // Kiểu cho checkbox khi bị vô hiệu hóa
    disabledCheckbox: {
        opacity: 0.5, // Giảm độ mờ khi checkbox bị vô hiệu hóa
    },
});

export default PropertyItem;