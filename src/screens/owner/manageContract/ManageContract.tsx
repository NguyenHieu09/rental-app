import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
    createCancelContractRequest,
    fetchContractsForOwner,
    fetchRentalContractsForRenter,
} from '../../../api/contract';
import CancelContractModal from '../../../components/modal/CancelContractModal';
import Tag from '../../../components/tag/Tag';
import { RootState } from '../../../redux-toolkit/store';
import { commonStyles } from '../../../styles/theme';
import { ContractStatus, IContract } from '../../../types/contract';
import { RootStackParamList } from '../../../types/navigation';
import { getContractColor } from '../../../utils/colorTag';
import { formatPrice } from '../../../utils/formattedPrice';

const getStatusInVietnamese = (status: ContractStatus): string => {
    if (status === 'WAITING') return 'Chờ xác nhận';
    if (status === 'DEPOSITED') return 'Đã đặt cọc';
    if (status === 'ONGOING') return 'Đang thuê';
    if (status === 'ENDED') return 'Đã kết thúc';
    if (status === 'OVERDUE') return 'Quá hạn';
    if (status === 'CANCELLED') return 'Đã hủy';
    if (status === 'PENDING_CANCELLATION') return 'Chờ xác nhận huỷ';
    if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
    if (status === 'APPROVED_CANCELLATION') return 'Chấp nhận huỷ';
    if (status === 'REJECTED_CANCELLATION') return 'Từ chối huỷ';
    return 'Không xác định';
};

const ManageContract = () => {
    const [contracts, setContracts] = useState<IContract[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalContracts, setTotalContracts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContract, setSelectedContract] = useState<IContract | null>(
        null,
    );
    const ITEMS_PER_PAGE = 10;
    let debounceTimeout: NodeJS.Timeout | null = null;

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
                response = await fetchContractsForOwner(ITEMS_PER_PAGE, skip);
            } else if (user.userTypes.includes('renter')) {
                response = await fetchRentalContractsForRenter(
                    ITEMS_PER_PAGE,
                    skip,
                );
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

                setContracts((prevContracts) => [
                    ...prevContracts,
                    ...newContracts,
                ]);
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
            console.log(
                'Loading state:',
                loading,
                'Is loading more:',
                isLoadingMore,
            );
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
        }, [user]),
    );

    const loadMoreContracts = () => {
        console.log('Attempting to load more contracts...');
        if (!isLoadingMore && contracts.length < totalContracts) {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(() => {
                console.log('Loading more contracts...');
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                loadContracts(nextPage);
            }, 300); // 300ms debounce time
        } else {
            console.log('No more contracts to load or already loading.');
        }
    };

    const handleCancelContract = (contract: IContract) => {
        setSelectedContract(contract);
        setModalVisible(true);
    };

    const confirmCancelContract = async (cancelDate: Date, reason: string) => {
        if (selectedContract) {
            try {
                await createCancelContractRequest({
                    contractId: selectedContract.contractId,
                    cancelDate: format(cancelDate, 'yyyy-MM-dd'),
                    reason,
                });
                Alert.alert(
                    'Thành công',
                    'Đã gửi yêu cầu hủy hợp đồng thành công',
                );
                setContracts((prevContracts) =>
                    prevContracts.filter(
                        (contract) =>
                            contract.contractId !== selectedContract.contractId,
                    ),
                );
            } catch (error) {
                Alert.alert(
                    'Lỗi',
                    'Có lỗi xảy ra khi gửi yêu cầu hủy hợp đồng',
                );
            } finally {
                setModalVisible(false);
                setSelectedContract(null);
            }
        }
    };

    const renderContract = ({ item }: { item: IContract }) => {
        const isCancellable =
            item.status === 'WAITING' ||
            item.status === 'DEPOSITED' ||
            item.status === 'ONGOING';

        return (
            <View key={item.contractId} style={styles.contractCard}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ContractDetails', {
                            contractId: item.contractId,
                        })
                    }
                >
                    <View style={styles.containerContract}>
                        <View>
                            {/* <Image source={{ uri: item.property.images[0] }} style={styles.image} /> */}
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.propertyTitle}>
                                {item.property.title}
                            </Text>
                            {user && user.userTypes.includes('owner') ? (
                                <Text>Người thuê: {item.renter.name}</Text>
                            ) : (
                                <Text>Chủ nhà: {item.owner.name}</Text>
                            )}
                            <Text style={styles.price}>
                                Giá: {formatPrice(item.monthlyRent)}
                            </Text>
                            <Text style={styles.deposit}>
                                Tiền cọc: {formatPrice(item.depositAmount)}
                            </Text>
                            <Text style={styles.dates}>
                                Ngày bắt đầu:{' '}
                                {format(new Date(item.startDate), 'dd/MM/yyyy')}
                            </Text>
                            <Text style={styles.dates}>
                                Ngày kết thúc:{' '}
                                {format(new Date(item.endDate), 'dd/MM/yyyy')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Tag color={getContractColor(item.status)}>
                        {getStatusInVietnamese(item.status)}
                    </Tag>
                    <TouchableOpacity
                        style={[
                            styles.cancelBtn,
                            isCancellable
                                ? styles.cancelBtnActive
                                : styles.cancelBtnDisabled, // Thêm kiểu cho nút bị vô hiệu hóa
                        ]}
                        onPress={() =>
                            isCancellable && handleCancelContract(item)
                        } // Chỉ xử lý hủy khi nút không bị vô hiệu
                        disabled={!isCancellable} // Vô hiệu hóa nút khi không thể hủy
                    >
                        <Text
                            style={[
                                commonStyles.buttonText,
                                isCancellable
                                    ? commonStyles.errorColor
                                    : {
                                          color: 'rgba(0,0,0,0.25)',
                                      },
                            ]}
                        >
                            Hủy hợp đồng
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading && currentPage === 0) {
        return (
            <View
                style={[
                    commonStyles.container,
                    { justifyContent: 'center', alignItems: 'center', flex: 1 },
                ]}
            >
                <ActivityIndicator size='large' color='#0000ff' />
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
                ListFooterComponent={
                    isLoadingMore ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size='small' color='#0000ff' />
                            <Text style={styles.loadingText}>
                                Đang tải thêm...
                            </Text>
                        </View>
                    ) : null
                }
            />

            {selectedContract && (
                <CancelContractModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onConfirm={confirmCancelContract}
                    contractId={selectedContract.contractId}
                    startDate={selectedContract.startDate}
                    endDate={selectedContract.endDate}
                    price={selectedContract.monthlyRent}
                    deposit={selectedContract.depositAmount}
                />
            )}
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
        gap: 6,
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
    price: {},
    deposit: {},
    dates: {},
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
    disabledButton: {
        backgroundColor: '#B0BEC5',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    cancelBtnActive: {
        borderColor: '#ff4d4f',
    },
    cancelBtnDisabled: {
        borderColor: '#d9d9d9',
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
});

export default ManageContract;
