import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { commonStyles } from '../../styles/theme';


interface ConnectWalletModalProps {
    visible: boolean;
    onClose: () => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Kết nối ví</Text>
                    <Text style={styles.modalDescription}>Bạn cần kết nối ví để tạo hợp đồng.</Text>
                    <W3mButton label="Kết nối ví" />
                    <TouchableOpacity style={[styles.button]} onPress={onClose}>
                        <Text style={styles.buttonText}>Đóng</Text>
                    </TouchableOpacity>
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
    },
    modalDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },


    button: {
        backgroundColor: '#f44336',
        width: 90,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {

        color: 'white',
        fontWeight: '500',
        fontSize: 16,

    },
});

export default ConnectWalletModal;