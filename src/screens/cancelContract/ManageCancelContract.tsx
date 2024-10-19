import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { useSelector } from 'react-redux';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ICancelContractResponse } from '../../types/cancelContract';
import { RootStackParamList } from '../../types/navigation';
import { RootState } from '../../redux-toolkit/store';
// import { fetchCancelContractRequest } from '../../api/contract';
import { format } from 'date-fns';
import { commonStyles } from '../../styles/theme';


const ManageCancelContract = () => {
    const [cancelRequests, setCancelRequests] = useState<ICancelContractResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const ITEMS_PER_PAGE = 10;
    let debounceTimeout: NodeJS.Timeout | null = null;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);

    const loadCancelRequests = async (page: number) => {
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

            // const response = await fetchCancelContractRequest(user.userId);
            // const { cancelRequests, total } = response;
            // console.log('Total cancel requests:', total);


        } catch (error) {
            console.error('Error fetching cancel requests:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        if (user) {
            loadCancelRequests(0);
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            if (user) {
                loadCancelRequests(0);
            }
        }, [user])
    );

    const loadMoreCancelRequests = () => {
        console.log('Attempting to load more cancel requests...');
        if (!isLoadingMore && cancelRequests.length < totalRequests) {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(() => {
                console.log('Loading more cancel requests...');
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                loadCancelRequests(nextPage);
            }, 300); // 300ms debounce time
        } else {
            console.log('No more cancel requests to load or already loading.');
        }
    };

    const renderCancelRequest = ({ item }: { item: ICancelContractResponse }) => (
        <View key={item.id} style={styles.requestCard}>
            <TouchableOpacity>
                <View style={styles.containerRequest}>
                    <View style={styles.details}>
                        <Text style={styles.propertyTitle}>Contract ID: {item.contractId}</Text>
                        <Text style={styles.requestedBy}>Requested By: {item.userRequest.name}</Text>
                        <Text style={styles.requestedAt}>Requested At: {format(new Date(item.requestedAt), 'dd/MM/yyyy')}</Text>
                        <Text style={styles.cancelDate}>Cancel Date: {format(new Date(item.cancelDate), 'dd/MM/yyyy')}</Text>
                        <Text style={styles.reason}>Reason: {item.reason}</Text>
                        <Text style={styles.status}>Status: {item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    if (loading && currentPage === 0) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={cancelRequests}
                renderItem={renderCancelRequest}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMoreCancelRequests}
                onEndReachedThreshold={0.5}
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
    requestCard: {
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
    containerRequest: {
        flexDirection: 'row',
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    propertyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    requestedBy: {
        marginTop: 5,
    },
    requestedAt: {
        marginTop: 5,
        color: 'gray',
    },
    cancelDate: {
        marginTop: 5,
        color: 'gray',
    },
    reason: {
        marginTop: 5,
    },
    status: {
        marginTop: 10,
        color: 'red',
        fontSize: 14,
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

export default ManageCancelContract;