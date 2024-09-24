import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PropertyCardProps {
    imageUrl: string;
    title: string;
    rating: number;
    location: string;
    price: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ imageUrl, title, rating, location, price }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon name="favorite-border" size={20} color="green" />
                </View>
                <Text style={styles.rating}>⭐ {rating}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.price}>${price}/month</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 10,
        width: '48%', // Để hiển thị 2 cột  
    },
    image: {
        width: '100%',
        height: 150,
    },
    infoContainer: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 14,
        color: '#666',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
});

export default PropertyCard;