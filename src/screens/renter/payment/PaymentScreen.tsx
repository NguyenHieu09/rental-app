import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {
    createExtensionRequest,
    deposit,
    fetchAllTransactionsForRenter,
    payMonthlyRent,
} from '../../../api/contract';
import Button from '../../../components/button/Button';
import ConnectWalletModal from '../../../components/modal/ConnectWalletModal';
import ExtendContractModal from '../../../components/modal/ExtendContractModal';
import Tag from '../../../components/tag/Tag';
import { useSignMessageCustom } from '../../../hook/useSignMessageCustom';
import { RootState } from '../../../redux-toolkit/store';
import { commonStyles } from '../../../styles/theme';
import { ContractExtensionRequestType } from '../../../types/extensionRequest';
import {
    IDepositTransaction,
    ITransaction,
    TransactionStatus,
} from '../../../types/transaction';
import { getTransactionColor } from '../../../utils/colorTag';
import { formatDate } from '../../../utils/datetime';
import { formatPrice } from '../../../utils/formattedPrice';

const getStatusInVietnamese = (status: TransactionStatus): string => {
    if (status === 'PENDING') return 'Chờ thanh toán';
    if (status === 'COMPLETED') return 'Thành công';
    if (status === 'FAILED') return 'Thất bại';
    if (status === 'OVERDUE') return 'Quá hạn';
    if (status === 'CANCELLED') return 'Đã hủy';
    return 'Không xác định';
};

