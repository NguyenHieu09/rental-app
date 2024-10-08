// // // import React from 'react';
// // // import { View, Text, FlatList, StyleSheet } from 'react-native';
// // // import { Card } from 'react-native-paper';
// // // import { commonStyles } from '../../styles/theme';

// // // interface Transaction {
// // //     id: string;
// // //     description: string;
// // //     amount: number;
// // //     date: string;
// // // }

// // // const transactions: Transaction[] = [
// // //     { id: '1', description: 'Thanh toán tiền thuê tháng 10', amount: 0.3574, date: '01:59:47 05/10/2024' },
// // //     { id: '2', description: 'Thanh toán phí tạo hợp đồng', amount: -0.0051, date: '01:58:47 05/10/2024' },
// // //     { id: '3', description: 'Thanh toán tiền đặt cọc cho chủ nhà', amount: 0.3653, date: '17:12:01 04/10/2024' },
// // //     { id: '4', description: 'Thanh toán tiền thuê tháng 10', amount: 0.3652, date: '17:00:00 04/10/2024' },
// // // ];

// // // const Transactons: React.FC = () => {

// // //     const renderItem = ({ item }: { item: Transaction }) => (
// // //         <Card style={styles.transactionCard}>
// // //             <Text style={styles.transactionDescription}>{item.description}</Text>

// // //             <View style={styles.transactionContent}>
// // //                 <Text>Số tiền:21.500.000 ₫</Text>
// // //                 <Text style={item.amount >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
// // //                     {item.amount >= 0 ? `+ ${item.amount} ETH` : `${item.amount} ETH`}
// // //                 </Text>
// // //             </View>

// // //             <Text style={styles.transactionDate}>{item.date}</Text>
// // //         </Card>
// // //     );

// // //     return (
// // //         <View style={commonStyles.container}>

// // //             <FlatList
// // //                 data={transactions}
// // //                 renderItem={renderItem}
// // //                 keyExtractor={(item) => item.id}
// // //             />
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         padding: 20,
// // //         backgroundColor: '#fff',
// // //     },
// // //     balance: {
// // //         fontSize: 32,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10,
// // //     },
// // //     walletAddress: {
// // //         fontSize: 14,
// // //         color: '#888',
// // //         marginBottom: 20,
// // //     },
// // //     historyTitle: {
// // //         fontSize: 20,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10,
// // //     },
// // //     transactionCard: {
// // //         padding: 15,
// // //         marginBottom: 10,
// // //     },
// // //     transactionContent: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         alignItems: 'center',
// // //     },
// // //     transactionDescription: {
// // //         fontSize: 16,
// // //         flex: 1
// // //     },
// // //     transactionAmountPositive: {
// // //         color: 'green',
// // //         fontWeight: 'bold',
// // //     },
// // //     transactionAmountNegative: {
// // //         color: 'red',
// // //         fontWeight: 'bold',
// // //     },
// // //     transactionDate: {
// // //         fontSize: 12,
// // //         color: '#888',
// // //     },
// // // });

// // // export default Transactons;


// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// // import { Card } from 'react-native-paper';
// // import { commonStyles } from '../../styles/theme';
// // import { fetchTransactions } from '../../api/api';
// // import { RouteProp, useRoute } from '@react-navigation/native';
// // import { RootStackParamList } from '../../types/navigation';
// // import { ITransaction } from '../../types/transaction';
// // // import { RootStackParamList } from '../../navigation/types'; // Adjust the import path as needed


// // // Define the type for the route prop
// // type TransactionsRouteProp = RouteProp<RootStackParamList, 'Transactions'>;

// // const Transactions: React.FC = () => {
// //     const route = useRoute<TransactionsRouteProp>();
// //     const { user } = route.params;
// //     const [transactions, setTransactions] = useState<ITransaction[]>([]);
// //     const [loading, setLoading] = useState<boolean>(true);



// //     useEffect(() => {
// //         const loadTransactions = async () => {
// //             try {
// //                 console.log(user.userId);

