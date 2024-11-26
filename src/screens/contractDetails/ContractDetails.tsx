// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { IContractDetail } from '../../types/contractDetail';
// import { fetchContractDetails, fetchNotHandledCancelContractRequest, fetchHandledCancelContractRequest, updateCancelContractRequestStatus } from '../../api/contract';
// import { commonStyles } from '../../styles/theme';
// import { ICancelContractResponse } from '../../types/cancelContract';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux-toolkit/store';
// import { FlatList } from 'react-native-gesture-handler';

// type ContractDetailsRouteProp = RouteProp<{ params: { contractId: string } }, 'params'>;

// const Tab = createMaterialTopTabNavigator();

// const getStatusInVietnamese = (status: string): string => {
//     switch (status) {
//         case 'WAITING':
//             return 'Đang chờ';
//         case 'DEPOSITED':
//             return 'Đã đặt cọc';
//         case 'ONGOING':
//             return 'Đang diễn ra';
//         case 'ENDED':
//             return 'Đã kết thúc';
//         case 'OVERDUE':
//             return 'Quá hạn';
//         case 'CANCELLED':
//             return 'Đã hủy';
//         case 'PENDING_CANCELLATION':
//             return 'Đang chờ hủy';
//         case 'UNILATERAL_CANCELLATION':
//             return 'Hủy đơn phương';
//         case 'APPROVED_CANCELLATION':
//             return 'Đã duyệt hủy';
//         case 'REJECTED_CANCELLATION':
//             return 'Từ chối hủy';
//         default:
//             return status;
//     }
// };

// const getCancellationStatusInVietnamese = (status: string): string => {
//     switch (status) {
//         case 'PENDING':
//             return 'Đang chờ';
//         case 'APPROVED':
//             return 'Đã chấp nhận hủy';
//         case 'REJECTED':
//             return 'Từ chối hủy';
//         case 'CANCELLED':
//             return 'Đã hủy';
//         case 'CONTINUE':
//             return 'Tiếp tục thuê';
//         case 'UNILATERAL_CANCELLATION':
//             return 'Hủy đơn phương';
//         default:
//             return status;
//     }
// };

// const ContractDetails: React.FC = () => {
//     const route = useRoute<ContractDetailsRouteProp>();
//     const { contractId } = route.params;
//     const [contract, setContract] = useState<IContractDetail | null>(null);
//     const [notHandledCancelRequest, setNotHandledCancelRequest] = useState<ICancelContractResponse | null>(null);
//     const [handledCancelRequest, setHandledCancelRequest] = useState<ICancelContractResponse[] | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const loadContractDetails = async () => {
//             try {
//                 const contractData = await fetchContractDetails(contractId);
//                 setContract(contractData);

//                 const notHandledData = await fetchNotHandledCancelContractRequest(contractId);
//                 setNotHandledCancelRequest(notHandledData);

//                 const handledData = await fetchHandledCancelContractRequest(contractId);
//                 console.log('HandledCancelRequestTab', handledData);
//                 setHandledCancelRequest(Array.isArray(handledData) ? handledData : [handledData]);
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
//         <Tab.Navigator>
//             <Tab.Screen name="Chi tiết hợp đồng">
//                 {() => <ContractDetailTab contract={contract} />}
//             </Tab.Screen>
//             <Tab.Screen name="Yêu cầu hủy chờ xử lý">
//                 {() => <NotHandledCancelRequestTab cancelRequest={notHandledCancelRequest} />}
//             </Tab.Screen>
//             <Tab.Screen name="Yêu cầu hủy đã xử lý">
//                 {() => <HandledCancelRequestTab cancelRequest={handledCancelRequest} />}
//             </Tab.Screen>
//             {/* <Tab.Screen name="Đánh giá hợp đồng">
//                 {() => <HandledCancelRequestTab cancelRequest={handledCancelRequest} />}
//             </Tab.Screen> */}
//         </Tab.Navigator>
//     );
// };

