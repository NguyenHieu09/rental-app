// // // import React from 'react';
// // // import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// // // import { ICancelContractResponse } from '../../types/cancelContract';
// // // import { useSelector } from 'react-redux';
// // // import { RootState } from '../../redux-toolkit/store';
// // // import { updateCancelContractRequestStatus } from '../../api/contract';

// // // const getStatusInVietnamese = (status: string): string => {
// // //     if (status === 'PENDING') return 'Chờ xác nhận';
// // //     if (status === 'APPROVED') return 'Đã chấp nhận';
// // //     if (status === 'REJECTED') return 'Đã từ chối';
// // //     if (status === 'CANCELLED') return 'Đã hủy';
// // //     if (status === 'CONTINUE') return 'Tiếp tục thuê';
// // //     if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
// // //     return 'Không xác định';
// // // };

// // // const NotHandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse | null }> = ({ cancelRequest }) => {
// // //     const user = useSelector((state: RootState) => state.user.user);
// // //     const isMyRequest = user?.userId === cancelRequest?.requestedBy;

// // //     const handleStatusUpdate = async (newStatus: string) => {
// // //         if (!cancelRequest) return;

// // //         try {
// // //             await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
// // //             Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
// // //         } catch (error) {
// // //             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
// // //             console.error('Error updating request status:', error);
// // //         }
// // //     };

// // //     return (
// // //         <View style={styles.container}>
// // //             {cancelRequest ? (
// // //                 <View style={styles.cancelRequestContainer}>
// // //                     <Text style={styles.label}>Người yêu cầu:</Text>
// // //                     <Text style={styles.value}>{cancelRequest.userRequest.name}</Text>
// // //                     <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
// // //                     <Text style={styles.value}>{new Date(cancelRequest.requestedAt).toLocaleDateString()}</Text>
// // //                     <Text style={styles.label}>Ngày hủy:</Text>
// // //                     <Text style={styles.value}>{new Date(cancelRequest.cancelDate).toLocaleDateString()}</Text>
// // //                     <Text style={styles.label}>Lý do:</Text>
// // //                     <Text style={styles.value}>{cancelRequest.reason}</Text>
// // //                     <Text style={styles.label}>Trạng thái:</Text>
// // //                     <Text style={styles.status}>{getStatusInVietnamese(cancelRequest.status)}</Text>
// // //                     <View style={styles.buttonContainer}>
// // //                         {cancelRequest.status === 'PENDING' && !isMyRequest && (
// // //                             <>
// // //                                 <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleStatusUpdate('REJECTED')}>
// // //                                     <Text style={styles.buttonText}>Từ chối</Text>
// // //                                 </TouchableOpacity>
// // //                                 <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('APPROVED')}>
// // //                                     <Text style={styles.buttonText}>Chấp nhận</Text>
// // //                                 </TouchableOpacity>
// // //                             </>
// // //                         )}
// // //                     </View>
// // //                 </View>
// // //             ) : (
// // //                 <Text>Không có yêu cầu hủy hợp đồng chưa xử lý</Text>
// // //             )}
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         padding: 20,
// // //         backgroundColor: '#fff',
// // //     },
// // //     label: {
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //         marginTop: 5,
// // //     },
// // //     value: {
// // //         fontSize: 16,
// // //         marginBottom: 5,
// // //     },
// // //     status: {
// // //         fontSize: 16,
// // //         marginBottom: 5,
// // //         color: 'red',
// // //     },
// // //     cancelRequestContainer: {
// // //         backgroundColor: '#f9f9f9',
// // //         borderRadius: 8,
// // //         borderColor: '#ccc',
// // //         borderWidth: 1,
// // //         padding: 10,
// // //         marginBottom: 20,
// // //     },
// // //     buttonContainer: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-around',
// // //         marginTop: 10,
// // //     },
// // //     button: {
// // //         backgroundColor: '#007BFF',
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 20,
// // //         borderRadius: 5,
// // //     },
// // //     buttonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // // });

// // // export default NotHandledCancelRequestTab;

// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// // import { ICancelContractResponse } from '../../types/cancelContract';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../../redux-toolkit/store';
// // import { updateCancelContractRequestStatus } from '../../api/contract';

// // const getStatusInVietnamese = (status: string): string => {
// //     if (status === 'PENDING') return 'Chờ xác nhận';
// //     if (status === 'APPROVED') return 'Đã chấp nhận';
// //     if (status === 'REJECTED') return 'Đã từ chối';
// //     if (status === 'CANCELLED') return 'Đã hủy';
// //     if (status === 'CONTINUE') return 'Tiếp tục thuê';
// //     if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
// //     return 'Không xác định';
// // };

