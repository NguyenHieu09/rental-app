import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    fetchExtensionRequests,
    fetchHandledCancelContractRequest,
} from '../../api/contract';
import { commonStyles } from '../../styles/theme';
import { ICancelContractResponse } from '../../types/cancelContract';
import { IExtensionRequest } from '../../types/extensionRequest';
import {
    getCancelRequestColor,
    getExtensionRequestStatusColor,
} from '../../utils/colorTag';
import {
    getCancelRequestStatusText,
    getExtensionRequestStatusText,
} from '../../utils/contract';
import { formatDate, formatDateTime } from '../../utils/datetime';
import Tag from '../tag/Tag';

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

    useFocusEffect(
        useCallback(() => {
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
        }, [contractId]),
    );

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
                          <Text style={[styles.label, { textAlign: 'center' }]}>
                              Yêu cầu hủy hợp đồng
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>Người gửi:</Text>
                              &nbsp;
                              {request.userRequest.name}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>Ngày gửi:</Text>
                              &nbsp;
                              {formatDateTime(request.requestedAt)}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>
                                  Ngày kết thúc hợp đồng:
                              </Text>
                              &nbsp;
                              {formatDate(request.cancelDate)}
                          </Text>
                          <Text style={styles.value}>
                              <Text style={commonStyles.fw600}>Lý do:</Text>
                              &nbsp;
                              {request.reason}
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
                                  color={getCancelRequestColor(request.status)}
                              >
                                  {getCancelRequestStatusText(request.status)}
                              </Tag>
                          </View>
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
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  gap: 4,
                              }}
                          >
                              <View>
                                  <Text style={styles.label}>Trạng thái:</Text>
                              </View>
                              <Tag
                                  color={getExtensionRequestStatusColor(
                                      request.status,
                                  )}
                              >
                                  {getExtensionRequestStatusText(
                                      request.status,
                                  )}
                              </Tag>
                          </View>
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
});

export default HandledCancelRequestTab;
