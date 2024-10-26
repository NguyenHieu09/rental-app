// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { commonStyles } from '../../../styles/theme';
// // // import AntDesign from 'react-native-vector-icons/AntDesign';
// // // import SearchModal from '../../../components/modal/SearchModal';
// // // import { fetchFilteredProperties } from '../../../api/api';
// // // import { IProperty } from '../../../types/property';

// // // const ExploreScreen: React.FC = () => {
// // //     const [searchText, setSearchText] = useState<string>('');
// // //     const [modalVisible, setModalVisible] = useState(false);
// // //     const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
// // //     const [filters, setFilters] = useState<any>({});
// // //     const [loading, setLoading] = useState<boolean>(false);

// // //     useEffect(() => {
// // //         const loadProperties = async () => {
// // //             setLoading(true);
// // //             try {
// // //                 const data = await fetchFilteredProperties(10, 0, filters);


// // //                 if (data && data.data) {
// // //                     setExploreItems(data.data);
// // //                 } else {
// // //                     setExploreItems([]);
// // //                 }
// // //             } catch (error) {
// // //                 console.error('Error loading properties:', error);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         loadProperties();
// // //     }, [filters]);

// // //     const handleApplyFilters = (appliedFilters: any) => {
// // //         setFilters(appliedFilters);
// // //         setModalVisible(false);
// // //         console.log('Applied Filters:', appliedFilters);
// // //     };

// // //     const filteredItems = exploreItems.filter((item) =>
// // //         item.title.toLowerCase().includes(searchText.toLowerCase())
// // //     );

// // //     const renderExploreItem = ({ item }: { item: IProperty }) => (
// // //         <TouchableOpacity style={styles.itemContainer}>
// // //             <Text style={styles.itemTitle}>{item.title}</Text>
// // //             <Text style={styles.itemDescription}>{item.description}</Text>
// // //         </TouchableOpacity>
// // //     );

// // //     return (
// // //         <View style={[commonStyles.container, { paddingTop: 30 }]}>
// // //             <View style={styles.findContainer}>
// // //                 <View style={styles.searchContainer}>
// // //                     <TextInput
// // //                         style={styles.searchInput}
// // //                         placeholder="Tìm kiếm nhà, căn hộ..."
// // //                         value={searchText}
// // //                         onChangeText={(text) => setSearchText(text)}
// // //                     />
// // //                     <AntDesign name="search1" size={20} color="#000" />
// // //                 </View>
// // //                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
// // //                     <AntDesign name="filter" size={24} color="#000" />
// // //                 </TouchableOpacity>
// // //             </View>

// // //             {loading ? (
// // //                 <Text style={styles.loadingText}>Đang tải...</Text>
// // //             ) : filteredItems.length > 0 ? (
// // //                 <FlatList
// // //                     data={filteredItems}
// // //                     renderItem={renderExploreItem}
// // //                     keyExtractor={(item) => item.propertyId}
// // //                 />
// // //             ) : (
// // //                 <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
// // //             )}

// // //             <SearchModal
// // //                 visible={modalVisible}
// // //                 onClose={() => setModalVisible(false)}
// // //                 onApplyFilters={handleApplyFilters}
// // //             />
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         padding: 10,
// // //         backgroundColor: '#fff',
// // //     },
// // //     findContainer: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //     },
// // //     searchContainer: {
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         borderColor: '#ccc',
// // //         borderWidth: 1,
// // //         borderRadius: 5,
// // //         marginBottom: 10,
// // //         paddingHorizontal: 10,
// // //         flex: 1,
// // //     },
// // //     searchInput: {
// // //         flex: 1,
// // //         height: 40,
// // //     },
// // //     itemContainer: {
// // //         padding: 15,
// // //         borderBottomWidth: 1,
// // //         borderBottomColor: '#ddd',
// // //         marginBottom: 10,
// // //     },
// // //     itemTitle: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //     },
// // //     itemDescription: {
// // //         fontSize: 14,
// // //         color: '#555',
// // //     },
// // //     emptyText: {
// // //         textAlign: 'center',
// // //         marginTop: 20,
// // //         fontSize: 16,
// // //     },
// // //     loadingText: {
// // //         textAlign: 'center',
// // //         marginTop: 20,
// // //         fontSize: 16,
// // //         color: '#555',
// // //     },
// // //     selectButton: {
// // //         alignItems: 'center',
// // //         justifyContent: 'center',
// // //         marginLeft: 5,
// // //     },
// // // });