// //                 const { transactions } = await fetchTransactions(user.userId, 'ALL', 10, 0);
// //                 console.log('transactions:', transactions);

// //                 setTransactions(transactions);
// //             } catch (error) {
// //                 console.error('Failed to fetch transactions:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         loadTransactions();
// //     }, [user]);

// //     const renderItem = ({ item }: { item: ITransaction }) => {
// //         const amountEth = item.amountEth ?? 0; // Use 0 as a fallback value if amountEth is null or undefined

// //         return (
// //             <Card style={styles.transactionCard}>
// //                 <Text style={styles.transactionDescription}>{item.description}</Text>

// //                 <View style={styles.transactionContent}>
// //                     <Text>Số tiền: {item.amount.toLocaleString()} ₫</Text>
// //                     <Text style={amountEth >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
// //                         {amountEth >= 0 ? `+ ${amountEth} ETH` : `${amountEth} ETH`}
// //                     </Text>
// //                 </View>

// //                 <Text style={styles.transactionDate}>{new Date(item.createdAt).toLocaleString()}</Text>
// //             </Card>
// //         );
// //     };


// //     if (loading) {
// //         return (
// //             <View style={commonStyles.container}>
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             </View>
// //         );
// //     }

// //     return (
// //         <View style={commonStyles.container}>
// //             <FlatList
// //                 data={transactions}
// //                 renderItem={renderItem}
// //                 keyExtractor={(item) => item.id.toString()}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 20,
// //         backgroundColor: '#fff',
// //     },
// //     transactionCard: {
// //         padding: 15,
// //         marginBottom: 10,
// //     },
// //     transactionContent: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //     },
// //     transactionDescription: {
// //         fontSize: 16,
// //         flex: 1
// //     },
// //     transactionAmountPositive: {
// //         color: 'green',
// //         fontWeight: 'bold',
// //     },
// //     transactionAmountNegative: {
// //         color: 'red',
// //         fontWeight: 'bold',
// //     },
// //     transactionDate: {
// //         fontSize: 12,
// //         color: '#888',
// //     },
// // });

// // export default Transactions;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { Card } from 'react-native-paper';
// import { commonStyles } from '../../styles/theme';
// // import { fetchTransactions } from '../../api/api';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../../types/navigation';
// import { ITransaction } from '../../types/transaction';
// import { fetchTransactions } from '../../api/contract';

// // Define the type for the route prop
// type TransactionsRouteProp = RouteProp<RootStackParamList, 'Transactions'>;

// const Transactions: React.FC = () => {
//     const route = useRoute<TransactionsRouteProp>();
//     const { user } = route.params;
//     const [transactions, setTransactions] = useState<ITransaction[]>([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalTransactions, setTotalTransactions] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const ITEMS_PER_PAGE = 10;

//     const loadTransactions = async (page: number) => {
//         try {
//             console.log(`Loading page ${page}...`);
//             if (page === 0) setLoading(true);
//             else setIsLoadingMore(true);

//             const skip = page * ITEMS_PER_PAGE;
//             console.log(`Fetching data with skip: ${skip}`);
//             const response = await fetchTransactions(user.userId, 'ALL', ITEMS_PER_PAGE, skip);
//             console.log('API response:', response);

//             const { transactions, total } = response;
//             console.log('Fetched transactions:', transactions);
//             console.log('Total transactions:', total);

//             if (total !== undefined) {
//                 setTransactions((prevTransactions) => [...prevTransactions, ...transactions]);
//                 setTotalTransactions(total);
//             } else {
//                 console.error('Total transactions is undefined');
//                 Alert.alert('Error', 'Total transactions is undefined.');
//             }
//         } catch (err: any) {
//             console.error('Error fetching transactions:', err);
//             setError(err.message);
//             Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
//         } finally {
//             setLoading(false);
//             setIsLoadingMore(false);
//             console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
//         }
//     };

//     useEffect(() => {
//         loadTransactions(0);
//     }, [user]);

