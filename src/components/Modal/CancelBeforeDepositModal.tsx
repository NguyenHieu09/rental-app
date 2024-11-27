

import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../styles/theme';
import { ActivityIndicator } from 'react-native-paper';

interface CancelBeforeDepositModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    contractId: string;
}

const CancelBeforeDepositModal: React.FC<CancelBeforeDepositModalProps> = ({ visible, onClose, onConfirm, contractId }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm();
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Bạn có chắc muốn{`\n`}hủy hợp đồng?</Text>
                    <Text style={styles.modalDescription}>
                        Việc hủy hợp đồng trước khi đặt cọc là hành động <Text style={styles.highlightText}>không thể hoàn tác</Text>.
                        Hãy cân nhắc thật kỹ trước khi xác nhận.
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onClose}>
                            <Text style={commonStyles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
                            {loading ? (
                                // <ActivityIndicator size="small" color="#fff" />
                                <Text style={commonStyles.buttonText}>Đang xử lý...</Text>
                            ) : (
                                <Text style={commonStyles.buttonText}>Đồng ý</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    highlightText: {
        color: '#e53935',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CancelBeforeDepositModal;
