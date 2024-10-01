import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Property } from '../../types/navigation';

interface PropertyItemProps {
    item: Property;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ item }) => {
    const { address, title, price, propertyId } = item;
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;

    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.propertyName}>{title}</Text>
                <Text style={styles.propertyLocation}>{location}</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Text style={styles.infoButtonText}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.iconRow}>
                    <TouchableOpacity>
                        <MaterialIcons name="edit" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.activePrice}>Active Price:</Text>
                <Text style={styles.activePrice}>${item.price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    propertyName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    propertyLocation: {
        fontSize: 16,
        color: '#555',
    },
    activePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    infoButton: {
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        borderColor: '#6a5acd',
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    infoButtonText: {
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PropertyItem;