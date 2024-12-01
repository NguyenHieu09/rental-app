


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Modal, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import { RootStackParamList } from '../../types/navigation';
import { IReportDetail } from '../../types/report';
import { acceptProposal, acceptProposalByRenter, cancelReport, fetchReportDetails, ownerProposeReport, rejectProposalByRenter } from '../../api/contract';
import { getReportStatusText } from '../../utils/colorTag';
import { formatDateTime } from '../../utils/datetime';
import { formatPrice } from '../../utils/formattedPrice';
import { format } from 'date-fns';
import Button from '../../components/button/Button';
import SuggestionModal from '../../components/modal/SuggestionModal';


// utils/errorUtils.ts
const parseErrorDetails = (error: any): string => {
    if (error.response && error.response.data) {
        const { message, details } = error.response.data;

        // Nếu có trường `details`, định dạng thông báo
        if (details && Array.isArray(details)) {
            const detailMessages = details
                .map((detail: any) => `${detail.field}: ${detail.error}`)
                .join('\n');
            return `${message}\n\nChi tiết:\n${detailMessages}`;
        }

        // Nếu chỉ có `message`
        return message || 'Đã xảy ra lỗi không xác định.';
    }

    // Nếu không có phản hồi từ API
    return error.message || 'Lỗi kết nối hoặc vấn đề không xác định.';
};