const PaymentScreen: React.FC = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paymentLoading, setPaymentLoading] = useState<{
        [key: string]: boolean;
    }>({});
    const { handleSign } = useSignMessageCustom();
    const { address } = useAccount();
    const { connectAsync, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const [extendModalVisible, setExtendModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<ITransaction | null>(null);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                console.log('Fetching transactions...');
                const data = await fetchAllTransactionsForRenter();

                setTransactions(data);
            } catch (error) {
                console.error('Error loading transactions:', error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu giao dịch.');
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    useEffect(() => {
        const verifyWalletAddress = async () => {
            if (address && user?.walletAddress) {
                if (address !== user.walletAddress) {
                    // Địa chỉ ví không khớp
                    await disconnectAsync();
                    setIsConnected(false);
                    setModalVisible(true);
                    Alert.alert(
                        'Thông báo',
                        'Địa chỉ ví không khớp với địa chỉ đã đăng ký. Vui lòng kết nối ví đúng.',
                    );
                } else {
                    // Địa chỉ ví khớp
                    setIsConnected(true);
                    setModalVisible(false); // Đóng modal nếu kết nối đúng
                }
            } else {
                // Chưa kết nối ví
                setIsConnected(false);
                setModalVisible(true);
            }
        };

        verifyWalletAddress();
    }, [address, user?.walletAddress, disconnectAsync]);

    const handlePayment = async (transaction: ITransaction) => {
        setPaymentLoading((prev) => ({ ...prev, [transaction.id]: true }));
        try {
            const signature = await handleSign({
                message: transaction.description,
            });
            const depositTransaction: IDepositTransaction = {
                transactionId: transaction.id,
                contractId: transaction.contractId,
                signature: signature,
            };

            if (transaction.type === 'RENT') {
                console.log(depositTransaction);
                await payMonthlyRent(depositTransaction);
                Alert.alert('Thành công', 'Thanh toán thành công');
            } else if (transaction.type === 'DEPOSIT') {
                await deposit(depositTransaction);
                Alert.alert('Thành công', 'Thanh toán thành công');
            } else {
                Alert.alert(
                    'Không thể thanh toán',
                    'Chỉ có thể thanh toán các giao dịch loại "RENT" hoặc "DEPOSIT".',
                );
                return;
            }

            // Cập nhật lại danh sách giao dịch sau khi thanh toán thành công
            const data = await fetchAllTransactionsForRenter();
            setTransactions(data);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Thanh toán thất bại', error.message);
            } else {
                Alert.alert(
                    'Thanh toán thất bại',
                    'Đã xảy ra lỗi không xác định',
                );
            }
        } finally {
            setPaymentLoading((prev) => ({ ...prev, [transaction.id]: false }));
        }
    };

    const handleExtend = (transaction: ITransaction) => {
        setSelectedTransaction(transaction);
        setExtendModalVisible(true);
    };

    const handleExtendConfirm = async (
        extensionDate: string,
        reason: string,
    ) => {
        if (!selectedTransaction) return;

        try {
            const extensionRequest = {
                contractId: selectedTransaction.contractId,
                type: 'EXTEND_PAYMENT' as ContractExtensionRequestType,
                extensionDate,
                transactionId: selectedTransaction.id,
                reason,
            };

            await createExtensionRequest(extensionRequest);
            Alert.alert(
                'Thành công',
                'Gửi yêu cầu gia hạn thanh toán thành công',
            );
        } catch (error: any) {
            console.error('Error creating extension request:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi yêu cầu gia hạn hóa đơn');
        } finally {
            setExtendModalVisible(false);
        }
    };

    const copyToClipboard = (transactionHash: string | null) => {
        if (transactionHash) {
            Clipboard.setString(transactionHash);
            Alert.alert(
                'Sao chép thành công',
                'Mã giao dịch đã được sao chép vào clipboard',
            );
        } else {
            Alert.alert('Sao chép thất bại', 'Mã giao dịch không hợp lệ');
        }
    };

    const renderItem: ListRenderItem<ITransaction> = ({ item }) => (
        <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Markdown
                style={{
                    body: styles.description,
                }}
            >
                {item.description}
            </Markdown>
            {item.status === 'COMPLETED' && (
                <View style={styles.transactionContainer}>
                    <Text style={styles.hash}>
                        Mã giao dịch:{' '}
                        <Text style={styles.fw600}>{item.transactionHash}</Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.copyButton}
                        onPress={() => copyToClipboard(item.transactionHash)}
                    >
                        <Icon name='content-copy' size={24} color='#007BFF' />
                    </TouchableOpacity>
                </View>
            )}
            <Text style={styles.amount}>
                Số tiền cần thanh toán:{' '}
                <Text style={styles.fw600}>{formatPrice(item.amount)}</Text>
            </Text>
            <Text style={styles.date}>
                Thời gian tạo:&nbsp;
                <Text style={styles.fw600}>{formatDate(item.createdAt)}</Text>
            </Text>
            {item.endDate && (
                <Text style={styles.dueDate}>
                    Hạn thanh toán:{' '}
                    <Text style={styles.fw600}>
                        00:00:00 {formatDate(item.endDate)}
                    </Text>
                </Text>
            )}

            <View style={styles.buttonContainer}>
                <Tag color={getTransactionColor(item.status)}>
                    {getStatusInVietnamese(item.status)}
                </Tag>
                {item.status === 'PENDING' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 8,
                        }}
                    >
                        <Button
                            variant='outlined'
                            onPress={() => handleExtend(item)}
                            disabled={item.status !== 'PENDING'}
                        >
                            Gia hạn
                        </Button>
                        <Button
                            type='primary'
                            variant='outlined'
                            onPress={() => handlePayment(item)}
                            disabled={item.status !== 'PENDING'}
                            loading={paymentLoading[item.id]}
                        >
                            Thanh toán
                        </Button>
                    </View>
                )}
                {/* <W3mButton /> */}
            </View>
        </View>
    );

    if (loading) {
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
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            {selectedTransaction && (
                <ExtendContractModal
                    visible={extendModalVisible}
                    onClose={() => setExtendModalVisible(false)}
                    onConfirm={handleExtendConfirm}
                    endDate={selectedTransaction.endDate || undefined}
                    type='EXTEND_PAYMENT'
                />
            )}

            <ConnectWalletModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    card: {
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    amount: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        marginBottom: 5,
    },
    dueDate: {
        fontSize: 14,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 130,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    containerStatus: {
        backgroundColor: '#E6F7FF',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#A0D3FF',
        width: 120,
        marginBottom: 10,
    },
    status: {
        color: '#007BFF',
        fontSize: 14,
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
        borderWidth: 0,
    },
    hash: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
        flex: 1,
    },
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyButton: {
        padding: 5,
    },
    copyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonTextDisabled: {
        color: '#fff',
    },
    fw600: {
        fontWeight: '600',
    },
});

export default PaymentScreen;
