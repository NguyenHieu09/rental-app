import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import { commonStyles } from '../../../styles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchModal from '../../../components/modal/SearchModal';
import { fetchFilteredProperties } from '../../../api/api';
import { IProperty } from '../../../types/property';
import {
    NavigationProp,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import RenderExploreItem from '../../../components/exploreItem/RenderExploreItem';

const ITEMS_PER_PAGE = 10;

const ExploreScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ExploreScreen'>>();
    const city = route.params?.city;
    const [searchText, setSearchText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (city) {
            setExploreItems([]);
            setCurrentPage(0);
            loadProperties(0, searchText, city);
        }
    }, [city, filters, searchText]);

    useEffect(() => {
        const loadInitialProperties = async () => {
            const selectedCity = route.params?.city || '';
            setExploreItems([]);
            setCurrentPage(0);
            loadProperties(0, searchText, selectedCity);
        };
        loadInitialProperties();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setExploreItems([]);
            setCurrentPage(0);
            loadProperties(0, searchText, filters.city || city); // Sử dụng filters.city thay vì city trực tiếp
        }, [searchText, city, filters]), // Đảm bảo rằng filters được sử dụng chính xác
    );

    useEffect(() => {
        if (filters.city) {
            loadProperties(0, searchText, filters.city); // Gọi lại loadProperties khi filters.city thay đổi
        }
    }, [filters.city]); // Khi filters.city thay đổi, sẽ gọi lại loadProperties

    useFocusEffect(
        useCallback(() => {
            setExploreItems([]);
            setCurrentPage(0);
            loadProperties(0, searchText, city);
        }, [searchText, city, filters]),
    );

    const handleApplyFilters = (appliedFilters: any) => {
        const selectedCity = appliedFilters.city || city;
        setFilters({ ...filters, city: selectedCity, ...appliedFilters });
        setModalVisible(false);
        setCurrentPage(0);
        setExploreItems([]);
        loadProperties(0, searchText, selectedCity);
    };

    const loadProperties = async (
        page: number,
        query?: string,
        city?: string,
    ) => {
        try {
            if (page === 0) setLoading(true);
            // Set loading to true when fetching the first page
            else setIsLoadingMore(true); // Set loading more state to true when fetching more data

            const skip = page * ITEMS_PER_PAGE;
            const filter = city ? { ...filters, city } : filters;
            console.log('Đang load properties với bộ lọc:', filter);

            const data = await fetchFilteredProperties(
                ITEMS_PER_PAGE,
                skip,
                filter,
                query,
            );

            if (data && data.data) {
                setExploreItems((prevItems) =>
                    page === 0 ? data.data : [...prevItems, ...data.data],
                );
                setTotalItems(data.pageInfo.total);
                // console.log('Tổng số item: ', data.pageInfo.total);
            } else {
                setExploreItems([]);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false); // Set loading to false after the first fetch
            setIsLoadingMore(false); // Set loading more to false after fetching more data
        }
    };

    const loadMoreProperties = () => {
        if (!isLoadingMore && exploreItems.length < totalItems) {
            setCurrentPage((prevPage) => {
                const nextPage = prevPage + 1;
                // Kiểm tra xem nextPage có vượt quá số trang không
                if (nextPage * ITEMS_PER_PAGE < totalItems) {
                    loadProperties(nextPage, searchText, city);
                }
                return nextPage;
            });
        }
    };

    const handleSearch = () => {
        setCurrentPage(0);
        loadProperties(0, searchText);
    };

    return (
        <SafeAreaView style={[commonStyles.container]}>
            <View style={styles.findContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Tìm kiếm nhà, căn hộ...'
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <AntDesign name='search1' size={20} color='#000' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.selectButton}
                >
                    <AntDesign name='filter' size={26} color='#000' />
                </TouchableOpacity>
            </View>

            {loading && currentPage === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#0000ff' />
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            ) : exploreItems.length > 0 ? (
                <FlatList
                    data={exploreItems}
                    renderItem={({ item }) => (
                        <RenderExploreItem
                            item={item}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) =>
                        `${item.propertyId}-${index}`
                    }
                    onEndReached={loadMoreProperties}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator
                                    size='small'
                                    color='#0000ff'
                                />
                                <Text style={styles.loadingText}>
                                    Đang tải thêm...
                                </Text>
                            </View>
                        ) : null
                    }
                    ListHeaderComponent={<View style={{ height: 50 }} />}
                />
            ) : (
                <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
            )}

            <SearchModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onApplyFilters={handleApplyFilters}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        marginBottom: 10,
        zIndex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
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
        marginTop: 10,
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
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 0,
    },
});

export default ExploreScreen;
