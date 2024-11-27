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

    const {
        data,
        isError,
        isLoading,
        error: balanceError,
    } = useBalance({
        address: user?.walletAddress ?? undefined,
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID!),
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
        return <ActivityIndicator size='large' color='#0000ff' />;
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.balanceTitle}>Số dư</Text>
            <Text style={styles.balance}>
                {parseFloat(data?.formatted || '0').toFixed(4)} {data?.symbol}
            </Text>
            <Text style={styles.title}>Địa chỉ ví</Text>
            <Text style={styles.accountNumber}>{user.walletAddress}</Text>
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
        margin: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 6,
        textAlign: 'center',
        marginTop: 12,
    },
    accountNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    balanceTitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    balance: {
        textAlign: 'center',
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 38 * 1.2,
    },
});

export default Wallet;
