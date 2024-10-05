
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IProperty } from '../../types/property';
import { AntDesign } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

interface PropertyItemProps {
    item: IProperty;
    onDelete: (id: string) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onDelete }) => {
    const { address, title, price, images, propertyId } = item;
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;

    const renderRightActions = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(propertyId)} // Wrap onDelete with the propertyId
                >
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>

        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.price}>{price}/month</Text>
                    </View>
                </View>
            </View>
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