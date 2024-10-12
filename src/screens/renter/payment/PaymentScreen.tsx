import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { commonStyles } from '../../../styles/theme';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchAllTransactionsForRenter, deposit, payMonthlyRent } from '../../../api/contract';
import { IDepositTransaction, ITransaction, TransactionStatus } from '../../../types/transaction';

const getStatusInVietnamese = (status: TransactionStatus): string => {
    switch (status) {
        case 'PENDING':
            return 'Đang chờ thanh toán';
        case 'COMPLETED':
            return 'Hoàn thành';
        case 'FAILED':
            return 'Thất bại';
        case 'OVERDUE':
            return 'Quá hạn';
        case 'CANCELLED':
            return 'Đã hủy';
        default:
            return status;
    }
};

const PaymentScreen: React.FC = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchAllTransactionsForRenter();

                setTransactions(data);
            } catch (error) {
                console.error('Error loading transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const handlePayment = async (transaction: ITransaction) => {
        try {
            const depositTransaction: IDepositTransaction = { transactionId: transaction.id, contractId: transaction.contractId };

            if (transaction.type === 'RENT') {
                console.log(depositTransaction);

                await payMonthlyRent(depositTransaction);
                Alert.alert('Thanh toán tiền thuê tháng thành công');
            } else if (transaction.type === 'DEPOSIT') {
                await deposit(depositTransaction);
                Alert.alert('Thanh toán tiền cọc thành công');
            } else {
                Alert.alert('Không thể thanh toán', 'Chỉ có thể thanh toán các giao dịch loại "RENT" hoặc "DEPOSIT".');
                return;
            }

            // Cập nhật lại danh sách giao dịch sau khi thanh toán thành công
            const data = await fetchAllTransactionsForRenter();
            setTransactions(data);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Thanh toán thất bại', error.message);
            } else {
                Alert.alert('Thanh toán thất bại', 'Đã xảy ra lỗi không xác định');
            }
        }
    };
    // const handlePayment = async (transactionId: number, contractId: string) => {
    //     try {
    //         const depositTransaction: IDepositTransaction = { transactionId, contractId };
    //         await deposit(depositTransaction);
    //         Alert.alert('Thanh toán thành công');
    //         // Cập nhật lại danh sách giao dịch sau khi thanh toán thành công
    //         const data = await fetchAllTransactionsForRenter();
    //         setTransactions(data);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             Alert.alert('Thanh toán thất bại', error.message);
    //         } else {
    //             Alert.alert('Thanh toán thất bại', 'Đã xảy ra lỗi không xác định');
    //         }
    //     }
    // };

    const copyToClipboard = (transactionHash: string | null) => {
        if (transactionHash) {
            Clipboard.setString(transactionHash);
            Alert.alert('Sao chép thành công', 'Mã giao dịch đã được sao chép vào clipboard');
        } else {
            Alert.alert('Sao chép thất bại', 'Mã giao dịch không hợp lệ');
        }
    };

    const renderItem: ListRenderItem<ITransaction> = ({ item }) => (
        <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>Số tiền cần thanh toán: {item.amount.toLocaleString()} đ</Text>
            <Text style={styles.date}>Thời gian tạo: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.dueDate}>Hạn thanh toán: {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A'}</Text>
            {item.status === 'COMPLETED' && (
                <View style={styles.transactionContainer}>
                    <Text style={styles.hash}>Mã giao dịch: {item.transactionHash}</Text>
                    <TouchableOpacity
                        style={styles.copyButton}
                        onPress={() => copyToClipboard(item.transactionHash)}
                    >
                        <Icon name="content-copy" size={24} color="#007BFF" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <View style={styles.containerStatus}>
                    <Text style={styles.status}>{getStatusInVietnamese(item.status)}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, item.status !== 'PENDING' && styles.buttonDisabled]}
                    onPress={() => handlePayment(item)}
                    disabled={item.status !== 'PENDING'}
                >
                    <Text style={styles.buttonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            // contentContainerStyle={styles.container}
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
        // flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
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
    },
    status: {
        color: '#007BFF', // Màu chữ  
        fontSize: 14, // Kích thước chữ  
        textAlign: 'center', // Căn giữa chữ  
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    hash: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
        flex: 1
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

});

export default PaymentScreen;