// ExploreScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface ExploreItem {
    id: string;
    title: string;
    description: string;
}

const ExploreScreen: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [exploreItems, setExploreItems] = useState<ExploreItem[]>([
        { id: '1', title: 'Item 1', description: 'This is item 1 description.' },
        { id: '2', title: 'Item 2', description: 'This is item 2 description.' },
        { id: '3', title: 'Item 3', description: 'This is item 3 description.' },
        { id: '4', title: ' 4', description: 'This is item 4 description.' },
    ]);

    const filteredItems = exploreItems.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderExploreItem = ({ item }: { item: ExploreItem }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container]}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />

            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    renderItem={renderExploreItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.emptyText}>No items found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 200,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default ExploreScreen;
