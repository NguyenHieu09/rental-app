// // import React, { useEffect, useState } from 'react';
// // import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
// // import PropertyItem from '../../../components/properties/PropertyItem';
// // import { deleteProperty, fetchPropertiesWithFilters } from '../../../api/api';
// // import { IProperty, IFilterProperty } from '../../../types/property';
// // import { commonStyles } from '../../../styles/theme';

// // const ManageProperty: React.FC = () => {
// //     const [properties, setProperties] = useState<IProperty[]>([]);
// //     const [currentPage, setCurrentPage] = useState(0);
// //     const [totalProperties, setTotalProperties] = useState(0);
// //     const [loading, setLoading] = useState(true);
// //     const [isLoadingMore, setIsLoadingMore] = useState(false);
// //     const [error, setError] = useState<string | null>(null); // Define the error state
// //     const ITEMS_PER_PAGE = 10;

// //     const loadProperties = async (page: number) => {
// //         try {
// //             console.log(`Loading page ${page}...`);
// //             if (page === 0) setLoading(true);
// //             else setIsLoadingMore(true);

// //             const skip = page * ITEMS_PER_PAGE;
// //             console.log(`Fetching data with skip: ${skip}`);
// //             const filters: IFilterProperty = {

// //             };
// //             const response = await fetchPropertiesWithFilters(filters, ITEMS_PER_PAGE, skip);
// //             // console.log('API response:', response);

// //             const { properties, total } = response;

// //             console.log('Total properties:', total);

// //             if (total !== undefined) {
// //                 setProperties((prevProperties) => [...prevProperties, ...properties]);
// //                 setTotalProperties(total);
// //             } else {
// //                 console.error('Total properties is undefined');
// //                 Alert.alert('Error', 'Total properties is undefined.');
// //             }
// //         } catch (err: any) {
// //             console.error('Error fetching properties:', err);
// //             setError(err.message); // Set the error message
// //             Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
// //         } finally {
// //             setLoading(false);
// //             setIsLoadingMore(false);
// //             console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
// //         }
// //     };

// //     useEffect(() => {
// //         loadProperties(0);
// //     }, []);

// //     const loadMoreProperties = () => {
// //         console.log('Attempting to load more properties...');
// //         if (!isLoadingMore && properties.length < totalProperties) {
// //             console.log('Loading more properties...');
// //             const nextPage = currentPage + 1;
// //             setCurrentPage(nextPage);
// //             loadProperties(nextPage);
// //         } else {
// //             console.log('No more properties to load or already loading.');
// //         }
// //     };

// //     const handleDelete = async (id: string) => {
// //         console.log(`Delete property with id: ${id}`);
// //         try {
// //             const response = await deleteProperty(id);
// //             if (response.success) {
// //                 Alert.alert('Thành công', 'Xóa bất động sản thành công.');
// //                 setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
// //             } else {
// //                 Alert.alert('Lỗi', response.message);
// //             }
// //         } catch (error: any) {
// //             console.error('Error deleting property:', error);
// //             Alert.alert('Error', 'Có lỗi xảy ra khi xóa bất động sản.');
// //         }
// //     };



// //     if (loading && currentPage === 0) {
// //         return (
// //             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             </View>
// //         );
// //     }

// //     if (error) {
// //         return <Text>Error: {error}</Text>;
// //     }

// //     return (
// //         <View style={commonStyles.container}>
// //             <FlatList
// //                 data={properties}
// //                 renderItem={({ item }) => {
// //                     return <PropertyItem item={item} onDelete={handleDelete} />;
// //                 }}
// //                 keyExtractor={(item) => item.propertyId}
// //                 onEndReached={loadMoreProperties}  // Load more properties when reaching the end
// //                 onEndReachedThreshold={0.5}  // Start loading more when 50% away from the end
// //                 ListFooterComponent={isLoadingMore ? (
// //                     <View style={styles.loadingContainer}>
// //                         <ActivityIndicator size="small" color="#0000ff" />
// //                         <Text style={styles.loadingText}>Đang tải thêm...</Text>
// //                     </View>
// //                 ) : null}
// //                 contentContainerStyle={styles.list}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 20,
// //         backgroundColor: '#f8f9fa',
// //     },
// //     list: {
// //         paddingBottom: 20,
// //     },
// //     loadingContainer: {
// //         paddingVertical: 10,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     loadingText: {
// //         marginTop: 5,
// //         color: 'gray',
// //         fontSize: 16,
// //     },
// // });

// // export default ManageProperty;

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import PropertyItem from '../../../components/properties/PropertyItem';
// import { deleteProperty, fetchPropertiesWithFilters } from '../../../api/api';
// import { IProperty, IFilterProperty } from '../../../types/property';
// import { commonStyles } from '../../../styles/theme';

