import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IReportDetail } from '../../types/report';
import { fetchReportDetails } from '../../api/contract';
import { getReportStatusColor, getReportStatusText, getReportPriorityColor, getReportPriorityText, getReportTypeColor, getReportTypeText } from '../../utils/colorTag';
import { formatDateTime } from '../../utils/datetime';
import { formatPrice } from '../../utils/formattedPrice';
import Tag from '../../components/tag/Tag';

type ReportDetailsRouteProp = RouteProp<RootStackParamList, 'ReportDetails'>;

const ReportDetails: React.FC = () => {
    const route = useRoute<ReportDetailsRouteProp>();
    const { reportId } = route.params;
    const [report, setReport] = useState<IReportDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

        loadReportDetails();
    }, [reportId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!report) {
        return <Text style={styles.errorText}>Report not found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chi tiết báo cáo</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Mã hợp đồng:</Text>
                <Text>{report.contractId}</Text>
                <Text style={styles.label}>Chủ nhà:</Text>
                <Text>{report.owner.name}</Text>
                <Text style={styles.label}>Người báo cáo:</Text>
                <Text>{report.owner.name}</Text>
                <Text style={styles.label}>Ngày báo cáo:</Text>
                <Text>{formatDateTime(report.createdAt, true)}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Mô tả chi tiết:</Text>
                <Text>{report.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Yêu cầu xử lý từ người thuê:</Text>
                <Text style={styles.label}>Đề xuất giải quyết:</Text>
                <Text>{report.reportChild[0]?.proposed}</Text>
                <Text style={styles.label}>Ngày giải quyết:</Text>
                <Text>{report.reportChild[0]?.resolvedAt ? formatDateTime(report.reportChild[0]?.resolvedAt, true) : 'N/A'}</Text>
                {report.reportChild[0]?.evidences.map((evidence, index) => (
                    <Image key={index} source={{ uri: evidence }} style={styles.image} />
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Đề xuất từ chủ nhà:</Text>
                <Text style={styles.label}>Đề xuất giải quyết:</Text>
                <Text>{report.reportChild[1]?.proposed}</Text>
                <Text style={styles.label}>Ngày giải quyết:</Text>
                <Text>{report.reportChild[1]?.resolvedAt ? formatDateTime(report.reportChild[1]?.resolvedAt, true) : 'N/A'}</Text>
                <Text style={styles.label}>Bồi thường:</Text>
                <Text>{formatPrice(report.reportChild[1]?.compensation)}</Text>
                {report.reportChild[1]?.evidences.map((evidence, index) => (
                    <Image key={index} source={{ uri: evidence }} style={styles.image} />
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Tiến trình xử lý:</Text>
                {report.history.map((item, index) => (
                    <Text key={index}>
                        {formatDateTime(item.createdAt, true)}: {getReportStatusText(item.status)}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
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
});

export default ReportDetails;