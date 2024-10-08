// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { View, Text, StyleSheet } from 'react-native';
// import Transactons from '../components/transactions/Transactions';
// import Wallet from '../components/wallet/Wallet';

// const Tab = createMaterialTopTabNavigator();


// const WalletManagement = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Tài khoản ví" component={Wallet} />
//             <Tab.Screen name="Lịch sử giao dịch" component={Transactons} />
//         </Tab.Navigator>
//     );
// };


// export default WalletManagement;

import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Transactions from '../components/transactions/Transactions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-toolkit/store';
import Wallet from '../components/wallet/Wallet';

const Tab = createMaterialTopTabNavigator();

const WalletManagement = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Tài khoản ví"
                component={Wallet}
                initialParams={{ user }}
            />
            <Tab.Screen
                name="Lịch sử giao dịch"
                component={Transactions}
                initialParams={{ user }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WalletManagement;