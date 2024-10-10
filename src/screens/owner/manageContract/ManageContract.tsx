// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { commonStyles } from '../../../styles/theme';
// import { fetchRentalContractsForOwner } from '../../../api/contract';
// import { RootState } from '../../../redux-toolkit/store';
// import { useSelector } from 'react-redux';
// import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../../types/navigation';
// import { format } from 'date-fns';
// import { IContract, ContractStatus } from '../../../types/contract';

// const getStatusInVietnamese = (status: ContractStatus): string => {
//     switch (status) {
//         case 'WAITING':
//             return 'Đang chờ';
//         case 'DEPOSITED':
//             return 'Đã đặt cọc';
//         case 'ONGOING':
//             return 'Đang diễn ra';
//         case 'ENDED':
//             return 'Đã kết thúc';
//         case 'OVERDUE':
//             return 'Quá hạn';
//         case 'CANCELLED':
//             return 'Đã hủy';
//         case 'PENDING_CANCELLATION':
//             return 'Đang chờ hủy';
//         case 'UNILATERAL_CANCELLATION':
//             return 'Hủy đơn phương';
//         case 'APPROVED_CANCELLATION':
//             return 'Đã duyệt hủy';
//         case 'REJECTED_CANCELLATION':
//             return 'Từ chối hủy';
//         default:
//             return status;
//     }
// };

// const ManageContract = () => {
//     const [contracts, setContracts] = useState<IContract[]>([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalContracts, setTotalContracts] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const ITEMS_PER_PAGE = 10;

//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//     const user = useSelector((state: RootState) => state.user.user);

//     // Set to track unique contract IDs
//     const contractIds = new Set<string>();

//     const loadContracts = async (page: number) => {
//         try {
//             console.log(`Loading page ${page}...`);
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             console.log(`Fetching data with skip: ${skip}`);
//             const response = await fetchRentalContractsForOwner(ITEMS_PER_PAGE, skip);
//             // console.log('API response:', response);

//             const { contracts, total } = response;
//             console.log('Total contracts:', total);

//             if (total !== undefined) {
//                 // Filter out duplicate contracts
//                 const newContracts = contracts.filter((contract: IContract) => {
//                     if (contractIds.has(contract.contractId)) {
//                         return false;
//                     } else {
//                         contractIds.add(contract.contractId);
//                         return true;
//                     }
//                 });

//                 setContracts((prevContracts) => [...prevContracts, ...newContracts]);
//                 setTotalContracts(total);
//             } else {
//                 console.error('Total contracts is undefined');
//                 Alert.alert('Error', 'Total contracts is undefined.');
//             }
//         } catch (error) {
//             console.error('Error fetching contracts:', error);
//             Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//             console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
//         }
//     };

//     useEffect(() => {
//         loadContracts(0);
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             loadContracts(0);
//         }, [])
//     );

//     const loadMoreContracts = () => {
//         console.log('Attempting to load more contracts...');
//         if (!isLoadingMore && contracts.length < totalContracts) {
//             console.log('Loading more contracts...');
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadContracts(nextPage);
//         } else {
//             console.log('No more contracts to load or already loading.');
//         }
//     };

//     const renderContract = ({ item }: { item: IContract }) => (
//         <View key={item.contractId} style={styles.contractCard}>
//             <View style={styles.containerContract}>
//                 <View>

//                     {/* <Image source={{ uri: item.property.images[0] }} style={styles.image} /> */}
//                 </View>
//                 <View style={styles.details}>
//                     <Text style={styles.propertyTitle}>{item.property.title}</Text>
//                     <Text style={styles.price}>Giá thuê: {item.monthlyRent.toLocaleString()} đ</Text>
//                     <Text style={styles.deposit}>Tiền cọc: {item.depositAmount.toLocaleString()} đ</Text>
//                     <Text>Người thuê: {item.renter.name}</Text>

//                     <Text style={styles.dates}>
//                         Từ: {format(new Date(item.startDate), 'dd/MM/yyyy')}
//                     </Text>
//                     <Text style={styles.dates}>
//                         Đến: {format(new Date(item.endDate), 'dd/MM/yyyy')}
//                     </Text>
//                     <Text style={styles.status}>Trạng thái: {getStatusInVietnamese(item.status)}</Text>

//                 </View>
//             </View>
//             <View>
//                 <View style={styles.buttonContainer}>
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
//                 data={contracts}
//                 renderItem={renderContract}
//                 keyExtractor={(item) => item.contractId}
//                 onEndReached={loadMoreContracts}
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
//     contractCard: {
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
//     containerContract: {
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
//         // paddingHorizontal: 10,
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

