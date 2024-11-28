// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import { ICancelContractResponse } from '../../types/cancelContract';
// // import { getCancellationStatusInVietnamese } from '../../utils/contract';

// // const HandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse[] | null }> = ({ cancelRequest }) => {
// //     return (
// //         <View style={styles.container}>
// //             {cancelRequest && cancelRequest.length > 0 ? (
// //                 cancelRequest.map((request) => (
// //                     <View key={request.id} style={styles.cancelRequestContainer}>
// //                         <Text style={styles.label}>Người yêu cầu:</Text>
// //                         <Text style={styles.value}>{request.userRequest.name}</Text>
// //                         <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
// //                         <Text style={styles.value}>{new Date(request.requestedAt).toLocaleDateString()}</Text>
// //                         <Text style={styles.label}>Ngày hủy:</Text>
// //                         <Text style={styles.value}>{new Date(request.cancelDate).toLocaleDateString()}</Text>
// //                         <Text style={styles.label}>Lý do:</Text>
// //                         <Text style={styles.value}>{request.reason}</Text>
// //                         <Text style={styles.label}>Trạng thái:</Text>
// //                         <Text style={styles.status}>{getCancellationStatusInVietnamese(request.status)}</Text>
// //                     </View>
// //                 ))
// //             ) : (
// //                 <Text>Không có yêu cầu hủy đã xử lý</Text>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 20,
// //         backgroundColor: '#fff',
// //     },
// //     label: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginTop: 5,
// //     },
// //     value: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //     },
// //     status: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //         color: 'red',
// //     },
// //     cancelRequestContainer: {
// //         backgroundColor: '#f9f9f9',
// //         borderRadius: 8,
// //         borderColor: '#ccc',
// //         borderWidth: 1,
// //         padding: 10,
// //         marginBottom: 20,
// //     },
// // });

// // export default HandledCancelRequestTab;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { ICancelContractResponse } from '../../types/cancelContract';
// import { getCancellationStatusInVietnamese } from '../../utils/contract';
// import { fetchHandledCancelContractRequest } from '../../api/contract';

// const HandledCancelRequestTab: React.FC<{ contractId: string }> = ({ contractId }) => {
//     const [handledCancelRequests, setHandledCancelRequests] = useState<ICancelContractResponse[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadHandledCancelRequests = async () => {
//             try {
//                 const handledData = await fetchHandledCancelContractRequest(contractId);
//                 setHandledCancelRequests(Array.isArray(handledData) ? handledData : [handledData]);
//             } catch (error: any) {
//                 console.error('Error loading handled cancel requests:', error);
//                 Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadHandledCancelRequests();
//     }, [contractId]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {handledCancelRequests.length > 0 ? (
//                 handledCancelRequests.map((request) => (
//                     <View key={request.id} style={styles.cancelRequestContainer}>
//                         <Text style={styles.label}>Người yêu cầu:</Text>
//                         <Text style={styles.value}>{request.userRequest.name}</Text>
//                         <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
//                         <Text style={styles.value}>{new Date(request.requestedAt).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Ngày hủy:</Text>
//                         <Text style={styles.value}>{new Date(request.cancelDate).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Lý do:</Text>
//                         <Text style={styles.value}>{request.reason}</Text>
//                         <Text style={styles.label}>Trạng thái:</Text>
//                         <Text style={styles.status}>{getCancellationStatusInVietnamese(request.status)}</Text>
//                     </View>
//                 ))
//             ) : (
//                 <Text>Không có yêu cầu hủy đã xử lý</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 5,
//     },
//     value: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     status: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: 'red',
//     },
//     cancelRequestContainer: {
//         backgroundColor: '#f9f9f9',
//         borderRadius: 8,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//         marginBottom: 20,
//     },
// });

// export default HandledCancelRequestTab;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ICancelContractResponse } from '../../types/cancelContract';
import { IExtensionRequest } from '../../types/extensionRequest';
import {
    getCancellationStatusInVietnamese,
    getStatusInVietnamese,
} from '../../utils/contract';
import {
    fetchHandledCancelContractRequest,
    fetchExtensionRequests,
} from '../../api/contract';
import { ScrollView } from 'react-native-gesture-handler';

const getStatusExtensionRequests = (status: string): string => {
    if (status === 'PENDING') return 'Chờ xác nhận';
    if (status === 'APPROVED') return 'Đã chấp nhận';
    if (status === 'REJECTED') return 'Đã từ chối';
    if (status === 'CANCELLED') return 'Đã hủy';
    return 'Không xác định';
};

const HandledCancelRequestTab: React.FC<{ contractId: string }> = ({
    contractId,
}) => {
    const [handledCancelRequests, setHandledCancelRequests] = useState<
        ICancelContractResponse[]
    >([]);
    const [handledExtensionRequests, setHandledExtensionRequests] = useState<
        IExtensionRequest[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHandledRequests = async () => {
            try {
                const handledCancelData =
                    await fetchHandledCancelContractRequest(contractId);
                const handledExtensionData = await fetchExtensionRequests(
                    contractId,
                );

                setHandledCancelRequests(
                    Array.isArray(handledCancelData)
                        ? handledCancelData
                        : [handledCancelData],
                );
                setHandledExtensionRequests(
                    handledExtensionData.filter(
                        (request) => request.status !== 'PENDING',
                    ),
                );
            } catch (error: any) {
                console.error('Error loading handled requests:', error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        loadHandledRequests();
    }, [contractId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* <ScrollView> */}
            {handledCancelRequests.length > 0
                ? handledCancelRequests.map((request) => (
                    <View
                        key={request.id}
                        style={styles.cancelRequestContainer}
                    >
                        <Text style={styles.label}>Người yêu cầu:</Text>
                        <Text style={styles.value}>
                            {request.userRequest.name}
                        </Text>
                        <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
                        <Text style={styles.value}>
                            {new Date(
                                request.requestedAt,
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.label}>Ngày hủy:</Text>
                        <Text style={styles.value}>
                            {new Date(
                                request.cancelDate,
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.label}>Lý do:</Text>
                        <Text style={styles.value}>{request.reason}</Text>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Text style={styles.status}>
                            {getCancellationStatusInVietnamese(
                                request.status,
                            )}
                        </Text>
                    </View>
                ))
                : null}

            {handledExtensionRequests.length > 0
                ? handledExtensionRequests.map((request) => (
                    <View
                        key={request.id}
                        style={styles.extensionRequestContainer}
                    >
                        <Text style={[styles.label, { textAlign: 'center' }]}>
                            {request.type === 'EXTEND_PAYMENT'
                                ? 'Yêu cầu gia hạn thanh toán'
                                : 'Yêu cầu gia hạn hợp đồng'}
                        </Text>
                        <Text style={styles.label}>Thời gian gia hạn:</Text>
                        <Text style={styles.value}>
                            {new Date(
                                request.extensionDate,
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.label}>Lý do:</Text>
                        <Text style={styles.value}>{request.reason}</Text>
                        <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
                        <Text style={styles.value}>
                            {new Date(request.createdAt).toLocaleDateString()}
                        </Text>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Text style={styles.status}>
                            {getStatusExtensionRequests(request.status)}
                        </Text>
                    </View>
                ))
                : null}
            {handledCancelRequests.length === 0 &&
                handledExtensionRequests.length === 0 && (
                    <Text>Không có yêu cầu nào xử lý</Text>
                )}
            {/* </ScrollView> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 5,
    },
    status: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
    cancelRequestContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    extensionRequestContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});

export default HandledCancelRequestTab;