// const ManageProperty: React.FC = () => {
//     const [properties, setProperties] = useState<IProperty[]>([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalProperties, setTotalProperties] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
//     const [showCheckboxes, setShowCheckboxes] = useState(false); // State for checkbox visibility
//     const ITEMS_PER_PAGE = 10;
//     const navigation = useNavigation();

//     useEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <TouchableOpacity onPress={() => setShowCheckboxes(!showCheckboxes)}>
//                     <Ionicons name="eye-off" size={24} color="black" />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation, showCheckboxes]);

//     const loadProperties = async (page: number) => {
//         try {
//             console.log(`Loading page ${page}...`);
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             console.log(`Fetching data with skip: ${skip}`);
//             const filters: IFilterProperty = {};

//             const response = await fetchPropertiesWithFilters(filters, ITEMS_PER_PAGE, skip);

//             const { properties, total } = response;

//             console.log('Total properties:', total);

//             if (total !== undefined) {
//                 setProperties((prevProperties) => [...prevProperties, ...properties]);
//                 setTotalProperties(total);
//             } else {
//                 console.error('Total properties is undefined');
//                 Alert.alert('Error', 'Total properties is undefined.');
//             }
//         } catch (err: any) {
//             console.error('Error fetching properties:', err);
//             setError(err.message);
//             Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//             console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
//         }
//     };

//     useEffect(() => {
//         loadProperties(0);
//     }, []);

//     const loadMoreProperties = () => {
//         console.log('Attempting to load more properties...');
//         if (!isLoadingMore && properties.length < totalProperties) {
//             console.log('Loading more properties...');
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadProperties(nextPage);
//         } else {
//             console.log('No more properties to load or already loading.');
//         }
//     };

//     const handleDelete = async (id: string) => {
//         console.log(`Delete property with id: ${id}`);
//         try {
//             const response = await deleteProperty(id);
//             if (response.success) {
//                 Alert.alert('Thành công', 'Xóa bất động sản thành công.');
//                 setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
//             } else {
//                 Alert.alert('Lỗi', response.message);
//             }
//         } catch (error: any) {
//             console.error('Error deleting property:', error);
//             Alert.alert('Error', 'Có lỗi xảy ra khi xóa bất động sản.');
//         }
//     };

//     const handleSelect = (id: string) => {
//         setSelectedProperties((prevSelected) => {
//             if (prevSelected.includes(id)) {
//                 return prevSelected.filter((propertyId) => propertyId !== id);
//             } else {
//                 return [...prevSelected, id];
//             }
//         });
//     };

//     const handleHideSelected = async () => {
//         console.log('Hide selected properties:', selectedProperties);

//         // try {
//         //     const response = await hideProperties(selectedProperties);
//         //     if (response.success) {
//         //         Alert.alert('Thành công', 'Ẩn bất động sản thành công.');
//         //         setProperties((prevProperties) =>
//         //             prevProperties.filter((property) => !selectedProperties.includes(property.propertyId)),
//         //         );
//         //         setSelectedProperties([]);
//         //     } else {
//         //         Alert.alert('Lỗi', response.message);
//         //     }
//         // } catch (error: any) {
//         //     console.error('Error hiding properties:', error);
//         //     Alert.alert('Error', 'Có lỗi xảy ra khi ẩn bất động sản.');
//         // }
//     };

//     if (loading && currentPage === 0) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (error) {
//         return <Text>Error: {error}</Text>;
//     }

//     return (
//         <View style={commonStyles.container}>
//             <FlatList
//                 data={properties}
//                 renderItem={({ item }) => {
//                     return (
//                         <PropertyItem
//                             item={item}
//                             onDelete={handleDelete}
//                             onSelect={handleSelect}
//                             isSelected={selectedProperties.includes(item.propertyId)}
//                             showCheckboxes={showCheckboxes} // Pass the state to PropertyItem
//                         />
//                     );
//                 }}
//                 keyExtractor={(item) => item.propertyId}
//                 onEndReached={loadMoreProperties}
//                 onEndReachedThreshold={0.5}
//                 ListFooterComponent={isLoadingMore ? (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#0000ff" />
//                         <Text style={styles.loadingText}>Đang tải thêm...</Text>
//                     </View>
//                 ) : null}
//                 contentContainerStyle={styles.list}
//             />
//             {selectedProperties.length > 0 && (
//                 <TouchableOpacity style={styles.hideButton} onPress={handleHideSelected}>
//                     <Text style={styles.hideButtonText}>Ẩn các bất động sản đã chọn</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f8f9fa',
//     },
//     list: {
//         paddingBottom: 20,
//     },
//     loadingContainer: {
//         paddingVertical: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loadingText: {
//         marginTop: 5,
//         color: 'gray',
//         fontSize: 16,
//     },
//     hideButton: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         alignItems: 'center',
//         borderRadius: 5,
//         marginTop: 10,
//     },
//     hideButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default ManageProperty;


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PropertyItem from '../../../components/properties/PropertyItem';
import { deleteProperty, fetchPropertiesWithFilters, } from '../../../api/api';
import { IProperty, IFilterProperty } from '../../../types/property';
import { commonStyles } from '../../../styles/theme';
import Button from '../../../components/button/Button';

