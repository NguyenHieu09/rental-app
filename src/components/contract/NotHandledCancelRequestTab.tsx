import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {
    fetchExtensionRequests,
    fetchNotHandledCancelContractRequest,
    updateCancelContractRequestStatus,
    updateExtensionRequestStatus,
} from '../../api/contract';
import { RootState } from '../../redux-toolkit/store';
import { commonStyles } from '../../styles/theme';
import {
    ContractCancelRequestStatus,
    ICancelContractResponse,
} from '../../types/cancelContract';
import {
    ContractExtensionRequestStatus,
    IExtensionRequest,
    IUpdateExtensionRequestStatus,
} from '../../types/extensionRequest';
import { getCancelRequestColor } from '../../utils/colorTag';
import { formatDate, formatDateTime } from '../../utils/datetime';
import Button from '../button/Button';
import Tag from '../tag/Tag';

const NO_LOADING = 0;
const CANCEL_CANCELLATION_LOADING = 1;
const APPROVE_CANCELLATION_LOADING = 2;
const REJECT_CANCELLATION_LOADING = 3;
const CONTINUE_CANCELLATION_LOADING = 4;
const UNILATERAL_CANCELLATION_LOADING = 5;

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
    const isMyCancelRequest = cancelRequest?.requestedBy === user?.userId;
    const [
        cancelContractCancelRequestLoading,
        setCancelContractCancelRequestLoading,
    ] = useState(false);
    const [cancelCancellationLoading, setCancelCancellationLoading] =
        useState(NO_LOADING);

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

    const handleStatusUpdate = async (
        newStatus: ContractCancelRequestStatus,
    ) => {
        if (!cancelRequest) return;

        if (newStatus === 'APPROVED')
            setCancelCancellationLoading(APPROVE_CANCELLATION_LOADING);
        else if (newStatus === 'REJECTED')
            setCancelCancellationLoading(REJECT_CANCELLATION_LOADING);
        else if (newStatus === 'CANCELLED')
            setCancelCancellationLoading(CANCEL_CANCELLATION_LOADING);
        else if (newStatus === 'CONTINUE')
            setCancelCancellationLoading(CONTINUE_CANCELLATION_LOADING);
        else if (newStatus === 'UNILATERAL_CANCELLATION')
            setCancelCancellationLoading(UNILATERAL_CANCELLATION_LOADING);

        try {
            await updateCancelContractRequestStatus(
                cancelRequest.id,
                newStatus,
            );
            Alert.alert('Thành công', `Cập nhật trạng thái yêu cầu thành công`);
            setRefresh(!refresh); // Trigger re-fetch by updating the refresh state
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu cầu');
            console.error('Error updating request status:', error);
        } finally {
            setCancelCancellationLoading(NO_LOADING);
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
            Alert.alert(
                'Lỗi',
                (error as Error).message ||
                    'Không thể cập nhật trạng thái yêu cầu gia hạn',
            );
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
                    <Text style={[styles.label, { textAlign: 'center' }]}>
                        Yêu cầu hủy hợp đồng
                    </Text>
                    <Text style={styles.value}>
                        <Text style={commonStyles.fw600}>Người gửi:</Text>
                        &nbsp;
                        {cancelRequest.userRequest.name}
                    </Text>
                    <Text style={styles.value}>
                        <Text style={commonStyles.fw600}>Ngày gửi:</Text>
                        &nbsp;
                        <Text style={styles.value}>
                            {formatDateTime(cancelRequest.requestedAt, true)}
                        </Text>
                    </Text>

                    <Text style={styles.value}>
                        <Text style={commonStyles.fw600}>
                            Ngày kết thúc hợp đồng:
                        </Text>
                        &nbsp;
                        {formatDate(cancelRequest.cancelDate)}
                    </Text>
                    <Text style={styles.value}>
                        <Text style={commonStyles.fw600}>Lý do:</Text>
                        &nbsp;
                        {cancelRequest.reason}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 4,
                        }}
                    >
                        <View>
                            <Text style={styles.label}>Trạng thái:</Text>
                        </View>
                        <Tag
                            color={getCancelRequestColor(cancelRequest.status)}
                        >
                            {getStatusInVietnamese(cancelRequest.status)}
                        </Tag>
                    </View>

                    <View style={styles.buttonContainer}>
                        {isMyCancelRequest &&
                            cancelRequest.status === 'PENDING' && (
                                <Button
                                    style={commonStyles.flex1}
                                    type='danger'
                                    variant='outlined'
                                    onPress={() =>
                                        handleStatusUpdate('CANCELLED')
                                    }
                                    loading={
                                        cancelCancellationLoading ===
                                        CANCEL_CANCELLATION_LOADING
                                    }
                                >
                                    Hủy yêu cầu
                                </Button>
                            )}
                        {isMyCancelRequest &&
                            cancelRequest.status === 'REJECTED' && (
                                <>
                                    <Button
                                        style={commonStyles.flex1}
                                        type='danger'
                                        variant='outlined'
                                        onPress={() =>
                                            handleStatusUpdate(
                                                'UNILATERAL_CANCELLATION',
                                            )
                                        }
                                        loading={
                                            cancelCancellationLoading ===
                                            UNILATERAL_CANCELLATION_LOADING
                                        }
                                    >
                                        Đơn phương chấm dứt
                                    </Button>
                                    <Button
                                        style={commonStyles.flex1}
                                        type='primary'
                                        variant='fill'
                                        onPress={() =>
                                            handleStatusUpdate('CONTINUE')
                                        }
                                        loading={
                                            cancelCancellationLoading ===
                                            CONTINUE_CANCELLATION_LOADING
                                        }
                                    >
                                        Tiếp tục thuê
                                    </Button>
                                </>
                            )}
                        {/* FIXME */}
                        {cancelRequest.status === 'PENDING' &&
                            !isMyCancelRequest && (
                                <>
                                    <Button
                                        style={commonStyles.flex1}
                                        type='danger'
                                        variant='outlined'
                                        onPress={() =>
                                            handleStatusUpdate('REJECTED')
                                        }
                                        loading={
                                            cancelCancellationLoading ===
                                            REJECT_CANCELLATION_LOADING
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
                                        loading={
                                            cancelCancellationLoading ===
                                            APPROVE_CANCELLATION_LOADING
                                        }
                                    >
                                        Đồng ý
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
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>
                                  Thời gian ban đầu:
                              </Text>
                              &nbsp;
                              {formatDate(request.date)}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>
                                  Thời gian gia hạn:
                              </Text>
                              &nbsp;
                              {formatDate(request.extensionDate)}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>Lý do:</Text>
                              &nbsp;
                              {request.reason}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>
                                  Ngày gửi yêu cầu:
                              </Text>
                              &nbsp;
                              {formatDate(request.createdAt)}
                          </Text>
                          <View
                              style={{
                                  flexDirection: 'row',
                              }}
                          >
                              <Tag
                                  color={getCancelRequestColor(request.status)}
                              >
                                  {getStatusInVietnamese(request.status)}
                              </Tag>
                          </View>
                          <View style={styles.buttonContainer}>
                              {request.status === 'PENDING' && (
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
        gap: 4,
    },
    extensionRequestContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        gap: 4,
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
