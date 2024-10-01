// import { format } from 'date-fns';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
//     const ITEMS_PER_PAGE = 5;

//     useEffect(() => {
//         const loadRentalRequests = async () => {
//             try {
//                 const { data, total } = await fetchRentalRequestsForOwner(currentPage, ITEMS_PER_PAGE);
//                 console.log('Rental requests:', data);
//                 setRentalRequests(data);
//                 setTotalRequests(total); // Lưu tổng số yêu cầu
//             } catch (error) {
//                 console.error('Error fetching rental requests:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadRentalRequests();
//     }, [currentPage]);

//     const handleNextPage = () => {
//         if ((currentPage + 1) * ITEMS_PER_PAGE < totalRequests) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleCancelRequest = (requestId: string) => {
//         console.log(`Cancel request with ID: ${requestId}`);
//     };

//     const handleEReceipt = (requestId: string) => {
//         console.log(`Generate e-receipt for request ID: ${requestId}`);
//     };

//     if (loading) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={commonStyles.container}>
//             <ScrollView>
//                 {Array.isArray(rentalRequests) && rentalRequests.length > 0 ? (
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
//                                         Từ: {format(new Date(request.rentalStartDate), 'dd/MM/yyyy')} -
//                                         Đến: {format(new Date(request.rentalEndDate), 'dd/MM/yyyy')}
//                                     </Text>
//                                 </View>
//                             </View>
//                             <View>
//                                 <View style={styles.buttonContainer}>
//                                     <Text style={styles.status}>{getStatusInVietnamese(request.status)}</Text>
//                                     {request.status === 'PENDING' ? (
//                                         <>
//                                             <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleCancelRequest(request.requestId)}>
//                                                 <Text style={styles.buttonText}>Từ chối</Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity style={styles.button} onPress={() => handleEReceipt(request.requestId)}>
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
//             </ScrollView>
//             <View style={styles.pagination}>
//                 <Button title="Trước" onPress={handlePreviousPage} disabled={currentPage === 0} />
//                 <Button title="Sau" onPress={handleNextPage} disabled={(currentPage + 1) * ITEMS_PER_PAGE >= totalRequests} />
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
//     pagination: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 16,
//     },
// });

// export default ManageRequestRental;

import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        const loadRentalRequests = async () => {
            try {
                const { data, total } = await fetchRentalRequestsForOwner(currentPage, ITEMS_PER_PAGE);
                console.log('Rental requests:', data);
                setRentalRequests((prevRequests) => [...prevRequests, ...data]);
                setTotalRequests(total); // Lưu tổng số yêu cầu
            } catch (error) {
                console.error('Error fetching rental requests:', error);
            } finally {
                setLoading(false);
                setIsLoadingMore(false);
            }
        };

        loadRentalRequests();
    }, [currentPage]);

    const handleLoadMore = () => {
        if (!isLoadingMore && (currentPage + 1) * ITEMS_PER_PAGE < totalRequests) {
            setIsLoadingMore(true);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom) {
            handleLoadMore();
        }
    };

    const handleCancelRequest = (requestId: string) => {
        console.log(`Cancel request with ID: ${requestId}`);
    };

    const handleEReceipt = (requestId: string) => {
        console.log(`Generate e-receipt for request ID: ${requestId}`);
    };

    if (loading) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                {Array.isArray(rentalRequests) && rentalRequests.length > 0 ? (
                    rentalRequests.map((request) => (
                        <View key={request.requestId} style={styles.requestCard}>
                            <View style={styles.containerRequest}>
                                <View>
                                    <Image source={{ uri: request.property.images[0] }} style={styles.image} />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.propertyTitle}>{request.property.title}</Text>
                                    <Text style={styles.price}>Giá thuê: {request.rentalPrice.toLocaleString()} đ</Text>
                                    <Text style={styles.deposit}>Tiền cọc: {request.rentalDeposit.toLocaleString()} đ</Text>
                                    <Text style={styles.dates}>
                                        Từ: {format(new Date(request.rentalStartDate), 'dd/MM/yyyy')} -
                                        Đến: {format(new Date(request.rentalEndDate), 'dd/MM/yyyy')}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.status}>{getStatusInVietnamese(request.status)}</Text>
                                    {request.status === 'PENDING' ? (
                                        <>
                                            <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleCancelRequest(request.requestId)}>
                                                <Text style={styles.buttonText}>Từ chối</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button} onPress={() => handleEReceipt(request.requestId)}>
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
                    ))
                ) : (
                    <Text>Không có yêu cầu thuê nào.</Text>
                )}
                {isLoadingMore && <Text style={styles.loadingText}>Đang tải...</Text>}
            </ScrollView>
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
        backgroundColor: '#FF0000', // Màu đỏ cho nút "Từ chối"
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#B0BEC5',
    },
    loadingText: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        color: 'gray',
    },
});

export default ManageRequestRental;