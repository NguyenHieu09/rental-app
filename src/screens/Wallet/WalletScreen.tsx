import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { commonStyles } from '../../styles/theme';

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
}

const transactions: Transaction[] = [
    { id: '1', description: 'Thanh toán tiền thuê tháng 10', amount: 0.3574, date: '01:59:47 05/10/2024' },
    { id: '2', description: 'Thanh toán phí tạo hợp đồng', amount: -0.0051, date: '01:58:47 05/10/2024' },
    { id: '3', description: 'Thanh toán tiền đặt cọc cho chủ nhà', amount: 0.3653, date: '17:12:01 04/10/2024' },
    { id: '4', description: 'Thanh toán tiền thuê tháng 10', amount: 0.3652, date: '17:00:00 04/10/2024' },
];

const WalletScreen: React.FC = () => {
    const balance = 0.0;
    const walletAddress = '0xBF1cE2BbdF85189697C3C05ae971c44aFA360852'; // Replace with actual address  

    const renderItem = ({ item }: { item: Transaction }) => (
        <Card style={styles.transactionCard}>
            <Text style={styles.transactionDescription}>{item.description}</Text>

            <View style={styles.transactionContent}>
                <Text>Số tiền:21.500.000 ₫</Text>
                <Text style={item.amount >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                    {item.amount >= 0 ? `+ ${item.amount} ETH` : `${item.amount} ETH`}
                </Text>
            </View>

            <Text style={styles.transactionDate}>{item.date}</Text>
        </Card>
    );

    return (
        <View style={commonStyles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.balance}>{balance} ETH</Text>
                <Text style={styles.walletAddress}>Địa chỉ ví: {walletAddress}</Text>
            </View>
            <Text style={styles.historyTitle}>Lịch sử giao dịch</Text>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    balance: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    walletAddress: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionCard: {
        padding: 15,
        marginBottom: 10,
    },
    transactionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionDescription: {
        fontSize: 16,
        flex: 1
    },
    transactionAmountPositive: {
        color: 'green',
        fontWeight: 'bold',
    },
    transactionAmountNegative: {
        color: 'red',
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: 12,
        color: '#888',
    },
});

export default WalletScreen;