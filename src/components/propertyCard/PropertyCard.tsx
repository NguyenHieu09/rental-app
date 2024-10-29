

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { IconOutline } from '@ant-design/icons-react-native';

// interface PropertyCardProps {
//     imageUrl: string;
//     title: string;
//     rating: number;
//     location: string;
//     price: number;
// }

// const PropertyCard: React.FC<PropertyCardProps> = ({ imageUrl, title, rating, location, price }) => {
//     return (
//         <View style={styles.card}>
//             <View style={styles.imageContainer}>
//                 <Image source={{ uri: imageUrl }} style={styles.image} />
//                 <Text style={styles.price}>${price}/month</Text>
//                 <IconOutline name="heart" size={24} color="white" style={styles.favoriteIcon} />
//             </View>
//             <View style={styles.infoContainer}>
//                 <Text style={styles.title}>{title}</Text>
//                 <Text style={styles.rating}>⭐ {rating}</Text>
//                 <Text style={styles.location}>{location}</Text>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         borderRadius: 10,
//         overflow: 'hidden',
//         backgroundColor: '#fff',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 2,
//         // margin: 10,
//         width: '48%', // Để hiển thị 2 cột  
//     },
//     imageContainer: {
//         position: 'relative',
//     },
//     image: {
//         width: '100%',
//         height: 200,
//     },
//     price: {
//         position: 'absolute',
//         bottom: 10,
//         right: 10,
//         backgroundColor: '#00BFFF',
//         color: 'white',
//         padding: 5,
//         borderRadius: 5,
//         fontWeight: 'bold',
//     },
//     favoriteIcon: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//     },
//     infoContainer: {
//         padding: 10,
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     rating: {
//         fontSize: 14,
//         color: '#666',
//     },
//     location: {
//         fontSize: 14,
//         color: '#666',
//     },
// });

// export default PropertyCard;

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline, IconFill } from '@ant-design/icons-react-native';
import { truncate } from '../../utils/truncate';
import { formatPrice } from '../../utils/formattedPrice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, } from '../../types/navigation';
import { IProperty } from '../../types/property';


interface PropertyCardProps {
    property: IProperty;
    onPress: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
    const { slug, images, title, address, price } = property;
    const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite); // Chuyển đổi trạng thái yêu thích
    };

    const formattedPrice = formatPrice(price);
    const imageUrl = images.length > 0 ? images[0] : '';
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;


    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.price}>{formattedPrice}/tháng</Text>
                <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteIcon}>
                    {isFavorite ? (
                        <IconFill name="heart" size={24} color="red" />
                    ) : (
                        <IconOutline name="heart" size={24} color="white" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >{title}</Text>

                <View style={styles.locationContainer}>
                    <IconOutline name="environment" size={16} color="#666" />
                    <Text style={styles.location}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >{location}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        width: '48%',
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
    },
    price: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#00BFFF',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationContainer: {
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
});

export default PropertyCard;