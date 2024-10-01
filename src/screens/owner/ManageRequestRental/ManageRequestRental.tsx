// import { format } from 'date-fns';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { commonStyles } from '../../../styles/theme';
// import { fetchRentalRequestsForOwner } from '../../../api/api';

// export type RentalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

// interface RentalRequest {
//     property: {
//         propertyId: string;
//         title: string;
//         images: string[];
//         slug: string;
//     };
//     requestId: string;
//     renterId: string;
//     ownerId: string;
//     status: RentalRequestStatus;
//     rentalPrice: number;
//     rentalDeposit: number;
//     rentalStartDate: string;
//     rentalEndDate: string;
//     createdAt: string;
//     updatedAt: string;
// }

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
//     const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalRequests, setTotalRequests] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const ITEMS_PER_PAGE = 10;

//     useEffect(() => {
//         const loadRentalRequests = async () => {
//             try {
//                 setLoading(true);
//                 const skip = currentPage * ITEMS_PER_PAGE;
//                 const { data, total } = await fetchRentalRequestsForOwner(ITEMS_PER_PAGE, skip);
//                 console.log('Rental requests:', data);
//                 setRentalRequests(data);
//                 setTotalRequests(total);
//             } catch (error) {
//                 console.error('Error fetching rental requests:', error);
//             } finally {
//                 setLoading(false);
//                 setIsLoadingMore(false);
//             }
//         };

//         loadRentalRequests();
//     }, [currentPage]);

//     const handlePageChange = (page: number) => {
//         setRentalRequests([]); // Clear current requests
//         setCurrentPage(page);
//     };

//     if (loading && currentPage === 0) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={commonStyles.container}>
//             <ScrollView>
//                 {loading ? (
//                     <Text style={styles.loadingText}>Đang tải...</Text>
//                 ) : rentalRequests.length > 0 ? (
//                     rentalRequests.map((request) => (
//                         <View key={request.requestId} style={styles.requestCard}>
//                             <View style={styles.containerRequest}>
//                                 <View>
//                                     <Image source={{ uri: request.property.images[0] }} style={styles.image} />
//                                 </View>
//                                 <View style={styles.details}>
//                                     <Text style={styles.propertyTitle}>{request.property.title}</Text>
//                                     <Text style={styles.price}>Giá thuê: {request.rentalPrice.toLocaleString()} đ</Text>
//                                     <Text style={styles.deposit}>Tiền cọc: {request.rentalDeposit.toLocaleString()} đ</Text>
//                                     <Text style={styles.dates}>
//                                         Từ: {format(new Date(request.rentalStartDate), 'dd/MM/yyyy')} - Đến: {format(new Date(request.rentalEndDate), 'dd/MM/yyyy')}
//                                     </Text>
//                                 </View>
//                             </View>
//                             <View>
//                                 <View style={styles.buttonContainer}>
//                                     <Text style={styles.status}>{getStatusInVietnamese(request.status)}</Text>
//                                     {request.status === 'PENDING' ? (
//                                         <>
//                                             <TouchableOpacity style={[styles.button, styles.rejectButton]} >
//                                                 <Text style={styles.buttonText}>Từ chối</Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity style={styles.button} >
//                                                 <Text style={styles.buttonText}>Chấp nhận</Text>
//                                             </TouchableOpacity>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
//                                                 <Text style={styles.buttonText}>Từ chối</Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
//                                                 <Text style={styles.buttonText}>Chấp nhận</Text>
//                                             </TouchableOpacity>
//                                         </>
//                                     )}
//                                 </View>
//                             </View>
//                         </View>
//                     ))
//                 ) : (
//                     <Text>Không có yêu cầu thuê nào.</Text>
//                 )}
//                 {isLoadingMore && <Text style={styles.loadingText}>Đang tải thêm...</Text>}
//             </ScrollView>
//             <View style={styles.paginationContainer}>
//                 <TouchableOpacity style={styles.pageButton} onPress={() => handlePageChange(0)}>
//                     <Text style={styles.pageButtonText}>1</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.pageButton} onPress={() => handlePageChange(1)}>
//                     <Text style={styles.pageButtonText}>2</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.pageButton} onPress={() => handlePageChange(2)}>
//                     <Text style={styles.pageButtonText}>3</Text>
//                 </TouchableOpacity>
//             </View>
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
//         backgroundColor: '#FF0000', // Màu đỏ cho nút "Từ chối"
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     disabledButton: {
//         backgroundColor: '#B0BEC5',
//     },
//     loadingText: {
//         textAlign: 'center',
//         marginVertical: 10,
//         fontSize: 16,
//         color: 'gray',
//     },
//     paginationContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginVertical: 10,
//     },
//     pageButton: {
//         backgroundColor: '#2196F3',
//         padding: 10,
//         borderRadius: 5,
//         marginHorizontal: 5,
//     },
//     pageButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default ManageRequestRental;


import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import { fetchRentalRequestsForOwner } from '../../../api/api';

export type RentalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

interface RentalRequest {
    property: {
        propertyId: string;
        title: string;
        images: string[];
        slug: string;
    };
    requestId: string;
    renterId: string;
    ownerId: string;
    status: RentalRequestStatus;
    rentalPrice: number;
    rentalDeposit: number;
    rentalStartDate: string;
    rentalEndDate: string;
    createdAt: string;
    updatedAt: string;
}

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
    const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const loadRentalRequests = async (page: number) => {
        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log(`Fetching data with skip: ${skip}`);
            const response = await fetchRentalRequestsForOwner(ITEMS_PER_PAGE, skip);
            console.log('API response:', response); // Ghi log toàn bộ dữ liệu trả về từ API

            const { data, pageInfo } = response;
            console.log('Fetched data:', data); // Ghi log dữ liệu nhận được
            console.log('Total requests:', pageInfo.total); // Ghi log tổng số yêu cầu

            if (pageInfo.total !== undefined) {
                setRentalRequests((prevRequests) => [...prevRequests, ...data]);
                setTotalRequests(pageInfo.total);
            } else {
                console.error('Total requests is undefined');
                Alert.alert('Error', 'Total requests is undefined.');
            }
        } catch (error) {
            console.error('Error fetching rental requests:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.'); // Hiển thị thông báo lỗi
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        loadRentalRequests(0);  // Load trang đầu tiên khi component được mount
    }, []);

    const loadMoreRequests = () => {
        console.log('Attempting to load more requests...');
        if (!isLoadingMore && rentalRequests.length < totalRequests) {
            console.log('Loading more requests...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadRentalRequests(nextPage);  // Load trang tiếp theo
        } else {
            console.log('No more requests to load or already loading.');
        }
    };

    const renderRentalRequest = ({ item }: { item: RentalRequest }) => (
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
                        Từ: {format(new Date(item.rentalStartDate), 'dd/MM/yyyy')} - Đến: {format(new Date(item.rentalEndDate), 'dd/MM/yyyy')}
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
                            <TouchableOpacity style={styles.button} >
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
                onEndReached={loadMoreRequests}  // Khi cuộn đến cuối sẽ tự động tải thêm dữ liệu
                onEndReachedThreshold={0.5}  // Khi còn 50% nữa đến cuối danh sách, bắt đầu tải thêm
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

