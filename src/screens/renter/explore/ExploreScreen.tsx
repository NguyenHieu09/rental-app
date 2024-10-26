// // ExploreScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import { IconOutline, IconFill } from '@ant-design/icons-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchModal from '../../../components/modal/SearchModal';


interface ExploreItem {
    id: string;
    title: string;
    description: string;
}


const ExploreScreen: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [exploreItems, setExploreItems] = useState<ExploreItem[]>([
        { id: '1', title: 'Item 1', description: 'This is item 1 description.' },
        { id: '2', title: 'Item 2', description: 'This is item 2 description.' },
        { id: '3', title: 'Item 3', description: 'This is item 3 description.' },
        { id: '4', title: 'Item 4', description: 'This is item 4 description.' },
    ]);
    const [filters, setFilters] = useState<any>({});

    const handleApplyFilters = (appliedFilters: any) => {
        setFilters(appliedFilters);
        setModalVisible(false);
        // Apply the filters to the exploreItems here if needed
        console.log('Applied Filters:', appliedFilters);
    };

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
        <View style={[commonStyles.container, { paddingTop: 30 }]}>
            <View style={styles.findContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm nhà, căn hộ..."
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    <IconOutline name="search" size={20} color="#000" />

                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
                    <AntDesign name="filter" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    renderItem={renderExploreItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
            )}

            <SearchModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onApplyFilters={handleApplyFilters}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    findContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        flex: 1
    },
    searchInput: {
        flex: 1,
        height: 40,
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
    condition: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    textCondition: {
        fontSize: 14,
        marginLeft: 5,
        color: '#555',
    },
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,

    },
});

export default ExploreScreen;
