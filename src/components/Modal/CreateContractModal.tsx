import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

interface CreateContractModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (contractData: any) => void;
}

const CreateContractModal: React.FC<CreateContractModalProps> = ({
    visible,
    onClose,
    onCreate,
}) => {
    const [contractData, setContractData] = useState({
        propertyId: '',
        renterId: '',
        startDate: '',
        endDate: '',
        monthlyRent: '',
        depositAmount: '',
    });

    const handleChange = (name: string, value: string) => {
        setContractData({ ...contractData, [name]: value });
    };

    const handleCreate = () => {
        if (
            !contractData.propertyId ||
            !contractData.renterId ||
            !contractData.startDate ||
            !contractData.endDate ||
            !contractData.monthlyRent ||
            !contractData.depositAmount
        ) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        onCreate(contractData);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Tạo hợp đồng mới</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mã tài sản"
                        value={contractData.propertyId}
                        onChangeText={(text) => handleChange('propertyId', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mã người thuê"
                        value={contractData.renterId}
                        onChangeText={(text) => handleChange('renterId', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày bắt đầu"
                        value={contractData.startDate}
                        onChangeText={(text) => handleChange('startDate', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày kết thúc"
                        value={contractData.endDate}
                        onChangeText={(text) => handleChange('endDate', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Giá thuê hàng tháng"
                        value={contractData.monthlyRent}
                        onChangeText={(text) => handleChange('monthlyRent', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tiền cọc"
                        value={contractData.depositAmount}
                        onChangeText={(text) => handleChange('depositAmount', text)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.createButton]}
                            onPress={handleCreate}
                        >
                            <Text style={styles.buttonText}>Tạo</Text>
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
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    createButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CreateContractModal;