type ReportDetailsRouteProp = RouteProp<RootStackParamList, 'ReportDetails'>;
const ReportDetails: React.FC = () => {
    const route = useRoute<ReportDetailsRouteProp>();
    const { reportId } = route.params;
    const user = useSelector((state: RootState) => state.user.user);
    const [report, setReport] = useState<IReportDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSuggestionModalVisible, setSuggestionModalVisible] = useState(false);



    const loadReportDetails = async () => {
        try {
            const response = await fetchReportDetails(reportId);
            setReport(response);
        } catch (error: any) {
            setError(error.message || 'Failed to load report details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReportDetails();
    }, [reportId]);

    const handleAccept = async () => {
        if (!report) return;

        const lastReportChild = report.reportChild.at(-1);
        if (!lastReportChild) return;

        console.log(lastReportChild);

        try {
            const response = await acceptProposal(report.id, lastReportChild.id);
            if (response.success) {
                Alert.alert('Thành công', 'Đã chấp nhận đề xuất thành công');
                loadReportDetails();

            } else {
                Alert.alert('Lỗi', response.message);
            }
        } catch (error: any) {
            const errorMessage = parseErrorDetails(error);
            console.log(errorMessage);
            Alert.alert('Lỗi', errorMessage);
        }
    };

    const handlePropose = () => {
        // Open the SuggestionModal
        setSuggestionModalVisible(true);
    };

    const handleCancel = async () => {
        if (!report) return;

        try {
            const response = await cancelReport(report.id);
            if (response.success) {
                Alert.alert('Thành công', 'Đã hủy báo cáo thành công');
                loadReportDetails();
            } else {
                Alert.alert('Lỗi', response.message);
            }
        } catch (error: any) {
            const errorMessage = parseErrorDetails(error);
            console.log(errorMessage);
            Alert.alert('Lỗi', errorMessage);
        }
    };

    const handleSuggestionSubmit = async (data: any) => {
        const formData = new FormData();

        for (const image of data.media) {
            formData.append('evidences', {
                uri: image.uri,
                name: image.fileName,
                type: 'image/jpeg',
            } as any);
        }

        formData.append('proposed', data.proposed);
        formData.append('resolvedAt', data.resolvedAt);
        formData.append('compensation', String(data.compensation));
        formData.append('reportId', String(reportId));

        console.log(formData);

        try {

            const responses = await ownerProposeReport(formData);
            console.log(responses);
            Alert.alert('Thành công', 'Đã gửi đề xuất thành công');
            loadReportDetails();

        } catch (error: any) {
            const errorMessage = parseErrorDetails(error);
            console.log(errorMessage);
            Alert.alert('Lỗi', errorMessage);

        };
    };

    const handleReject = async () => {
        if (!report) return;

        const lastReportChild = report.reportChild.at(-1);
        if (!lastReportChild) return;

        try {
            const response = await rejectProposalByRenter(lastReportChild.id);
            if (response.success) {
                Alert.alert('Thành công', 'Đã từ chối đề xuất thành công');
                loadReportDetails();
            } else {
                Alert.alert('Lỗi', response.message);
            }
        } catch (error: any) {
            const errorMessage = parseErrorDetails(error);
            console.log(errorMessage);
            Alert.alert('Lỗi', errorMessage);
        }
    };

    const handleAcceptByRenter = async () => {
        if (!report) return;

        const lastReportChild = report.reportChild.at(-1);
        if (!lastReportChild) return;

        try {
            const response = await acceptProposalByRenter(lastReportChild.id);
            if (response.success) {
                Alert.alert('Thành công', 'Đã chấp nhận đề xuất thành công');
                loadReportDetails();
            } else {
                Alert.alert('Lỗi', response.message);
            }
        } catch (error: any) {
            const errorMessage = parseErrorDetails(error);
            console.log(errorMessage);
            Alert.alert('Lỗi', errorMessage);
        }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!report) {
        return <Text style={styles.errorText}>Report not found</Text>;
    }

    const lastReportChild = report.reportChild.at(-1)!;
    // const childReportOfRenter = report.reportChild.at(0)!;
    // const childReportOfOwner = report.reportChild.at(1);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Mã hợp đồng:</Text>
                    <Text>{report.contractId}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Chủ nhà:</Text>
                    <Text>{report.owner.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Người báo cáo:</Text>
                    <Text>{report.renter.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Ngày báo cáo:</Text>
                    <Text>{formatDateTime(report.createdAt, true)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Mô tả chi tiết:</Text>
                <Text>{report.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Yêu cầu xử lý từ người thuê:</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Đề xuất giải quyết:</Text>
                    <Text>{report.reportChild[0]?.proposed}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Ngày giải quyết:</Text>
                    <Text>{report.reportChild[0]?.resolvedAt ? format(report.reportChild[0]?.resolvedAt, 'dd/MM/yyyy') : ''}</Text>
                </View>
                {report.reportChild[0]?.evidences.map((evidence, index) => (
                    <Image key={index} source={{ uri: evidence }} style={styles.image} />
                ))}
                {lastReportChild.status === 'pending_owner' && (
                    <View style={styles.buttonContainer}>
                        {user?.userTypes.includes('owner') ? (
                            <>
                                <Button type='default' variant='outlined' onPress={handlePropose}>Đề xuất xử lý khác</Button>
                                <Button type='primary' variant='fill' onPress={handleAccept}>Đồng ý với yêu cầu</Button>
                            </>
                        ) : (
                            <View style={{ width: '100%' }}>
                                <Button type='danger' variant='outlined' onPress={handleCancel}>Hủy</Button>
                            </View>
                        )}
                    </View>
                )}
            </View>

            {report.reportChild[1] && (
                <View style={styles.section}>
                    <Text style={styles.label}>Đề xuất từ chủ nhà:</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Đề xuất giải quyết:</Text>
                        <Text>{report.reportChild[1]?.proposed}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ngày giải quyết:</Text>
                        <Text>{report.reportChild[1]?.resolvedAt ? format(report.reportChild[0]?.resolvedAt, 'dd/MM/yyyy') : ''}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bồi thường:</Text>
                        <Text>{formatPrice(report.reportChild[1]?.compensation)}</Text>
                    </View>
                    {report.reportChild[1]?.evidences.map((evidence, index) => (
                        <Image key={index} source={{ uri: evidence }} style={styles.image} />
                    ))}

                    {lastReportChild.status === 'pending_renter' && user?.userTypes.includes('renter') && (
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} type='danger' variant='outlined' onPress={handleReject}>Từ chối</Button>
                            <Button style={styles.button} type='primary' variant='fill' onPress={handleAcceptByRenter}>Đồng ý</Button>
                        </View>
                    )}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.label}>Tiến trình xử lý:</Text>
                {report.history.map((item, index) => (
                    <Text key={index}>
                        {formatDateTime(item.createdAt, true)}: {getReportStatusText(item.status)}
                    </Text>
                ))}
            </View>

            <SuggestionModal
                visible={isSuggestionModalVisible}
                onClose={() => setSuggestionModalVisible(false)}
                onSubmit={handleSuggestionSubmit}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    row: {
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 20
    },
    button: {
        flex: 1,
    }
});

export default ReportDetails;