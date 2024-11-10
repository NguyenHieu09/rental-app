import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ICancelContractResponse } from '../../types/cancelContract';
import { getCancellationStatusInVietnamese } from '../../utils/contract';

const HandledCancelRequestTab: React.FC<{ cancelRequest: ICancelContractResponse[] | null }> = ({ cancelRequest }) => {
    return (
        <View style={styles.container}>
            {cancelRequest && cancelRequest.length > 0 ? (
                cancelRequest.map((request) => (
                    <View key={request.id} style={styles.cancelRequestContainer}>
                        <Text style={styles.label}>Người yêu cầu:</Text>
                        <Text style={styles.value}>{request.userRequest.name}</Text>
                        <Text style={styles.label}>Ngày gửi yêu cầu:</Text>
                        <Text style={styles.value}>{new Date(request.requestedAt).toLocaleDateString()}</Text>
                        <Text style={styles.label}>Ngày hủy:</Text>
                        <Text style={styles.value}>{new Date(request.cancelDate).toLocaleDateString()}</Text>
                        <Text style={styles.label}>Lý do:</Text>
                        <Text style={styles.value}>{request.reason}</Text>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Text style={styles.status}>{getCancellationStatusInVietnamese(request.status)}</Text>
                    </View>
                ))
            ) : (
                <Text>Không có yêu cầu hủy đã xử lý</Text>
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
});

export default HandledCancelRequestTab;
