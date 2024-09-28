import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Property } from '../../types/navigation';
// import { Property } from '../../../types/navigation'; // Adjust the import path as needed

interface PropertyDetailProps {
    property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: property.images[0] }} style={styles.image} />
            <Text style={styles.title}>{property.title}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>4.5 ⭐</Text>
                <Text style={styles.reviewsCount}>(200 reviews)</Text>
            </View>
            <Text style={styles.details}>
                3 rooms - {property.address.street}, {property.address.ward}, {property.address.district}, {property.address.city} - 120 m²
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Watch Intro Video</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        marginRight: 4,
    },
    reviewsCount: {
        fontSize: 14,
        color: '#888',
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#6200ee',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PropertyDetail;