// // const NotHandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse | null }> = ({ cancelRequest }) => {
// //     const user = useSelector((state: RootState) => state.user.user);
// //     const isMyRequest = user?.userId === cancelRequest?.requestedBy;
// //     const [refresh, setRefresh] = useState(false);

// //     const handleStatusUpdate = async (newStatus: string) => {
// //         if (!cancelRequest) return;

// //         try {
// //             await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
// //             Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
// //             setRefresh(!refresh); // Trigger re-render
// //         } catch (error) {
// //             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
// //             console.error('Error updating request status:', error);
// //         }
// //     };

// //     return (
// //         <View style={styles.container}>
// //             {cancelRequest ? (
// //                 <View style={styles.cancelRequestContainer}>
// //                     <Text style={styles.label}>Người yêu cầu:</Text>
// //                     <Text style={styles.value}>{cancelRequest.userRequest.name}</Text>
// //                     <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
// //                     <Text style={styles.value}>{new Date(cancelRequest.requestedAt).toLocaleDateString()}</Text>
// //                     <Text style={styles.label}>Ngày hủy:</Text>
// //                     <Text style={styles.value}>{new Date(cancelRequest.cancelDate).toLocaleDateString()}</Text>
// //                     <Text style={styles.label}>Lý do:</Text>
// //                     <Text style={styles.value}>{cancelRequest.reason}</Text>
// //                     <Text style={styles.label}>Trạng thái:</Text>
// //                     <Text style={styles.status}>{getStatusInVietnamese(cancelRequest.status)}</Text>
// //                     <View style={styles.buttonContainer}>
// //                         {cancelRequest.status === 'PENDING' && !isMyRequest && (
// //                             <>
// //                                 <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleStatusUpdate('REJECTED')}>
// //                                     <Text style={styles.buttonText}>Từ chối</Text>
// //                                 </TouchableOpacity>
// //                                 <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('APPROVED')}>
// //                                     <Text style={styles.buttonText}>Chấp nhận</Text>
// //                                 </TouchableOpacity>
// //                             </>
// //                         )}
// //                     </View>
// //                 </View>
// //             ) : (
// //                 <Text>Không có yêu cầu hủy hợp đồng chưa xử lý</Text>
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
// //     buttonContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-around',
// //         marginTop: 10,
// //     },
// //     button: {
// //         backgroundColor: '#007BFF',
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 5,
// //     },
// //     buttonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// // });

// // export default NotHandledCancelRequestTab;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import { ICancelContractResponse } from '../../types/cancelContract';
// import { ContractExtensionRequestStatus, IExtensionRequest, IUpdateExtensionRequestStatus } from '../../types/extensionRequest';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux-toolkit/store';
// import { fetchNotHandledCancelContractRequest, fetchExtensionRequests, updateCancelContractRequestStatus, updateExtensionRequestStatus } from '../../api/contract';

// const getStatusInVietnamese = (status: string): string => {
//     if (status === 'PENDING') return 'Chờ xác nhận';
//     if (status === 'APPROVED') return 'Đã chấp nhận';
//     if (status === 'REJECTED') return 'Đã từ chối';
//     if (status === 'CANCELLED') return 'Đã hủy';
//     if (status === 'CONTINUE') return 'Tiếp tục thuê';
//     if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
//     return 'Không xác định';
// };

// const NotHandledCancelRequestTab: React.FC<{ contractId: string }> = ({ contractId }) => {
//     const user = useSelector((state: RootState) => state.user.user);
//     const [cancelRequest, setCancelRequest] = useState<ICancelContractResponse | null>(null);
//     const [extensionRequests, setExtensionRequests] = useState<IExtensionRequest[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadRequests = async () => {
//             try {
//                 const cancelRequestData = await fetchNotHandledCancelContractRequest(contractId);
//                 const extensionRequestsData = await fetchExtensionRequests(contractId);

//                 setCancelRequest(cancelRequestData);
//                 setExtensionRequests(extensionRequestsData.filter(request => request.status === 'PENDING'));
//             } catch (error: any) {
//                 console.error('Error loading requests:', error);
//                 Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadRequests();
//     }, [contractId]);

//     const handleStatusUpdate = async (newStatus: string) => {
//         if (!cancelRequest) return;

//         try {
//             await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
//             Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
//             setCancelRequest({ ...cancelRequest, status: newStatus }); // Update the local state
//         } catch (error) {
//             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
//             console.error('Error updating request status:', error);
//         }
//     };