//     const loadMoreTransactions = () => {
//         console.log('Attempting to load more transactions...');
//         if (!isLoadingMore && transactions.length < totalTransactions) {
//             console.log('Loading more transactions...');
//             const nextPage = currentPage + 1;
//             setCurrentPage(nextPage);
//             loadTransactions(nextPage);
//         } else {
//             console.log('No more transactions to load or already loading.');
//         }
//     };

//     const renderItem = ({ item }: { item: ITransaction }) => {
//         const amountEth = item.amountEth ?? 0; // Use 0 as a fallback value if amountEth is null or undefined

//         return (
//             <Card style={styles.transactionCard}>
//                 <Text style={styles.transactionDescription}>{item.description}</Text>

//                 <View style={styles.transactionContent}>
//                     <Text>Số tiền: {item.amount.toLocaleString()} ₫</Text>
//                     <Text style={amountEth >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
//                         {amountEth >= 0 ? `+ ${amountEth} ETH` : `${amountEth} ETH`}
//                     </Text>
//                 </View>

//                 <Text style={styles.transactionDate}>{new Date(item.createdAt).toLocaleString()}</Text>
//             </Card>
//         );
//     };

//     if (loading && currentPage === 0) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (error) {
//         return <Text>Error: {error}</Text>; // Display the error message
//     }

//     return (
//         <View style={commonStyles.container}>
//             <FlatList
//                 data={transactions}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()}
//                 onEndReached={loadMoreTransactions}  // Load more transactions when reaching the end
//                 onEndReachedThreshold={0.5}  // Start loading more when 50% away from the end
//                 ListFooterComponent={isLoadingMore ? (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#0000ff" />
//                         <Text style={styles.loadingText}>Đang tải thêm...</Text>
//                     </View>
//                 ) : null}
//             // contentContainerStyle={styles.list}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     transactionCard: {
//         padding: 15,
//         marginBottom: 10,
//     },
//     transactionContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     transactionDescription: {
//         fontSize: 16,
//         flex: 1
//     },
//     transactionAmountPositive: {
//         color: 'green',
//         fontWeight: 'bold',
//     },
//     transactionAmountNegative: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     transactionDate: {
//         fontSize: 12,
//         color: '#888',
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

// export default Transactions;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { commonStyles } from '../../styles/theme';
import { fetchTransactions } from '../../api/contract';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { ITransaction } from '../../types/transaction';

// Define the type for the route prop
type TransactionsRouteProp = RouteProp<RootStackParamList, 'Transactions'>;

const Transactions: React.FC = () => {
    const route = useRoute<TransactionsRouteProp>();
    const { user } = route.params;
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
            const response = await fetchTransactions(user.userId, 'ALL', ITEMS_PER_PAGE, skip);
            // console.log('API response:', response);

            const { transactions, total } = response;
            // console.log('Fetched transactions:', transactions);
            console.log('Total transactions:', total);

            if (total !== undefined) {
                setTransactions((prevTransactions) => [...prevTransactions, ...transactions]);
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
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };


    useEffect(() => {
        loadTransactions(0);
    }, [user]);

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
        const amountEth = item.amountEth !== null && item.amountEth !== undefined ? item.amountEth.toFixed(4) : '0.0000'; // Format to 4 decimal places

        return (
            <Card style={styles.transactionCard}>
                <Text style={styles.transactionDescription}>{item.title}</Text>

                <View style={styles.transactionContent}>
                    <Text>Số tiền: {item.amount.toLocaleString()} ₫</Text>
                    <Text style={parseFloat(amountEth) >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                        {parseFloat(amountEth) >= 0 ? `+ ${amountEth} ETH` : `${amountEth} ETH`}
                    </Text>
                </View>

                <Text style={styles.transactionDate}>{new Date(item.updatedAt).toLocaleString()}</Text>
            </Card>
        );
    };

    if (loading && currentPage === 0) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
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
                onEndReached={loadMoreTransactions}  // Load more transactions when reaching the end
                onEndReachedThreshold={0.1}  // Start loading more when 10% away from the end
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

export default Transactions;