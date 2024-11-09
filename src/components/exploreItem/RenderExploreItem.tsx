import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IProperty } from '../../types/property';
import { createPropertyToFavorites } from '../../api/api';
import { PropertyInteractionType } from '../../types/propertyInteraction';
import FavoriteButton from '../customButton/FavoriteButton';

interface MemoizedRenderExploreItemProps {
    item: IProperty;
    navigation: NavigationProp<RootStackParamList>;
}

const RenderExploreItem: React.FC<MemoizedRenderExploreItemProps> = ({ item, navigation }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        console.log("item", item.isFavorite);

        setIsFavorite(item.isFavorite);
    }, [item.isFavorite]);


    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('PropertyScreen', { slug: item.slug });
            }}
        >
            <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.itemAddress}>ĐC: {`${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ/tháng</Text>
                    {/* Hiển thị nút yêu thích với trạng thái của item */}
                    <FavoriteButton propertyId={item.propertyId} isFavorite={isFavorite} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    itemImage: {
        width: 100,
        height: '100%',
        borderRadius: 5,
        marginRight: 10,
        resizeMode: 'cover',
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
    },
    itemAddress: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default React.memo(RenderExploreItem);