//     const handleExtensionStatusUpdate = async (requestId: number, newStatus: string) => {
//         try {
//             const updateRequest: IUpdateExtensionRequestStatus = {
//                 id: requestId,
//                 status: newStatus as ContractExtensionRequestStatus,
//                 contractId: contractId,
//             };
//             await updateExtensionRequestStatus(updateRequest);
//             Alert.alert('Thành công', `Yêu cầu gia hạn đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
//             setExtensionRequests(extensionRequests.map(request =>
//                 request.id === requestId ? { ...request, status: newStatus as ContractExtensionRequestStatus } : request
//             ));
//         } catch (error) {
//             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu gia hạn');
//             console.error('Error updating extension request status:', error);
//         }
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {cancelRequest ? (
//                 <View style={styles.cancelRequestContainer}>
//                     <Text style={styles.label}>Người yêu cầu:</Text>
//                     <Text style={styles.value}>{cancelRequest.userRequest.name}</Text>
//                     <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
//                     <Text style={styles.value}>{new Date(cancelRequest.requestedAt).toLocaleDateString()}</Text>
//                     <Text style={styles.label}>Ngày hủy:</Text>
//                     <Text style={styles.value}>{new Date(cancelRequest.cancelDate).toLocaleDateString()}</Text>
//                     <Text style={styles.label}>Lý do:</Text>
//                     <Text style={styles.value}>{cancelRequest.reason}</Text>
//                     <Text style={styles.label}>Trạng thái:</Text>
//                     <Text style={styles.status}>{getStatusInVietnamese(cancelRequest.status)}</Text>
//                     <View style={styles.buttonContainer}>
//                         {cancelRequest.status === 'PENDING' && user?.userId !== cancelRequest.requestedBy && (
//                             <>
//                                 <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleStatusUpdate('REJECTED')}>
//                                     <Text style={styles.buttonText}>Từ chối</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('APPROVED')}>
//                                     <Text style={styles.buttonText}>Chấp nhận</Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </View>
//                 </View>
//             ) : (
//                 <Text>Không có yêu cầu hủy hợp đồng chưa xử lý</Text>
//             )}

//             {extensionRequests.length > 0 ? (
//                 extensionRequests.map(request => (
//                     <View key={request.id} style={styles.extensionRequestContainer}>
//                         <Text style={[styles.label, { textAlign: 'center' }]}>Yêu cầu gia hạn hợp đồng</Text>
//                         {/* <Text style={styles.value}>{request.id}</Text> */}
//                         <Text style={styles.label}>Thời gian gia hạn:</Text>
//                         <Text style={styles.value}>{new Date(request.extensionDate).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Lý do:</Text>
//                         <Text style={styles.value}>{request.reason}</Text>
//                         <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
//                         <Text style={styles.value}>{new Date(request.createdAt).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Trạng thái:</Text>
//                         <Text style={styles.status}>{getStatusInVietnamese(request.status)}</Text>
//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleExtensionStatusUpdate(request.id, 'REJECTED')}>
//                                 <Text style={styles.buttonText}>Từ chối</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.button} onPress={() => handleExtensionStatusUpdate(request.id, 'APPROVED')}>
//                                 <Text style={styles.buttonText}>Chấp nhận</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 ))
//             ) : (
//                 <Text>Không có yêu cầu gia hạn chưa xử lý</Text>
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
//     extensionRequestContainer: {
//         backgroundColor: '#f9f9f9',
//         borderRadius: 8,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//         marginBottom: 20,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 10,
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });

// export default NotHandledCancelRequestTab;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
    fetchExtensionRequests,
    fetchNotHandledCancelContractRequest,
    updateCancelContractRequestStatus,
    updateExtensionRequestStatus,
} from '../../api/contract';
import { RootState } from '../../redux-toolkit/store';
import { commonStyles } from '../../styles/theme';
import { ICancelContractResponse } from '../../types/cancelContract';
import {
    ContractExtensionRequestStatus,
    IExtensionRequest,
    IUpdateExtensionRequestStatus,
} from '../../types/extensionRequest';
import { getCancellationStatusInVietnamese } from '../../utils/contract';
import Button from '../button/Button';
import Tag from '../tag/Tag';
import { getCancelRequestColor } from '../../utils/colorTag';

const getStatusInVietnamese = (status: string): string => {
    if (status === 'PENDING') return 'Chờ xác nhận';
    if (status === 'APPROVED') return 'Đã chấp nhận';
    if (status === 'REJECTED') return 'Đã từ chối';
    if (status === 'CANCELLED') return 'Đã hủy';
    if (status === 'CONTINUE') return 'Tiếp tục thuê';
    if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
    return 'Không xác định';
};