// // // export default ExploreScreen;

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// // import { commonStyles } from '../../../styles/theme';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import SearchModal from '../../../components/modal/SearchModal';
// // import { fetchFilteredProperties } from '../../../api/api';
// // import { IProperty } from '../../../types/property';

// // const ITEMS_PER_PAGE = 10;

// // const ExploreScreen: React.FC = () => {
// //     const [searchText, setSearchText] = useState<string>('');
// //     const [modalVisible, setModalVisible] = useState(false);
// //     const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
// //     const [filters, setFilters] = useState<any>({});
// //     const [loading, setLoading] = useState<boolean>(false);
// //     const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
// //     const [currentPage, setCurrentPage] = useState<number>(0);
// //     const [totalItems, setTotalItems] = useState<number>(0);

// //     useEffect(() => {
// //         loadProperties(0);
// //     }, [filters]);

// //     const loadProperties = async (page: number) => {
// //         try {
// //             if (page === 0) setLoading(true);
// //             else setIsLoadingMore(true);

// //             const skip = page * ITEMS_PER_PAGE;
// //             const data = await fetchFilteredProperties(ITEMS_PER_PAGE, skip, filters);

// //             if (data && data.data) {
// //                 if (page === 0) {
// //                     setExploreItems(data.data);
// //                 } else {
// //                     setExploreItems((prevItems) => [...prevItems, ...data.data]);
// //                 }
// //                 setTotalItems(data.pageInfo.total);
// //             } else {
// //                 setExploreItems([]);
// //             }
// //         } catch (error) {
// //             console.error('Error loading properties:', error);
// //         } finally {
// //             setLoading(false);
// //             setIsLoadingMore(false);
// //         }
// //     };

// //     const loadMoreProperties = () => {
// //         if (!isLoadingMore && exploreItems.length < totalItems) {
// //             const nextPage = currentPage + 1;
// //             setCurrentPage(nextPage);
// //             loadProperties(nextPage);
// //         }
// //     };

// //     const handleApplyFilters = (appliedFilters: any) => {
// //         setFilters(appliedFilters);
// //         setModalVisible(false);
// //         setCurrentPage(0);
// //         setExploreItems([]);
// //     };

// //     const filteredItems = exploreItems.filter((item) =>
// //         item.title.toLowerCase().includes(searchText.toLowerCase())
// //     );

// //     const renderExploreItem = ({ item }: { item: IProperty }) => (
// //         <TouchableOpacity style={styles.itemContainer}>
// //             <Text style={styles.itemTitle}>{item.title}</Text>
// //             <Text style={styles.itemDescription}>{item.description}</Text>
// //         </TouchableOpacity>
// //     );

// //     return (
// //         <View style={[commonStyles.container, { paddingTop: 30 }]}>
// //             <View style={styles.findContainer}>
// //                 <View style={styles.searchContainer}>
// //                     <TextInput
// //                         style={styles.searchInput}
// //                         placeholder="Tìm kiếm nhà, căn hộ..."
// //                         value={searchText}
// //                         onChangeText={(text) => setSearchText(text)}
// //                     />
// //                     <AntDesign name="search1" size={20} color="#000" />
// //                 </View>
// //                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
// //                     <AntDesign name="filter" size={24} color="#000" />
// //                 </TouchableOpacity>
// //             </View>

