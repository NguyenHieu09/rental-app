

import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { logoutUserAsync } from '../../../redux-toolkit/slices/userSlice';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation'; // Import the type
import HomeHeader from '../../../components/homeHeader/HomeHeader'; // Import HomeHeader
import { commonStyles } from '../../../styles/theme';
import { fetchPropertiesWithFilters, fetchPropertyOverview } from '../../../api/api'; // Import fetchPropertiesWithFilters and fetchRentalRequestsForOwner
import { IProperty, IFilterProperty } from '../../../types/property';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { fetchContractOverview, fetchContractsForOwner, fetchRentalRequestsForOwner } from '../../../api/contract';
import { SafeAreaView } from 'react-native-safe-area-context';
import FileComponent from '../../../components/chat/FileComponent';
import { formatPrice } from '../../../utils/formattedPrice';
import MyComponent from '../../../components/test/MyComponent';


const DashboardOwner: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user, loading } = useSelector((state: RootState) => state.user);

    const [error, setError] = useState<string | null>(null);


    const [totalProperties, setTotalProperties] = useState(0);
    const [countUnavailableProperties, setCountUnavailableProperties] = useState<number>(0);
    const [countRentalRequest, setCountRentalRequest] = useState<number>(0);
    const [countExtensionRequest, setCountExtensionRequest] = useState<number>(0);
    const [countCancelRequest, setCountCancelRequest] = useState<number>(0);
    const [avgRevenueVND, setAvgRevenueVND] = useState<number>(0);
    const [avgRevenueETH, setAvgRevenueETH] = useState<number>(0);


    const loadPropertyOverview = async () => {
        try {
            const data = await fetchPropertyOverview();
            setTotalProperties(data.countProperties);
            setCountUnavailableProperties(data.countUnavailableProperties);
        } catch (error) {
            console.error('Error loading owner dashboard overview:', error);
            setError('Có lỗi xảy ra khi tải dữ liệu tổng quan.');
        }
    };

    // const handleLogout = async () => {
    //     await dispatch(logoutUserAsync()).unwrap();
    //     navigation.navigate('Login');
    // };

    useEffect(() => {
        if (!user && !loading) {
            navigation.navigate('Login');
        }
    }, [user, loading, navigation]);


    const loadContractOverview = async () => {
        try {
            const data = await fetchContractOverview();

            setCountRentalRequest(data.countRentalRequest);
            setCountExtensionRequest(data.countExtensionRequest);
            setCountCancelRequest(data.countCancelRequest);
            setAvgRevenueVND(data.avgRevenue.VND);
            setAvgRevenueETH(data.avgRevenue.ETH);
        } catch (error) {
            console.error('Error loading contract overview:', error);
            setError('Có lỗi xảy ra khi tải dữ liệu hợp đồng.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPropertyOverview();
            loadContractOverview();
        }, [])
    );

    const handleViewProperties = () => {
        navigation.navigate('ManageProperty');
    };

    const handleViewRequestRental = () => {
        navigation.navigate('ManageRequestRental');
    };


    const handleViewContracts = () => {
        navigation.navigate('ManageContract');
    };

    const handleViewCancelContracts = () => {
        navigation.navigate('ManageCancelContract');
    };

    const avatar = user?.avatar || '';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    return (
        <SafeAreaView style={[commonStyles.container, styles.dashboard]}>
            <HomeHeader avatar={avatar} />
            <View>
                <View style={styles.owner}>
                    <Text style={styles.title}>{user?.name || 'Guest'}</Text>
                    <Text style={styles.revenue}>Doanh Thu Trung Bình</Text>
                    <Text style={styles.amount}>{formatPrice(avgRevenueVND)}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("StatisticsScreen")}>
                        <Text style={styles.buttonText}>Xem báo cáo thống kê →</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.summaryTitle}>Tóm Tắt</Text>
                <View style={styles.summaryContainer}>
                    <TouchableOpacity style={styles.card} onPress={handleViewProperties}>
                        <Text style={styles.cardText}>{totalProperties}</Text>
                        <Text style={styles.cardLabel}>Tổng số căn hộ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleViewContracts}>
                        <Text style={styles.cardText}>{countUnavailableProperties}</Text>
                        <Text style={styles.cardLabel}>Đang cho thuê</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleViewRequestRental}>
                        <Text style={styles.cardText}>{countRentalRequest}</Text>
                        <Text style={styles.cardLabel}>Yêu cầu thuê nhà</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.card} >
                        <Text style={styles.cardText}>{countCancelRequest}</Text>
                        <Text style={styles.cardLabel}>Yêu cầu{`\n`}hủy hợp đồng</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleViewRequestRental}>
                        <Text style={styles.cardText}>{countExtensionRequest}</Text>
                        <Text style={styles.cardLabel}>Yêu cầu gia hạn</Text>
                    </TouchableOpacity>

                    {/* <MyComponent /> */}
                    {/* <TouchableOpacity style={styles.card} >
                        <Text style={styles.cardText}>{formatCurrency(avgRevenueVND)}</Text>
                        <Text style={styles.cardLabel}>Doanh thu{`\n`}trung bình</Text>
                    </TouchableOpacity> */}


                    {/* <W3mButton /> */}


                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        justifyContent: 'flex-start',
    },
    owner: {
        marginTop: 20,
        backgroundColor: '#1463b8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    revenue: {
        fontSize: 16,
        color: '#fff',
    },
    amount: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#6a5acd',
        fontWeight: 'bold',
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        width: '48%',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardLabel: {
        fontSize: 14,
        color: '#6a5acd',
        textAlign: 'center',
    },
});

export default DashboardOwner;