// const ContractDetailTab: React.FC<{ contract: IContractDetail }> = ({ contract }) => (
//     <View style={styles.container}>
//         <Text style={styles.label}>Mã hợp đồng:</Text>
//         <Text style={styles.value}>{contract.contractId}</Text>
//         <Text style={styles.label}>Chủ nhà:</Text>
//         <Text style={styles.value}>{contract.owner.name}</Text>
//         <Text style={styles.label}>Người thuê:</Text>
//         <Text style={styles.value}>{contract.renter.name}</Text>
//         <Text style={styles.label}>Ngày bắt đầu:</Text>
//         <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
//         <Text style={styles.label}>Ngày kết thúc:</Text>
//         <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
//         <Text style={styles.label}>Giá thuê:</Text>
//         <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ/tháng</Text>
//         <Text style={styles.label}>Tiền cọc:</Text>
//         <Text style={styles.value}>{contract.depositAmount.toLocaleString()} đ</Text>
//         <Text style={styles.label}>Trạng thái:</Text>
//         <Text style={styles.status}>{getStatusInVietnamese(contract.status)}</Text>
//     </View>
// );

// const NotHandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse | null }> = ({ cancelRequest }) => {
//     const user = useSelector((state: RootState) => state.user.user); // Get the user from Redux state
//     const isMyRequest = user?.userId === cancelRequest?.requestedBy;

//     const handleStatusUpdate = async (newStatus: string) => {
//         if (!cancelRequest) return;

//         try {
//             await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
//             Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getCancellationStatusInVietnamese(newStatus)}`);
//             // Cập nhật lại thông tin yêu cầu sau khi thành công (có thể thực hiện thêm bằng cách gọi API để load lại yêu cầu)
//         } catch (error) {
//             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
//             console.error('Error updating request status:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {cancelRequest ? (
//                 <>
//                     <View style={styles.cancelRequestContainer}>
//                         <Text style={styles.label}>Người yêu cầu:</Text>
//                         <Text style={styles.value}>{cancelRequest.userRequest.name}</Text>
//                         <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
//                         <Text style={styles.value}>{new Date(cancelRequest.requestedAt).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Ngày hủy:</Text>
//                         <Text style={styles.value}>{new Date(cancelRequest.cancelDate).toLocaleDateString()}</Text>
//                         <Text style={styles.label}>Lý do:</Text>
//                         <Text style={styles.value}>{cancelRequest.reason}</Text>
//                         <Text style={styles.label}>Trạng thái:</Text>
//                         <Text style={styles.status}>{getCancellationStatusInVietnamese(cancelRequest.status)}</Text>
//                         <View style={styles.buttonContainer}>
//                             {cancelRequest.status === 'PENDING' && !isMyRequest && (
//                                 <View style={styles.buttonContainer}>
//                                     <TouchableOpacity style={[styles.button]} onPress={() => handleStatusUpdate('REJECTED')}>
//                                         <Text style={[styles.buttonText, { paddingHorizontal: 20 }]}>Từ chối</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={[styles.button, { paddingHorizontal: 20 }]} onPress={() => handleStatusUpdate('APPROVED')}>
//                                         <Text style={styles.buttonText}>Chấp nhận</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             )}

//                             {cancelRequest.status === 'REJECTED' && isMyRequest && (
//                                 <View style={styles.buttonContainer}>
//                                     <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('UNILATERAL_CANCELLATION')}>
//                                         <Text style={styles.buttonText}>Đơn phương chấm dứt</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('CONTINUE')}>
//                                         <Text style={styles.buttonText}>Tiếp tục thuê</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         </View>
//                     </View>

//                 </>
//             ) : (
//                 <Text>Không có yêu cầu hủy hợp đồng chưa xử lý</Text>
//             )}
//         </View>
//     );
// };

