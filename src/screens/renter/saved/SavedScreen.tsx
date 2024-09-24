// SavedScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';

interface SavedItem {
    id: string;
    name: string;
}

const SavedScreen: React.FC = () => {
    const [savedItems, setSavedItems] = useState<SavedItem[]>([
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
    ]);

    const removeItem = (id: string) => {
        Alert.alert('Remove item', 'Are you sure you want to remove this item?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id));
                },
            },
        ]);
    };

    const renderSavedItem = ({ item }: { item: SavedItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            {savedItems.length > 0 ? (
                <FlatList
                    data={savedItems}
                    renderItem={renderSavedItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.emptyText}>No saved items.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default SavedScreen;
