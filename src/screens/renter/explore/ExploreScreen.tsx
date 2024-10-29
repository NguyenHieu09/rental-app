import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchModal from '../../../components/modal/SearchModal';
import { fetchFilteredProperties } from '../../../api/api';
import { IProperty } from '../../../types/property';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { IconOutline } from '@ant-design/icons-react-native';

const ITEMS_PER_PAGE = 10;

const ExploreScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ExploreScreen'>>();
    const initialSearchText = route.params?.searchText || '';
    const [searchText, setSearchText] = useState<string>(initialSearchText);
    const [modalVisible, setModalVisible] = useState(false);
    const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const initialLoadRef = useRef(true);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadInitialProperties = async () => {
            if (initialLoadRef.current) {
                if (initialSearchText) {
                    setSearchText(initialSearchText);
                    await loadProperties(0, initialSearchText);
                } else {
                    await loadProperties(0);
                }
                initialLoadRef.current = false;
            } else {
                await loadProperties(0, initialSearchText);
            }
        };
        loadInitialProperties();
    }, [filters]);

    useFocusEffect(
        useCallback(() => {
            const loadPropertiesOnFocus = async () => {
                await loadProperties(0, searchText);
            };
            loadPropertiesOnFocus();
        }, [searchText])
    );

    const loadProperties = async (page: number, query?: string) => {
        try {
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log('Fetching properties with query:', query);
            const data = await fetchFilteredProperties(ITEMS_PER_PAGE, skip, filters, query);



            if (data && data.data) {
                if (page === 0) {
                    setExploreItems(data.data);
                } else {
                    setExploreItems((prevItems) => [...prevItems, ...data.data]);
                }
                console.log('Total items:', data.pageInfo.total);

                setTotalItems(data.pageInfo.total);
            } else {
                setExploreItems([]);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const loadMoreProperties = () => {
        if (!isLoadingMore && exploreItems.length < totalItems) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadProperties(nextPage, searchText);
        }
    };

    const handleApplyFilters = (appliedFilters: any) => {
        setFilters(appliedFilters);
        setModalVisible(false);
        setCurrentPage(0);
        setExploreItems([]);
        handleSearch();
    };

    const handleSearch = () => {
        console.log('Search button pressed with query:', searchText); // Debugging log
        setCurrentPage(0);
        loadProperties(0, searchText);
    };

    const filteredItems = exploreItems.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const MemoizedRenderExploreItem = React.memo(({ item }: { item: IProperty }) => {
        console.log('Rendering item with slug:', item.slug); // Debugging log

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
                    <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ/tháng</Text>
                </View>
            </TouchableOpacity>
        );
    });

    return (
        <View style={[commonStyles.container, { paddingTop: 70 }]}>
            <View style={styles.findContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm nhà, căn hộ..."
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <AntDesign name="search1" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
                    <AntDesign name="filter" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {loading && currentPage === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : exploreItems.length > 0 ? (
                <FlatList
                    data={exploreItems}
                    renderItem={({ item }) => <MemoizedRenderExploreItem item={item} />}
                    keyExtractor={(item) => item.propertyId}
                    onEndReached={loadMoreProperties}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoadingMore ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text style={styles.loadingText}>Đang tải thêm...</Text>
                        </View>
                    ) : null}
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
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
        resizeMode: 'cover'
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
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
});

export default ExploreScreen;

