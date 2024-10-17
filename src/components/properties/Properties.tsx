// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { truncate } from '../../utils/truncate';
// import { formatPrice } from '../../utils/formattedPrice';

// interface PropertiesProps {
//     property: IProperty;
//     onPress: () => void;
// }

// const Properties: React.FC<PropertiesProps> = ({ property, onPress }) => {
//     const formattedPrice = formatPrice(property.price);

//     return (
//         <View style={styles.card}>
//             <Image source={{ uri: imageUrl }} style={styles.image} />
//             <View style={styles.infoContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>{truncate(title, 25)}</Text>
//                     {/* <Icon name="favorite" size={20} color="green" /> */}
//                 </View>
//                 {/* <Text style={styles.rating}>⭐ {rating}</Text> */}
//                 <Text style={styles.location}>{truncate(location, 30)}</Text>
//                 <Text style={styles.price}>{formattedPrice}/tháng</Text>
//                 <Text style={styles.type}>{type}</Text>
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
//         margin: 10,

//     },
//     image: {
//         width: '100%',
//         height: 150,
//     },
//     infoContainer: {
//         padding: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 18,
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
//     price: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginVertical: 5,
//     },
//     type: {
//         backgroundColor: '#E0F7FA',
//         padding: 5,
//         borderRadius: 5,
//         textAlign: 'center',
//         color: '#00796B',
//     },
// });

// export default Properties;

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { truncate } from '../../utils/truncate';
import { formatPrice } from '../../utils/formattedPrice';
import { IProperty } from '../../types/property';

interface PropertiesProps {
    property: IProperty;
    onPress: () => void;
}

const Properties: React.FC<PropertiesProps> = ({ property, onPress }) => {
    const formattedPrice = formatPrice(property.price);
    // const attributeNames = property.attributes.map(attr => attr.name).join(', ');
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={{ uri: property.images[0] }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{truncate(property.title, 25)}</Text>
                </View>
                <Text style={styles.location}>{truncate(`${property.address.street}, ${property.address.ward}, ${property.address.district}, ${property.address.city}`, 30)}</Text>
                <Text style={styles.price}>{formattedPrice}/tháng</Text>
                <Text style={styles.type}>{property.type.name}</Text>
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