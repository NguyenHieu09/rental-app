


import React, { useCallback, useEffect, useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

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

    // useFocusEffect(
    //     useCallback(() => {
    //         const loadRequests = async () => {
    //             try {
    //                 const cancelRequestData =
    //                     await fetchNotHandledCancelContractRequest(contractId);
    //                 const extensionRequestsData = await fetchExtensionRequests(
    //                     contractId,
    //                 );

    //                 setCancelRequest(cancelRequestData);
    //                 setExtensionRequests(
    //                     extensionRequestsData.filter(
    //                         (request) => request.status === 'PENDING',
    //                     ),
    //                 );
    //             } catch (error: any) {
    //                 console.error('Error loading requests:', error);
    //                 Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu.');
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         loadRequests();
    //     }, [contractId]),
    // );
    const handleStatusUpdate = async (newStatus: string) => {
        if (!cancelRequest) return;

        try {
            await updateCancelContractRequestStatus(
                cancelRequest.id,
                newStatus,
            );
            Alert.alert(
                'Thành công',
                `Cập nhật trạng thái yêu cầu gia hạn thành công`,
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
                `Cập nhật trạng thái yêu cầu gia hạn thành công`,
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
        <ScrollView style={styles.container}>
            {cancelRequest ? (
                <View style={styles.cancelRequestContainer}>
                    <Text style={[styles.label, { textAlign: 'center' }]}>Yêu cầu hủy hợp đồng</Text>
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
                    <View style={{}}>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Tag color={getCancelRequestColor(cancelRequest.status)}>
                            {getStatusInVietnamese(cancelRequest.status)}
                        </Tag>
                    </View>

                    <View style={styles.buttonContainer}>
                        {cancelRequest.status === 'PENDING' &&
                            user?.userId !== cancelRequest.requestedBy && (
                                <>
                                    {user?.userTypes.includes('renter') ? (
                                        <Button
                                            style={commonStyles.flex1}
                                            type='danger'
                                            variant='outlined'
                                            onPress={() =>
                                                handleStatusUpdate('CANCELLED')
                                            }
                                        >
                                            Hủy yêu cầu
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                style={commonStyles.flex1}
                                                type='danger'
                                                variant='outlined'
                                                onPress={() =>
                                                    handleStatusUpdate(
                                                        'REJECTED',
                                                    )
                                                }
                                            >
                                                Từ chối
                                            </Button>
                                            <Button
                                                style={commonStyles.flex1}
                                                type='primary'
                                                variant='fill'
                                                onPress={() =>
                                                    handleStatusUpdate(
                                                        'APPROVED',
                                                    )
                                                }
                                            >
                                                Chấp nhận
                                            </Button>
                                        </>
                                    )}
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


                        <Tag color={getCancelRequestColor(request.status)}>
                            {getStatusInVietnamese(request.status)}
                        </Tag>
                        <View style={styles.buttonContainer}>
                            {request.status === 'PENDING' &&
                                (
                                    <>
                                        {user?.userTypes.includes('renter') ? (
                                            <Button
                                                style={commonStyles.flex1}
                                                type='danger'
                                                variant='outlined'
                                                onPress={() =>
                                                    handleExtensionStatusUpdate(
                                                        request.id,
                                                        'CANCELLED',
                                                    )
                                                }
                                            >
                                                Hủy yêu cầu
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    style={commonStyles.flex1}
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
                                                    style={commonStyles.flex1}
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
                                            </>
                                        )}
                                    </>
                                )}
                        </View>
                    </View>
                ))
                : null}
            {extensionRequests.length === 0 && !cancelRequest && (
                <Text>Không có yêu cầu chờ xử lý</Text>
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