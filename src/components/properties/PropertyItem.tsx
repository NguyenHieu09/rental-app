
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IProperty } from '../../types/property';
import { AntDesign } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { formatPrice } from '../../utils/formattedPrice';
import { RootStackParamList } from '../../types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface PropertyItemProps {
    item: IProperty;
    onDelete: (id: string) => void;
}

const statusMapping: { [key: string]: string } = {
    PENDING: 'Đang chờ phê duyệt',
    ACTIVE: 'Đã phê duyệt',
    INACTIVE: 'Không được phê duyệt',
    REJECTED: 'Bị từ chối bởi quản trị viên',
    UNAVAILABLE: 'Đã cho thuê',
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onDelete }) => {
    const { address, title, price, images, propertyId, status, slug } = item;
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const renderRightActions = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(propertyId)}
                >
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>

        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity style={styles.container} onPress={() => {
                navigation.navigate('PropertyDetail', { slug: slug });
            }}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[{ color: 'red', fontWeight: '400' }]}>
                            {statusMapping[item.status] || item.status}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.price}>{formatPrice(price)}/tháng</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#F5F4F8',
        elevation: 2,
        marginBottom: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    details: {
        flex: 1,
        padding: 10,
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
    }
});

export default PropertyItem;