const ManageProperty: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false); // State for checkbox visibility
    const ITEMS_PER_PAGE = 10;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ right: 15 }} onPress={() => setShowCheckboxes(!showCheckboxes)}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Sửa</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, showCheckboxes]);

    const loadProperties = async (page: number) => {
        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log(`Fetching data with skip: ${skip}`);
            const filters: IFilterProperty = {};

            const response = await fetchPropertiesWithFilters(filters, ITEMS_PER_PAGE, skip);

            const { properties, total } = response;

            console.log('Total properties:', total);

            if (total !== undefined) {
                setProperties((prevProperties) => [...prevProperties, ...properties]);
                setTotalProperties(total);
            } else {
                console.error('Total properties is undefined');
                Alert.alert('Error', 'Total properties is undefined.');
            }
        } catch (err: any) {
            console.error('Error fetching properties:', err);
            setError(err.message);
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        loadProperties(0);
    }, []);

    const loadMoreProperties = () => {
        console.log('Attempting to load more properties...');
        if (!isLoadingMore && properties.length < totalProperties) {
            console.log('Loading more properties...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadProperties(nextPage);
        } else {
            console.log('No more properties to load or already loading.');
        }
    };

    const handleDelete = async (id: string) => {
        console.log(`Delete property with id: ${id}`);
        try {
            const response = await deleteProperty(id);
            if (response.success) {
                Alert.alert('Thành công', 'Xóa bất động sản thành công.');
                setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
            } else {
                Alert.alert('Lỗi', response.message);
            }
        } catch (error: any) {
            console.error('Error deleting property:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi xóa bất động sản.');
        }
    };

    const handleSelect = (id: string) => {
        setSelectedProperties((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((propertyId) => propertyId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleHideSelected = async () => {
        console.log('Hide selected properties:', selectedProperties);

        // try {
        //     const response = await hideProperties(selectedProperties);
        //     if (response.success) {
        //         Alert.alert('Thành công', 'Ẩn bất động sản thành công.');
        //         setProperties((prevProperties) =>
        //             prevProperties.filter((property) => !selectedProperties.includes(property.propertyId)),
        //         );
        //         setSelectedProperties([]);
        //     } else {
        //         Alert.alert('Lỗi', response.message);
        //     }
        // } catch (error: any) {
        //     console.error('Error hiding properties:', error);
        //     Alert.alert('Error', 'Có lỗi xảy ra khi ẩn bất động sản.');
        // }
    };

    const handleShowSelected = async () => {
        console.log('Show selected properties:', selectedProperties);

        // try {
        //     const response = await showProperties(selectedProperties);
        //     if (response.success) {
        //         Alert.alert('Thành công', 'Hiện bất động sản thành công.');
        //         setProperties((prevProperties) =>
        //             prevProperties.filter((property) => !selectedProperties.includes(property.propertyId)),
        //         );
        //         setSelectedProperties([]);
        //     } else {
        //         Alert.alert('Lỗi', response.message);
        //     }
        // } catch (error: any) {
        //     console.error('Error showing properties:', error);
        //     Alert.alert('Error', 'Có lỗi xảy ra khi hiện bất động sản.');
        // }
    };

    if (loading && currentPage === 0) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={properties}
                renderItem={({ item }) => {
                    return (
                        <PropertyItem
                            item={item}
                            onDelete={handleDelete}
                            onSelect={handleSelect}
                            isSelected={selectedProperties.includes(item.propertyId)}
                            showCheckboxes={showCheckboxes} // Pass the state to PropertyItem
                        />
                    );
                }}
                keyExtractor={(item) => item.propertyId}
                onEndReached={loadMoreProperties}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoadingMore ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#0000ff" />
                        <Text style={styles.loadingText}>Đang tải thêm...</Text>
                    </View>
                ) : null}
                contentContainerStyle={styles.list}
            />
            {selectedProperties.length > 0 && (
                <View style={styles.buttonContainer}>

                    <Button
                        style={styles.hideButton}
                        variant='outlined'
                        type='danger'
                        onPress={handleHideSelected}

                    >
                        Ẩn bất đông sản
                    </Button>
                    <Button
                        style={styles.showButton}
                        variant='fill'
                        type='primary'
                        onPress={handleShowSelected}
                    >
                        Hiện bất đông sản
                    </Button>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    list: {
        paddingBottom: 20,
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        justifyContent: 'space-between'
    },
    hideButton: {

        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    hideButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    showButton: {

        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    showButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ManageProperty;