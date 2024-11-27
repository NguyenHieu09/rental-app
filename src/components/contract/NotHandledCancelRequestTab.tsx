// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { ICancelContractResponse } from '../../types/cancelContract';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux-toolkit/store';
// import { updateCancelContractRequestStatus } from '../../api/contract';

// const getStatusInVietnamese = (status: string): string => {
//     if (status === 'PENDING') return 'Chờ xác nhận';
//     if (status === 'APPROVED') return 'Đã chấp nhận';
//     if (status === 'REJECTED') return 'Đã từ chối';
//     if (status === 'CANCELLED') return 'Đã hủy';
//     if (status === 'CONTINUE') return 'Tiếp tục thuê';
//     if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
//     return 'Không xác định';
// };

// const NotHandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse | null }> = ({ cancelRequest }) => {
//     const user = useSelector((state: RootState) => state.user.user);
//     const isMyRequest = user?.userId === cancelRequest?.requestedBy;

//     const handleStatusUpdate = async (newStatus: string) => {
//         if (!cancelRequest) return;

//         try {
//             await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
//             Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
//         } catch (error) {
//             Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
//             console.error('Error updating request status:', error);
//         }
//     };

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
//                         {cancelRequest.status === 'PENDING' && !isMyRequest && (
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
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
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


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ICancelContractResponse } from '../../types/cancelContract';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import { updateCancelContractRequestStatus } from '../../api/contract';

const getStatusInVietnamese = (status: string): string => {
    if (status === 'PENDING') return 'Chờ xác nhận';
    if (status === 'APPROVED') return 'Đã chấp nhận';
    if (status === 'REJECTED') return 'Đã từ chối';
    if (status === 'CANCELLED') return 'Đã hủy';
    if (status === 'CONTINUE') return 'Tiếp tục thuê';
    if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
    return 'Không xác định';
};

const NotHandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse | null }> = ({ cancelRequest }) => {
    const user = useSelector((state: RootState) => state.user.user);
    const isMyRequest = user?.userId === cancelRequest?.requestedBy;
    const [refresh, setRefresh] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!cancelRequest) return;

        try {
            await updateCancelContractRequestStatus(cancelRequest.id, newStatus);
            Alert.alert('Thành công', `Yêu cầu đã được cập nhật thành: ${getStatusInVietnamese(newStatus)}`);
            setRefresh(!refresh); // Trigger re-render
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
            console.error('Error updating request status:', error);
        }
    };

    return (
        <View style={styles.container}>
            {cancelRequest ? (
                <View style={styles.cancelRequestContainer}>
                    <Text style={styles.label}>Người yêu cầu:</Text>
                    <Text style={styles.value}>{cancelRequest.userRequest.name}</Text>
                    <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
                    <Text style={styles.value}>{new Date(cancelRequest.requestedAt).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Ngày hủy:</Text>
                    <Text style={styles.value}>{new Date(cancelRequest.cancelDate).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Lý do:</Text>
                    <Text style={styles.value}>{cancelRequest.reason}</Text>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text style={styles.status}>{getStatusInVietnamese(cancelRequest.status)}</Text>
                    <View style={styles.buttonContainer}>
                        {cancelRequest.status === 'PENDING' && !isMyRequest && (
                            <>
                                <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleStatusUpdate('REJECTED')}>
                                    <Text style={styles.buttonText}>Từ chối</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('APPROVED')}>
                                    <Text style={styles.buttonText}>Chấp nhận</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            ) : (
                <Text>Không có yêu cầu hủy hợp đồng chưa xử lý</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
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