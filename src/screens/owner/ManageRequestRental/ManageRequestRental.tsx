// import { format } from 'date-fns';
// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { commonStyles } from '../../../styles/theme';
// import { fetchRentalRequestsBySlug, fetchRentalRequestsForOwner, generateRentalContract } from '../../../api/api';
// import { RootState } from '../../../redux-toolkit/store';
// import { useSelector } from 'react-redux';
// import { IGenerateContractRequest, IRentalRequest } from '../../../types/rentalRequest';
// import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../../types/navigation';

// export type RentalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

// // interface RentalRequest {
// //     property: {
// //         propertyId: string;
// //         title: string;
// //         images: string[];
// //         slug: string;
// //     };
// //     requestId: string;
// //     renterId: string;
// //     ownerId: string;
// //     status: RentalRequestStatus;
// //     rentalPrice: number;
// //     rentalDeposit: number;
// //     rentalStartDate: string;
// //     rentalEndDate: string;
// //     createdAt: string;
// //     updatedAt: string;
// // }

// const getStatusInVietnamese = (status: RentalRequestStatus): string => {
//     switch (status) {
//         case 'PENDING':
//             return 'Chờ xác nhận';
//         case 'APPROVED':
//             return 'Đã chấp nhận';
//         case 'REJECTED':
//             return 'Đã từ chối';
//         case 'CANCELLED':
//             return 'Đã hủy';
//         default:
//             return status;
//     }
// };

// const ManageRequestRental = () => {
//     const [rentalRequests, setRentalRequests] = useState<IRentalRequest[]>([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalRequests, setTotalRequests] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const ITEMS_PER_PAGE = 10;

//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//     const user = useSelector((state: RootState) => state.user.user);

//     const loadRentalRequests = async (page: number) => {
//         try {
//             console.log(`Loading page ${page}...`);
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             console.log(`Fetching data with skip: ${skip}`);
//             const response = await fetchRentalRequestsForOwner(ITEMS_PER_PAGE, skip);
//             console.log('API response:', response);

//             const { data, pageInfo } = response;
//             // console.log('Fetched data:', data);
//             console.log('Total requests:', pageInfo.total);

//             if (pageInfo.total !== undefined) {
//                 setRentalRequests((prevRequests) => [...prevRequests, ...data]);
//                 setTotalRequests(pageInfo.total);
//             } else {
//                 console.error('Total requests is undefined');
//                 Alert.alert('Error', 'Total requests is undefined.');
//             }
//         } catch (error) {
//             console.error('Error fetching rental requests:', error);
//             Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//             console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
//         }
//     };

//     useEffect(() => {
//         loadRentalRequests(0);
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             loadRentalRequests(0);
//         }, [])
//     );

//     const loadMoreRequests = () => {
//         console.log('Attempting to load more requests...');
//         if (!isLoadingMore && rentalRequests.length < totalRequests) {
//             console.log('Loading more requests...');
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadRentalRequests(nextPage);
//         } else {
//             console.log('No more requests to load or already loading.');
//         }
//     };



//     const handleAcceptPress = async (item: IRentalRequest) => {
//         if (!user?.isVerified) {
//             Alert.alert('Error', 'Người dùng chưa được xác thực.');
//             return;
//         }
//         try {
//             const contractRequest: IGenerateContractRequest = {
//                 propertyId: item.property.propertyId,
//                 renterId: item.renterId,
//                 requestId: item.requestId
//             };
//             console.log('Contract Request:', contractRequest);

//             const contractData = await generateRentalContract(contractRequest);

//             navigation.navigate('ContractScreen', { contractData, requestId: item.requestId });
//         } catch (error) {
//             console.error('Error fetching rental request details:', error);
//             Alert.alert('Error', 'Có lỗi xảy ra khi lấy thông tin chi tiết yêu cầu thuê.');
//         }
//         // Handle the accept logic here
//     };