const NotHandledCancelRequestTab: React.FC<{ contractId: string }> = ({
    contractId,
}) => {
    const user = useSelector((state: RootState) => state.user.user);
    const [cancelRequest, setCancelRequest] =
        useState<ICancelContractResponse | null>(null);
    const [extensionRequests, setExtensionRequests] = useState<
        IExtensionRequest[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false); // State variable to trigger re-fetch

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const cancelRequestData =
                    await fetchNotHandledCancelContractRequest(contractId);
                const extensionRequestsData = await fetchExtensionRequests(
                    contractId,
                );

                setCancelRequest(cancelRequestData);
                setExtensionRequests(
                    extensionRequestsData.filter(
                        (request) => request.status === 'PENDING',
                    ),
                );
            } catch (error: any) {
                console.error('Error loading requests:', error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, [contractId, refresh]); // Add refresh to the dependency array

    const handleStatusUpdate = async (newStatus: string) => {
        if (!cancelRequest) return;

        try {
            await updateCancelContractRequestStatus(
                cancelRequest.id,
                newStatus,
            );
            Alert.alert(
                'Thành công',
                `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(
                    newStatus,
                )}`,
            );
            setRefresh(!refresh); // Trigger re-fetch by updating the refresh state
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
            console.error('Error updating request status:', error);
        }
    };

    const handleExtensionStatusUpdate = async (
        requestId: number,
        newStatus: ContractExtensionRequestStatus,
    ) => {
        try {
            const updateRequest: IUpdateExtensionRequestStatus = {
                id: requestId,
                status: newStatus,
                contractId: contractId,
            };
            await updateExtensionRequestStatus(updateRequest);
            Alert.alert(
                'Thành công',
                `Yêu cầu gia hạn đã được cập nhật thành: ${getStatusInVietnamese(
                    newStatus,
                )}`,
            );
            setRefresh(!refresh); // Trigger re-fetch by updating the refresh state
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu gia hạn');
            console.error('Error updating extension request status:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {cancelRequest ? (
                <View style={styles.cancelRequestContainer}>
                    <Text style={styles.label}>
                        Người yêu cầu:&nbsp;
                        <Text style={styles.value}>
                            {cancelRequest.userRequest.name}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Ngày gửi yêu cầu:&nbsp;
                        <Text style={styles.value}>
                            {new Date(
                                cancelRequest.requestedAt,
                            ).toLocaleDateString()}
                        </Text>
                    </Text>

                    <Text style={styles.label}>
                        Ngày hủy:&nbsp;
                        <Text style={styles.value}>
                            {new Date(
                                cancelRequest.cancelDate,
                            ).toLocaleDateString()}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Lý do:&nbsp;
                        <Text style={styles.value}>{cancelRequest.reason}</Text>
                    </Text>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Tag color={getCancelRequestColor(cancelRequest.status)}>
                        {getStatusInVietnamese(cancelRequest.status)}
                    </Tag>
                    <View style={styles.buttonContainer}>
                        {cancelRequest.status === 'PENDING' &&
                            user?.userId !== cancelRequest.requestedBy && (
                                <>
                                    <Button
                                        style={commonStyles.flex1}
                                        type='danger'
                                        variant='outlined'
                                        onPress={() =>
                                            handleStatusUpdate('REJECTED')
                                        }
                                    >
                                        Từ chối
                                    </Button>
                                    <Button
                                        style={commonStyles.flex1}
                                        type='primary'
                                        variant='fill'
                                        onPress={() =>
                                            handleStatusUpdate('APPROVED')
                                        }
                                    >
                                        Chấp nhận
                                    </Button>
                                </>
                            )}
                    </View>
                </View>
            ) : null}

            {extensionRequests.length > 0
                ? extensionRequests.map((request) => (
                      <View
                          key={request.id}
                          style={styles.extensionRequestContainer}
                      >
                          <Text style={[styles.label, { textAlign: 'center' }]}>
                              {request.type === 'EXTEND_PAYMENT'
                                  ? 'Yêu cầu gia hạn thanh toán'
                                  : 'Yêu cầu gia hạn hợp đồng'}
                          </Text>
                          {/* <Text style={[styles.label, { textAlign: 'center' }]}>Yêu cầu gia hạn hợp đồng</Text> */}
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
                              {getStatusInVietnamese(request.status)}
                          </Text>
                          <View style={styles.buttonContainer}>
                              <Button
                                  type='danger'
                                  variant='outlined'
                                  onPress={() =>
                                      handleExtensionStatusUpdate(
                                          request.id,
                                          'REJECTED',
                                      )
                                  }
                              >
                                  Từ chối
                              </Button>
                              <Button
                                  type='primary'
                                  variant='fill'
                                  onPress={() =>
                                      handleExtensionStatusUpdate(
                                          request.id,
                                          'APPROVED',
                                      )
                                  }
                              >
                                  Chấp nhận
                              </Button>
                          </View>
                      </View>
                  ))
                : null}
            {extensionRequests.length === 0 && !cancelRequest && (
                <Text>Không có yêu cầu chờ xử lý</Text>
            )}
        </View>
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 8,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default NotHandledCancelRequestTab;