// export default ManageContract;


import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import { fetchRentalContractsForOwner, fetchRentalContractsForRenter } from '../../../api/contract';
import { RootState } from '../../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { format } from 'date-fns';
import { IContract, ContractStatus } from '../../../types/contract';

const getStatusInVietnamese = (status: ContractStatus): string => {
    switch (status) {
        case 'WAITING':
            return 'Đang chờ';
        case 'DEPOSITED':
            return 'Đã đặt cọc';
        case 'ONGOING':
            return 'Đang diễn ra';
        case 'ENDED':
            return 'Đã kết thúc';
        case 'OVERDUE':
            return 'Quá hạn';
        case 'CANCELLED':
            return 'Đã hủy';
        case 'PENDING_CANCELLATION':
            return 'Đang chờ hủy';
        case 'UNILATERAL_CANCELLATION':
            return 'Hủy đơn phương';
        case 'APPROVED_CANCELLATION':
            return 'Đã duyệt hủy';
        case 'REJECTED_CANCELLATION':
            return 'Từ chối hủy';
        default:
            return status;
    }
};

const ManageContract = () => {
    const [contracts, setContracts] = useState<IContract[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalContracts, setTotalContracts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);

    // Set to track unique contract IDs
    const contractIds = new Set<string>();

    const loadContracts = async (page: number) => {
        if (!user) {
            Alert.alert('Error', 'User not found. Please log in again.');
            return;
        }

        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log(`Fetching data with skip: ${skip}`);

            let response;
            if (user.userTypes.includes('owner')) {
                response = await fetchRentalContractsForOwner(ITEMS_PER_PAGE, skip);
            } else if (user.userTypes.includes('renter')) {
                response = await fetchRentalContractsForRenter(ITEMS_PER_PAGE, skip);
            } else {
                throw new Error('Unknown user role');
            }

            const { contracts, total } = response;
            console.log('Total contracts:', total);

            if (total !== undefined) {
                // Filter out duplicate contracts
                const newContracts = contracts.filter((contract: IContract) => {
                    if (contractIds.has(contract.contractId)) {
                        return false;
                    } else {
                        contractIds.add(contract.contractId);
                        return true;
                    }
                });

                setContracts((prevContracts) => [...prevContracts, ...newContracts]);
                setTotalContracts(total);
            } else {
                console.error('Total contracts is undefined');
                Alert.alert('Error', 'Total contracts is undefined.');
            }
        } catch (error) {
            console.error('Error fetching contracts:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        if (user) {
            loadContracts(0);
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            if (user) {
                loadContracts(0);
            }
        }, [user])
    );

    const loadMoreContracts = () => {
        console.log('Attempting to load more contracts...');
        if (!isLoadingMore && contracts.length < totalContracts) {
            console.log('Loading more contracts...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadContracts(nextPage);
        } else {
            console.log('No more contracts to load or already loading.');
        }
    };

    const renderContract = ({ item }: { item: IContract }) => (
        <View key={item.contractId} style={styles.contractCard}>
            <View style={styles.containerContract}>
                <View>
                    {/* <Image source={{ uri: item.property.images[0] }} style={styles.image} /> */}
                </View>
                <View style={styles.details}>
                    <Text style={styles.propertyTitle}>{item.property.title}</Text>
                    <Text style={styles.price}>Giá thuê: {item.monthlyRent.toLocaleString()} đ</Text>
                    <Text style={styles.deposit}>Tiền cọc: {item.depositAmount.toLocaleString()} đ</Text>
                    {user && user.userTypes.includes('owner') ? (
                        <Text>Người thuê: {item.renter.name}</Text>
                    ) : (
                        <Text>Chủ nhà: {item.owner.name}</Text>
                    )}
                    <Text style={styles.dates}>
                        Từ: {format(new Date(item.startDate), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.dates}>
                        Đến: {format(new Date(item.endDate), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.status}>Trạng thái: {getStatusInVietnamese(item.status)}</Text>
                </View>
            </View>
            <View>
                <View style={styles.buttonContainer}>
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
                data={contracts}
                renderItem={renderContract}
                keyExtractor={(item) => item.contractId}
                onEndReached={loadMoreContracts}
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
    contractCard: {
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
    containerContract: {
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
        // paddingHorizontal: 10,
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

export default ManageContract;