import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { truncate } from '../../utils/truncate';
import { formatPrice } from '../../utils/formattedPrice';

interface PropertyCardProps {
    imageUrl: string;
    title: string;
    // rating: number;
    location: string;
    price: number;
    type: string;
}

const Properties: React.FC<PropertyCardProps> = ({ imageUrl, title, location, price, type }) => {

    const formattedPrice = formatPrice(price);
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{truncate(title, 25)}</Text>
                    {/* <Icon name="favorite" size={20} color="green" /> */}
                </View>
                {/* <Text style={styles.rating}>⭐ {rating}</Text> */}
                <Text style={styles.location}>{truncate(location, 30)}</Text>
                <Text style={styles.price}>{formattedPrice}/tháng</Text>
                <Text style={styles.type}>{type}</Text>
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
        margin: 10,

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
        fontSize: 18,
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
    type: {
        backgroundColor: '#E0F7FA',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        color: '#00796B',
    },
});

export default Properties;