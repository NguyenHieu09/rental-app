import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { IReport } from '../../types/report';
import { fetchReportsByRenter } from '../../api/contract';
import { getReportStatusColor, getReportStatusText, getReportPriorityColor, getReportPriorityText, getReportTypeColor, getReportTypeText } from '../../utils/colorTag';
import { formatDateTime } from '../../utils/datetime';
import { formatPrice } from '../../utils/formattedPrice';
import Tag from '../../components/tag/Tag';
import { RootStackParamList } from '../../types/navigation';
import { commonStyles } from '../../styles/theme';
import { IconOutline } from '@ant-design/icons-react-native';

const MyReport = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [reports, setReports] = useState<IReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    useFocusEffect(
        useCallback(() => {
            loadReports();
            // navigation.setOptions({

            //     headerRight: () => (
            //         <TouchableOpacity
            //             style={{ right: 10 }}
            //             onPress={() => navigation.navigate('AddReport')}
            //         >
            //             <IconOutline name="plus" size={20} color="#000" />
            //         </TouchableOpacity>
            //     ),
            // });
        }, [dispatch, navigation]),
    );


    const loadReports = async () => {
        try {
            const response = await fetchReportsByRenter();
            console.log(response);
            setReports(response);
        } catch (error) {
            setError('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.reportItem}
                        onPress={() => navigation.navigate('ReportDetails', { reportId: item.id })}
                    >
                        <Text style={styles.reportTitle}>Tiêu đề: {item.title}</Text>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>Loại báo cáo</Text>
                            <Tag color={getReportTypeColor(item.type)}>
                                {getReportTypeText(item.type)}
                            </Tag>
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>Mức độ ưu tiên</Text>
                            <Tag color={getReportPriorityColor(item.priority)}>
                                {getReportPriorityText(item.priority)}
                            </Tag>
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>Trạng thái</Text>
                            <Tag color={getReportStatusColor(item.status)}>
                                {getReportStatusText(item.status)}
                            </Tag>
                        </View>
                        <Text style={styles.reportField}>Đề xuất: {item.proposed}</Text>
                        <Text style={styles.reportField}>Bồi thường: {formatPrice(item.compensation)}</Text>
                        <Text style={styles.reportField}>Ngày giải quyết: {item.resolvedAt ? formatDateTime(item.resolvedAt.toString(), true) : 'N/A'}</Text>
                        <Text style={styles.reportField}>Ngày tạo: {formatDateTime(item.createdAt.toString(), true)}</Text>

                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    reportItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reportField: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    tagContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MyReport;