// //             {loading && currentPage === 0 ? (
// //                 <View style={styles.loadingContainer}>
// //                     <ActivityIndicator size="large" color="#0000ff" />
// //                 </View>
// //             ) : filteredItems.length > 0 ? (
// //                 <FlatList
// //                     data={filteredItems}
// //                     renderItem={renderExploreItem}
// //                     keyExtractor={(item) => item.propertyId}
// //                     onEndReached={loadMoreProperties}
// //                     onEndReachedThreshold={0.5}
// //                     ListFooterComponent={isLoadingMore ? (
// //                         <View style={styles.loadingContainer}>
// //                             <ActivityIndicator size="small" color="#0000ff" />
// //                             <Text style={styles.loadingText}>Đang tải thêm...</Text>
// //                         </View>
// //                     ) : null}
// //                 />
// //             ) : (
// //                 <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
// //             )}

// //             <SearchModal
// //                 visible={modalVisible}
// //                 onClose={() => setModalVisible(false)}
// //                 onApplyFilters={handleApplyFilters}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 10,
// //         backgroundColor: '#fff',
// //     },
// //     findContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //     },
// //     searchContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         borderColor: '#ccc',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         marginBottom: 10,
// //         paddingHorizontal: 10,
// //         flex: 1,
// //     },
// //     searchInput: {
// //         flex: 1,
// //         height: 40,
// //     },
// //     itemContainer: {
// //         padding: 15,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ddd',
// //         marginBottom: 10,
// //     },
// //     itemTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     itemDescription: {
// //         fontSize: 14,
// //         color: '#555',
// //     },
// //     emptyText: {
// //         textAlign: 'center',
// //         marginTop: 20,
// //         fontSize: 16,
// //     },
// //     loadingText: {
// //         textAlign: 'center',
// //         marginTop: 20,
// //         fontSize: 16,
// //         color: '#555',
// //     },
// //     loadingContainer: {
// //         paddingVertical: 10,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     selectButton: {
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         marginLeft: 5,
// //     },
// // });

// // export default ExploreScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
// import { commonStyles } from '../../../styles/theme';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import SearchModal from '../../../components/modal/SearchModal';
// import { fetchFilteredProperties } from '../../../api/api';
// import { IProperty } from '../../../types/property';

// const ITEMS_PER_PAGE = 10;

// const ExploreScreen: React.FC = () => {
//     const [searchText, setSearchText] = useState<string>('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
//     const [filters, setFilters] = useState<any>({});
//     const [loading, setLoading] = useState<boolean>(false);
//     const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
//     const [currentPage, setCurrentPage] = useState<number>(0);
//     const [totalItems, setTotalItems] = useState<number>(0);

//     useEffect(() => {
//         loadProperties(0);
//     }, [filters]);

//     const loadProperties = async (page: number) => {
//         try {
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             const data = await fetchFilteredProperties(ITEMS_PER_PAGE, skip, filters);

//             if (data && data.data) {
//                 if (page === 0) {
//                     setExploreItems(data.data);
//                 } else {
//                     setExploreItems((prevItems) => [...prevItems, ...data.data]);
//                 }
//                 setTotalItems(data.pageInfo.total);
//             } else {
//                 setExploreItems([]);
//             }
//         } catch (error) {
//             console.error('Error loading properties:', error);
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//         }
//     };

//     const loadMoreProperties = () => {
//         if (!isLoadingMore && exploreItems.length < totalItems) {
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadProperties(nextPage);
//         }
//     };

//     const handleApplyFilters = (appliedFilters: any) => {
//         setFilters(appliedFilters);
//         setModalVisible(false);
//         setCurrentPage(0);
//         setExploreItems([]);
//     };

//     const filteredItems = exploreItems.filter((item) =>
//         item.title.toLowerCase().includes(searchText.toLowerCase())
//     );

//     const MemoizedRenderExploreItem = React.memo(({ item }: { item: IProperty }) => (
//         <TouchableOpacity style={styles.itemContainer}>
//             <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//                 <Text style={styles.itemTitle}>{item.title}</Text>
//                 <Text style={styles.itemDescription}>{item.description}</Text>
//                 <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ</Text>
//                 <Text style={styles.itemAddress}>{`${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}</Text>
//             </View>
//         </TouchableOpacity>
//     ));