//     const renderRentalRequest = ({ item }: { item: IRentalRequest }) => (
//         <View key={item.requestId} style={styles.requestCard}>
//             <View style={styles.containerRequest}>
//                 <View>
//                     <Image source={{ uri: item.property.images[0] }} style={styles.image} />
//                 </View>
//                 <View style={styles.details}>
//                     <Text style={styles.propertyTitle}>{item.property.title}</Text>
//                     <Text style={styles.price}>Giá thuê: {item.rentalPrice.toLocaleString()} đ</Text>
//                     <Text style={styles.deposit}>Tiền cọc: {item.rentalDeposit.toLocaleString()} đ</Text>
//                     <Text style={styles.dates}>
//                         Từ: {format(new Date(item.rentalStartDate), 'dd/MM/yyyy')}
//                     </Text>
//                     <Text style={styles.dates}>
//                         Đến: {format(new Date(item.rentalEndDate), 'dd/MM/yyyy')}
//                     </Text>
//                 </View>
//             </View>
//             <View>
//                 <View style={styles.buttonContainer}>
//                     <Text style={styles.status}>{getStatusInVietnamese(item.status)}</Text>
//                     {item.status === 'PENDING' ? (
//                         <>
//                             <TouchableOpacity style={[styles.button, styles.rejectButton]} >
//                                 <Text style={styles.buttonText}>Từ chối</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.button} onPress={() => handleAcceptPress(item)}>
//                                 <Text style={styles.buttonText}>Chấp nhận</Text>
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <>
//                             <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
//                                 <Text style={styles.buttonText}>Từ chối</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
//                                 <Text style={styles.buttonText}>Chấp nhận</Text>
//                             </TouchableOpacity>
//                         </>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );

//     if (loading && currentPage === 0) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={commonStyles.container}>
//             <FlatList
//                 data={rentalRequests}
//                 renderItem={renderRentalRequest}
//                 keyExtractor={(item) => item.requestId}
//                 onEndReached={loadMoreRequests}
//                 onEndReachedThreshold={0.5}
//                 ListFooterComponent={isLoadingMore ? (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#0000ff" />
//                         <Text style={styles.loadingText}>Đang tải thêm...</Text>
//                     </View>
//                 ) : null}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     requestCard: {
//         backgroundColor: '#F5F4F8',
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 1,
//         elevation: 2,
//     },
//     containerRequest: {
//         flexDirection: 'row',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 8,
//         marginRight: 10,
//     },
//     details: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     propertyTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     status: {
//         marginTop: 10,
//         color: 'red',
//         fontSize: 14,
//         paddingHorizontal: 10,
//     },
//     price: {
//         marginTop: 5,
//     },
//     deposit: {
//         marginTop: 5,
//     },
//     dates: {
//         marginTop: 5,
//         color: 'gray',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//     },
//     button: {
//         backgroundColor: '#2196F3',
//         padding: 10,
//         borderRadius: 5,
//         flex: 1,
//         marginHorizontal: 5,
//         alignItems: 'center',
//     },
//     rejectButton: {
//         backgroundColor: '#FF0000',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     disabledButton: {
//         backgroundColor: '#B0BEC5',
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
// });

// export default ManageRequestRental;

