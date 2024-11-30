import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';


import { RootState } from '../../../redux-toolkit/store';
import { fetchReportsByOwner } from '../../../api/contract';
import { IReport, IReportFilterByOwner, ReportFilterStatus, ReportSort, ReportType } from '../../../types/report';

const ReportManagement = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [reports, setReports] = useState<IReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadReports = async () => {
            try {
                const filter: IReportFilterByOwner = {
                    status: 'all' as ReportFilterStatus,
                    type: 'incident' as ReportType,
                    sort: 'newest' as ReportSort,
                };
                const response = await fetchReportsByOwner(filter);
                console.log(response);
                setReports(response);
            } catch (error) {
                setError('Failed to load reports');
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reportItem}>
                        <Text style={styles.reportTitle}>{item.title}</Text>
                        <Text style={styles.reportDate}>{item.createdAt.toString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    reportItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reportDate: {
        fontSize: 14,
        color: '#666',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ReportManagement;