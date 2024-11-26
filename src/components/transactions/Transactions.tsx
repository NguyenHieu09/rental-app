import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { fetchTransactions } from '../../api/contract';
import { RootState } from '../../redux-toolkit/store';
import { commonStyles } from '../../styles/theme';
import { ITransaction } from '../../types/transaction';
import { formatDateTime } from '../../utils/datetime';
import { formatPrice } from '../../utils/formattedPrice';

// Define the type for the route prop
// type TransactionsRouteProp = RouteProp<RootStackParamList, 'Transactions'>;

const Transactions: React.FC = () => {
    // const route = useRoute<TransactionsRouteProp>();
    // const { user } = route.params;
    const user = useSelector((state: RootState) => state.user.user);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const ITEMS_PER_PAGE = 10;

    const loadTransactions = async (page: number) => {
        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            // console.log(`Fetching data with skip: ${skip}`);
            const response = await fetchTransactions(
                'ALL',
                ITEMS_PER_PAGE,
                skip,
            );
            // console.log('API response:', response);

            const { transactions, total } = response;
            // console.log('Fetched transactions:', transactions);
            console.log('Total transactions:', total);

            if (total !== undefined) {
                setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    ...transactions,
                ]);
                setTotalTransactions(total);
            } else {
                console.error('Total transactions is undefined');
                Alert.alert('Error', 'Total transactions is undefined.');
            }
        } catch (err: any) {
            console.error('Error fetching transactions:', err);
            setError(err.message);
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
        loadTransactions(0);
    }, []);

    const loadMoreTransactions = () => {
        console.log('Attempting to load more transactions...');
        if (!isLoadingMore && transactions.length < totalTransactions) {
            console.log('Loading more transactions...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadTransactions(nextPage);
        } else {
            console.log('No more transactions to load or already loading.');
        }
    };

    const renderItem = ({ item }: { item: ITransaction }) => {
        const amountEth =
            item.amountEth !== null && item.amountEth !== undefined
                ? item.amountEth.toFixed(4)
                : '0.0000'; // Format to 4 decimal places
        const isOutgoing = item.fromId === user?.userId;
        return (
            <Card style={styles.transactionCard}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.transactionDescription}>
                        {item.title}
                    </Text>
                </View>
                <Text style={styles.transactionDate}>
                    {formatDateTime(item.updatedAt)}
                </Text>
                <View style={styles.transactionContent}>
                    <Text
                        style={[
                            {
                                fontSize: 14,
                            },
                            isOutgoing ? styles.outColor : styles.inColor,
                        ]}
                    >
                        Số tiền: &nbsp;
                        <Text style={styles.fw600}>
                            {isOutgoing ? '-' : '+'}
                            {formatPrice(item.amount)}
                        </Text>
                    </Text>
                    {/* <Text style={parseFloat(amountEth) >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                        {parseFloat(amountEth) >= 0 ? `+ ${amountEth} ETH` : `${amountEth} ETH`}
                    </Text> */}
                    <Text
                        style={[
                            isOutgoing
                                ? styles.transactionAmountNegative
                                : styles.transactionAmountPositive,
                            isOutgoing ? styles.outColor : styles.inColor,
                        ]}
                    >
                        {isOutgoing ? `-${amountEth} ETH` : `+${amountEth} ETH`}
                    </Text>
                </View>
            </Card>
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

    if (error) {
        return <Text>Error: {error}</Text>; // Display the error message
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMoreTransactions} // Load more transactions when reaching the end
                onEndReachedThreshold={0.1} // Start loading more when 10% away from the end
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    titleWrapper: {
        marginBottom: 8,
    },
    transactionDescription: {
        fontSize: 16,
        flex: 1,
        fontWeight: 600,
        lineHeight: 24,
    },
    transactionAmountPositive: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
    },
    transactionAmountNegative: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
    },
    transactionDate: {
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(0, 0, 0, 0.45)',
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
    fw600: {
        fontWeight: 600,
    },
    outColor: {
        color: '#ff4d4f',
    },
    inColor: {
        color: '#52c41a',
    },
});

export default Transactions;