// const HandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse[] | null }> = ({ cancelRequest }) => {
//     useEffect(() => {
//         console.log("Cancel request:", cancelRequest);
//     }, [cancelRequest]);

//     const renderCancelRequest = ({ item }: { item: ICancelContractResponse }) => (
//         <View style={styles.cancelRequestContainer}>
//             <Text style={styles.label}>Người yêu cầu:</Text>
//             <Text style={styles.value}>{item.userRequest?.name}</Text>
//             <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
//             <Text style={styles.value}>{new Date(item.requestedAt).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Ngày hủy:</Text>
//             <Text style={styles.value}>{new Date(item.cancelDate).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Lý do:</Text>
//             <Text style={styles.value}>{item.reason}</Text>
//             <Text style={styles.label}>Trạng thái:</Text>
//             <Text style={styles.status}>{getCancellationStatusInVietnamese(item.status)}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             {cancelRequest && cancelRequest.length > 0 ? (
//                 <FlatList
//                     data={cancelRequest}
//                     renderItem={renderCancelRequest}
//                     keyExtractor={(item) => item.id.toString()}
//                 />
//             ) : (
//                 <Text>Không có yêu cầu hủy hợp đồng đã xử lý</Text>
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
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
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
//         color: 'red'
//     },
//     cancelRequestContainer: {
//         backgroundColor: '#f9f9f9',
//         borderRadius: 8,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//         marginBottom: 20,
//     },
//     cancelRequestTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 5,
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         paddingVertical: 10,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//         marginHorizontal: 30,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
// });

// export default ContractDetails;

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    fetchContractDetails,
    fetchNotHandledCancelContractRequest,
    fetchHandledCancelContractRequest,
} from '../../api/contract';
import { IContractDetail } from '../../types/contractDetail';
import { commonStyles } from '../../styles/theme';
import { ICancelContractResponse } from '../../types/cancelContract';
import ContractDetailTab from '../../components/contract/ContractDetailTab';
import NotHandledCancelRequestTab from '../../components/contract/NotHandledCancelRequestTab';
import HandledCancelRequestTab from '../../components/contract/HandledCancelRequestTab';

type ContractDetailsRouteProp = RouteProp<
    { params: { contractId: string } },
    'params'
>;

const Tab = createMaterialTopTabNavigator();

const ContractDetails: React.FC = () => {
    const route = useRoute<ContractDetailsRouteProp>();
    const { contractId } = route.params;
    const [contract, setContract] = useState<IContractDetail | null>(null);
    const [notHandledCancelRequest, setNotHandledCancelRequest] =
        useState<ICancelContractResponse | null>(null);
    const [handledCancelRequest, setHandledCancelRequest] = useState<
        ICancelContractResponse[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadContractDetails = async () => {
            try {
                const contractData = await fetchContractDetails(contractId);
                setContract(contractData);

                const notHandledData =
                    await fetchNotHandledCancelContractRequest(contractId);
                setNotHandledCancelRequest(notHandledData);

                const handledData = await fetchHandledCancelContractRequest(
                    contractId,
                );
                setHandledCancelRequest(
                    Array.isArray(handledData) ? handledData : [handledData],
                );
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

    if (!contract) {
        return (
            <View
                style={[
                    commonStyles.container,
                    { justifyContent: 'center', alignItems: 'center', flex: 1 },
                ]}
            >
                <Text>Không tìm thấy hợp đồng</Text>
            </View>
        );
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name='Chi tiết hợp đồng'>
                {() => <ContractDetailTab contract={contract} />}
            </Tab.Screen>
            <Tab.Screen name='Yêu cầu hủy chờ xử lý'>
                {() => (
                    <NotHandledCancelRequestTab
                        cancelRequest={notHandledCancelRequest}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name='Yêu cầu hủy đã xử lý'>
                {() => (
                    <HandledCancelRequestTab
                        cancelRequest={handledCancelRequest}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ContractDetails;