//     return (
//         <View style={[commonStyles.container, { paddingTop: 30 }]}>
//             <View style={styles.findContainer}>
//                 <View style={styles.searchContainer}>
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholder="Tìm kiếm nhà, căn hộ..."
//                         value={searchText}
//                         onChangeText={(text) => setSearchText(text)}
//                     />
//                     <AntDesign name="search1" size={20} color="#000" />
//                 </View>
//                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
//                     <AntDesign name="filter" size={24} color="#000" />
//                 </TouchableOpacity>
//             </View>

//             {loading && currentPage === 0 ? (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size="large" color="#0000ff" />
//                 </View>
//             ) : filteredItems.length > 0 ? (
//                 <FlatList
//                     data={filteredItems}
//                     renderItem={({ item }) => <MemoizedRenderExploreItem item={item} />}
//                     keyExtractor={(item) => item.propertyId}
//                     onEndReached={loadMoreProperties}
//                     onEndReachedThreshold={0.5}
//                     ListFooterComponent={isLoadingMore ? (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size="small" color="#0000ff" />
//                             <Text style={styles.loadingText}>Đang tải thêm...</Text>
//                         </View>
//                     ) : null}
//                 />
//             ) : (
//                 <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
//             )}

//             <SearchModal
//                 visible={modalVisible}
//                 onClose={() => setModalVisible(false)}
//                 onApplyFilters={handleApplyFilters}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: '#fff',
//     },
//     findContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         flex: 1,
//     },
//     searchInput: {
//         flex: 1,
//         height: 40,
//     },
//     itemContainer: {
//         flexDirection: 'row',
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//         marginBottom: 10,
//     },
//     itemImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//     itemDetails: {
//         flex: 1,
//     },
//     itemTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     itemDescription: {
//         fontSize: 14,
//         color: '#555',
//     },
//     itemPrice: {
//         fontSize: 16,
//         color: '#007BFF',
//         marginTop: 5,
//     },
//     itemAddress: {
//         fontSize: 14,
//         color: '#555',
//         marginTop: 5,
//     },
//     emptyText: {
//         textAlign: 'center',
//         marginTop: 20,
//         fontSize: 16,
//     },
//     loadingText: {
//         textAlign: 'center',
//         marginTop: 20,
//         fontSize: 16,
//         color: '#555',
//     },
//     loadingContainer: {
//         paddingVertical: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     selectButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft: 5,
//     },
// });

// export default ExploreScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchModal from '../../../components/modal/SearchModal';
import { fetchFilteredProperties } from '../../../api/api';
import { IProperty } from '../../../types/property';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { IconOutline } from '@ant-design/icons-react-native';

const ITEMS_PER_PAGE = 10;

const ExploreScreen: React.FC = () => {
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
        loadProperties(0);
    }, [filters]);

    useFocusEffect(
        useCallback(() => {
            loadProperties(0);
        }, [filters])
    );

    const loadProperties = async (page: number) => {
        try {
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            const data = await fetchFilteredProperties(ITEMS_PER_PAGE, skip, filters);

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
            loadProperties(nextPage);
        }
    };

    const handleApplyFilters = (appliedFilters: any) => {
        setFilters(appliedFilters);
        setModalVisible(false);
        setCurrentPage(0);
        setExploreItems([]);
    };

    const filteredItems = exploreItems.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const MemoizedRenderExploreItem = React.memo(({ item }: { item: IProperty }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('PropertyScreen', { property: item })}
        >
            <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> */}
                {/* <IconOutline name="environment" size={20} color="#000" /> */}
                <Text style={styles.itemAddress}>ĐC: {`${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}</Text>

                {/* </View> */}
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ/tháng</Text>

            </View>
        </TouchableOpacity>
    ));

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
                    <AntDesign name="search1" size={20} color="#000" />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
                    <AntDesign name="filter" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {loading && currentPage === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        // color: '#007BFF',
        marginTop: 5,
    },
    itemAddress: {
        fontSize: 14,
        // color: '#555',
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