import { format } from 'date-fns';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import { fetchRentalRequestsBySlug, fetchRentalRequestsForOwner, generateRentalContract } from '../../../api/api';
import { RootState } from '../../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { IGenerateContractRequest, IRentalRequest } from '../../../types/rentalRequest';
import { useFocusEffect, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';

export type RentalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

const getStatusInVietnamese = (status: RentalRequestStatus): string => {
    switch (status) {
        case 'PENDING':
            return 'Chờ xác nhận';
        case 'APPROVED':
            return 'Đã chấp nhận';
        case 'REJECTED':
            return 'Đã từ chối';
        case 'CANCELLED':
            return 'Đã hủy';
        default:
            return status;
    }
};

const ManageRequestRental = () => {
    const [rentalRequests, setRentalRequests] = useState<IRentalRequest[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);

    const loadRentalRequests = async (page: number) => {
        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log(`Fetching data with skip: ${skip}`);
            const response = await fetchRentalRequestsForOwner(ITEMS_PER_PAGE, skip);
            console.log('API response:', response);

            const { data, pageInfo } = response;
            console.log('Total requests:', pageInfo.total);

            if (pageInfo.total !== undefined) {
                if (page === 0) {
                    setRentalRequests(data);
                } else {
                    setRentalRequests((prevRequests) => [...prevRequests, ...data]);
                }
                setTotalRequests(pageInfo.total);
            } else {
                console.error('Total requests is undefined');
                Alert.alert('Error', 'Total requests is undefined.');
            }
        } catch (error) {
            console.error('Error fetching rental requests:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        loadRentalRequests(0);
    }, []);

    useFocusEffect(
        useCallback(() => {
            setRentalRequests([]);
            setCurrentPage(0);
            loadRentalRequests(0);
        }, [])
    );

    const loadMoreRequests = () => {
        console.log('Attempting to load more requests...');
        if (!isLoadingMore && rentalRequests.length < totalRequests) {
            console.log('Loading more requests...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadRentalRequests(nextPage);
        } else {
            console.log('No more requests to load or already loading.');
        }
    };

    const handleAcceptPress = async (item: IRentalRequest) => {
        if (!user?.isVerified) {
            Alert.alert('Error', 'Người dùng chưa được xác thực.');
            return;
        }
        try {
            const contractRequest: IGenerateContractRequest = {
                propertyId: item.property.propertyId,
                renterId: item.renterId,
                requestId: item.requestId
            };
            console.log('Contract Request:', contractRequest);

            const contractData = await generateRentalContract(contractRequest);

            navigation.navigate('ContractScreen', { contractData, requestId: item.requestId });
        } catch (error) {
            console.error('Error fetching rental request details:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi lấy thông tin chi tiết yêu cầu thuê.');
        }
    };

    const renderRentalRequest = ({ item }: { item: IRentalRequest }) => (
        <View key={item.requestId} style={styles.requestCard}>
            <View style={styles.containerRequest}>
                <View>
                    <Image source={{ uri: item.property.images[0] }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.propertyTitle}>{item.property.title}</Text>
                    <Text style={styles.price}>Giá thuê: {item.rentalPrice.toLocaleString()} đ</Text>
                    <Text style={styles.deposit}>Tiền cọc: {item.rentalDeposit.toLocaleString()} đ</Text>
                    <Text style={styles.dates}>
                        Từ: {format(new Date(item.rentalStartDate), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.dates}>
                        Đến: {format(new Date(item.rentalEndDate), 'dd/MM/yyyy')}
                    </Text>
                </View>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.status}>{getStatusInVietnamese(item.status)}</Text>
                    {item.status === 'PENDING' ? (
                        <>
                            <TouchableOpacity style={[styles.button, styles.rejectButton]} >
                                <Text style={styles.buttonText}>Từ chối</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleAcceptPress(item)}>
                                <Text style={styles.buttonText}>Chấp nhận</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
                                <Text style={styles.buttonText}>Từ chối</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
                                <Text style={styles.buttonText}>Chấp nhận</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );

    if (loading && currentPage === 0) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={rentalRequests}
                renderItem={renderRentalRequest}
                keyExtractor={(item) => item.requestId}
                onEndReached={loadMoreRequests}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoadingMore ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#0000ff" />
                        <Text style={styles.loadingText}>Đang tải thêm...</Text>
                    </View>
                ) : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    requestCard: {
        backgroundColor: '#F5F4F8',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    containerRequest: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    propertyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        marginTop: 10,
        color: 'red',
        fontSize: 14,
        paddingHorizontal: 10,
    },
    price: {
        marginTop: 5,
    },
    deposit: {
        marginTop: 5,
    },
    dates: {
        marginTop: 5,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#B0BEC5',
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
});

export default ManageRequestRental;