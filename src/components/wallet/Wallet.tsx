// // // import React from 'react';
// // // import { View, Text, StyleSheet } from 'react-native';

// // // const Wallet: React.FC = () => {
// // //     return (
// // //         <View style={styles.cardContainer}>
// // //             <Text style={styles.cardBalance}>2000000</Text>
// // //             <Text style={styles.cardNumber}>87937957973953</Text>
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     cardContainer: {
// // //         backgroundColor: '#8A2BE2',
// // //         borderRadius: 10,
// // //         padding: 20,
// // //         marginBottom: 20,
// // //     },
// // //     cardBalance: {
// // //         fontSize: 24,
// // //         color: '#fff',
// // //         fontWeight: 'bold',
// // //     },
// // //     cardNumber: {
// // //         fontSize: 16,
// // //         color: '#fff',
// // //         marginVertical: 10,
// // //     },
// // //     cardExpiry: {
// // //         fontSize: 14,
// // //         color: '#fff',
// // //     },
// // // });

// // // export default Wallet;

// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { MaterialIcons } from '@expo/vector-icons';


// // const Wallet: React.FC = () => {
// //     return (
// //         <View style={styles.cardContainer}>
// //             <Text style={styles.title}>Tài khoản thanh toán</Text>
// //             <Text style={styles.accountNumber}>89250208582</Text>
// //             <Text style={styles.balance}>Số dư khả dụng: 200000 VNĐ</Text>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     cardContainer: {
// //         backgroundColor: '#fff',
// //         borderRadius: 10,
// //         padding: 20,
// //         marginBottom: 20,
// //         borderWidth: 1,
// //         borderColor: 'orange',
// //         margin: 10

// //     },
// //     title: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     accountNumber: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     balance: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //     },
// //     iconContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         marginTop: 10,
// //     },
// // });

// // export default Wallet;

// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// // // // import { fetchAccountBalance } from './api';

// // // const Wallet: React.FC = () => {
// // //     const [balance, setBalance] = useState<number | null>(null);
// // //     const [loading, setLoading] = useState<boolean>(true);
// // //     const [error, setError] = useState<string | null>(null);


// // //     // if (loading) {
// // //     //     return <ActivityIndicator size="large" color="#0000ff" />;
// // //     // }

// // //     if (error) {
// // //         return <Text>{error}</Text>;
// // //     }

// // //     return (
// // //         <View style={styles.cardContainer}>
// // //             <Text style={styles.title}>Tài khoản thanh toán</Text>
// // //             <Text style={styles.accountNumber}>89250208582</Text>
// // //             <Text style={styles.balance}>Số dư khả dụng:  VNĐ</Text>
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     cardContainer: {
// // //         backgroundColor: '#fff',
// // //         borderRadius: 10,
// // //         padding: 20,
// // //         marginBottom: 20,
// // //         borderWidth: 1,
// // //         borderColor: 'orange',
// // //         margin: 10
// // //     },
// // //     title: {
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10,
// // //     },
// // //     accountNumber: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10,
// // //     },
// // //     balance: {
// // //         fontSize: 16,
// // //         marginBottom: 10,
// // //     },
// // // });

// // // export default Wallet;

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// // import { RouteProp, useRoute } from '@react-navigation/native';
// // import { RootStackParamList } from '../../types/navigation';
// // import { useBalance } from 'wagmi';

// // type WalletRouteProp = RouteProp<RootStackParamList, 'Wallet'>;

// // const Wallet: React.FC = () => {
// //     const { params } = useRoute<WalletRouteProp>();
// //     const { user } = params;
// //     const [balance, setBalance] = useState<number | null>(null);
// //     const [loading, setLoading] = useState<boolean>(true);
// //     const [error, setError] = useState<string | null>(null);

// //     const { data, isError, isLoading } = useBalance({
// //         address: user?.walletAddress ?? undefined,
// //         // chainId: 1337,
// //     });

// //     useEffect(() => {
// //         if (user) {
// //             setLoading(false);
// //         }
// //     }, [user]);

// //     if (loading || isLoading) {
// //         return <ActivityIndicator size="large" color="#0000ff" />;
// //     }

// //     if (error || isError) {
// //         return <Text>{error || 'Failed to fetch balance'}</Text>;
// //     }

// //     return (
// //         <View style={styles.cardContainer}>
// //             <Text style={styles.title}>Tài khoản thanh toán</Text>
// //             <Text style={styles.accountNumber}>{user.walletAddress}</Text>
// //             <Text style={styles.balance}>Số dư khả dụng: {data?.formatted} {data?.symbol}</Text>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     cardContainer: {
// //         backgroundColor: '#fff',
// //         borderRadius: 10,
// //         padding: 20,
// //         marginBottom: 20,
// //         borderWidth: 1,
// //         borderColor: 'orange',
// //         margin: 10
// //     },
// //     title: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     accountNumber: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     balance: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //     },
// // });

// // export default Wallet;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../../types/navigation';
// import { useBalance } from 'wagmi';

// type WalletRouteProp = RouteProp<RootStackParamList, 'Wallet'>;

// const Wallet: React.FC = () => {
//     const { params } = useRoute<WalletRouteProp>();
//     const { user } = params;
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const { data, isError, isLoading, error: balanceError } = useBalance({
//         address: user?.walletAddress ?? undefined,
//         chainId: 1337,
//     });

//     useEffect(() => {
//         if (user) {
//             setLoading(false);
//         }
//     }, [user]);

//     useEffect(() => {
//         if (balanceError) {
//             setError(balanceError.message);
//         }
//     }, [balanceError]);

//     if (loading || isLoading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error || isError) {
//         return <Text>{error || 'Failed to fetch balance'}</Text>;
//     }

//     return (
//         <View style={styles.cardContainer}>
//             <Text style={styles.title}>Tài khoản thanh toán</Text>
//             <Text style={styles.accountNumber}>{user.walletAddress}</Text>
//             <Text style={styles.balance}>Số dư khả dụng: {data?.formatted} {data?.symbol}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     cardContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: 'orange',
//         margin: 10
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     accountNumber: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     balance: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
// });

// export default Wallet;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useBalance } from 'wagmi';

type WalletRouteProp = RouteProp<RootStackParamList, 'Wallet'>;

const Wallet: React.FC = () => {
    const { params } = useRoute<WalletRouteProp>();
    const { user } = params;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { data, isError, isLoading, error: balanceError } = useBalance({
        address: user?.walletAddress ?? undefined,
        chainId: 1337,
    });

    useEffect(() => {
        console.log('Data:', data);
        console.log('isError:', isError);
        console.log('isLoading:', isLoading);
        console.log('balanceError:', balanceError);
    }, [data, isError, isLoading, balanceError]);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (balanceError) {
            setError(balanceError.message);
        }
    }, [balanceError]);

    if (loading || isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error || isError) {
        return <Text>{error || 'Failed to fetch balance'}</Text>;
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Tài khoản thanh toán</Text>
            <Text style={styles.accountNumber}>{user.walletAddress}</Text>
            <Text style={styles.balance}>Số dư khả dụng: {data?.formatted} {data?.symbol}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'orange',
        margin: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    accountNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    balance: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Wallet;