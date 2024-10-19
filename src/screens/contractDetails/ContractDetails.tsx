// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { IContractDetail } from '../../types/contractDetail';
// import { fetchContractDetails } from '../../api/contract';
// import { commonStyles } from '../../styles/theme';

// type ContractDetailsRouteProp = RouteProp<{ params: { contractId: string } }, 'params'>;

// const ContractDetails: React.FC = () => {
//     const route = useRoute<ContractDetailsRouteProp>();
//     const { contractId } = route.params;
//     const [contract, setContract] = useState<IContractDetail | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const loadContractDetails = async () => {
//             try {
//                 const data = await fetchContractDetails(contractId);
//                 setContract(data);
//             } catch (error) {
//                 Alert.alert('Lỗi', 'Không thể tải chi tiết hợp đồng');
//                 console.error('Error loading contract details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadContractDetails();
//     }, [contractId]);

//     if (loading) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!contract) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <Text>Không tìm thấy hợp đồng</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={commonStyles.container}>
//             <Text style={styles.title}>Chi tiết hợp đồng</Text>
//             <Text style={styles.label}>Mã hợp đồng:</Text>
//             <Text style={styles.value}>{contract.contractId}</Text>
//             <Text style={styles.label}>Chủ nhà:</Text>
//             <Text style={styles.value}>{contract.owner.name}</Text>
//             <Text style={styles.label}>Người thuê:</Text>
//             <Text style={styles.value}>{contract.renter.name}</Text>
//             <Text style={styles.label}>Ngày bắt đầu:</Text>
//             <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Ngày kết thúc:</Text>
//             <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Giá thuê:</Text>
//             <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ</Text>
//             <Text style={styles.label}>Trạng thái:</Text>
//             <Text style={styles.value}>{contract.status}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
//     value: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
// });

// export default ContractDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IContractDetail } from '../../types/contractDetail';
import { fetchContractDetails, fetchNotHandledCancelContractRequest, fetchHandledCancelContractRequest } from '../../api/contract';
import { commonStyles } from '../../styles/theme';
import { ICancelContractResponse } from '../../types/cancelContract';

type ContractDetailsRouteProp = RouteProp<{ params: { contractId: string } }, 'params'>;

const ContractDetails: React.FC = () => {
    const route = useRoute<ContractDetailsRouteProp>();
    const { contractId } = route.params;
    const [contract, setContract] = useState<IContractDetail | null>(null);
    const [notHandledCancelRequest, setNotHandledCancelRequest] = useState<ICancelContractResponse | null>(null);
    const [handledCancelRequest, setHandledCancelRequest] = useState<ICancelContractResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadContractDetails = async () => {
            try {
                const contractData = await fetchContractDetails(contractId);
                setContract(contractData);

                const notHandledData = await fetchNotHandledCancelContractRequest(contractId);
                setNotHandledCancelRequest(notHandledData);

                const handledData = await fetchHandledCancelContractRequest(contractId);
                setHandledCancelRequest(handledData);
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể tải chi tiết hợp đồng');
                console.error('Error loading contract details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadContractDetails();
    }, [contractId]);

    if (loading) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!contract) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <Text>Không tìm thấy hợp đồng</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chi tiết hợp đồng</Text>
            <Text style={styles.label}>Mã hợp đồng:</Text>
            <Text style={styles.value}>{contract.contractId}</Text>
            <Text style={styles.label}>Chủ nhà:</Text>
            <Text style={styles.value}>{contract.owner.name}</Text>
            <Text style={styles.label}>Người thuê:</Text>
            <Text style={styles.value}>{contract.renter.name}</Text>
            <Text style={styles.label}>Ngày bắt đầu:</Text>
            <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
            <Text style={styles.label}>Ngày kết thúc:</Text>
            <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
            <Text style={styles.label}>Giá thuê:</Text>
            <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ</Text>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={styles.value}>{contract.status}</Text>

            {notHandledCancelRequest && (
                <View style={styles.cancelRequestContainer}>
                    <Text style={styles.cancelRequestTitle}>Yêu cầu hủy hợp đồng chưa xử lý</Text>
                    <Text style={styles.label}>Người yêu cầu:</Text>
                    {/* <Text style={styles.value}>{notHandledCancelRequest.userRequest.name}</Text> */}
                    <Text style={styles.label}>Ngày yêu cầu:</Text>
                    <Text style={styles.value}>{new Date(notHandledCancelRequest.requestedAt).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Ngày hủy:</Text>
                    <Text style={styles.value}>{new Date(notHandledCancelRequest.cancelDate).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Lý do:</Text>
                    <Text style={styles.value}>{notHandledCancelRequest.reason}</Text>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text style={styles.value}>{notHandledCancelRequest.status}</Text>
                </View>
            )}

            {handledCancelRequest && (
                <View style={styles.cancelRequestContainer}>
                    <Text style={styles.cancelRequestTitle}>Yêu cầu hủy hợp đồng đã xử lý</Text>
                    <Text style={styles.label}>Người yêu cầu:</Text>
                    {/* <Text style={styles.value}>{handledCancelRequest.userRequest.name}</Text> */}
                    <Text style={styles.label}>Ngày yêu cầu:</Text>
                    <Text style={styles.value}>{new Date(handledCancelRequest.requestedAt).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Ngày hủy:</Text>
                    <Text style={styles.value}>{new Date(handledCancelRequest.cancelDate).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Lý do:</Text>
                    <Text style={styles.value}>{handledCancelRequest.reason}</Text>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text style={styles.value}>{handledCancelRequest.status}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    cancelRequestContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    cancelRequestTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ContractDetails;