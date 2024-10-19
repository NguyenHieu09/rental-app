import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, parseISO } from 'date-fns';

interface CancelContractModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (endDate: Date, reason: string) => void;
    contractId: string;
    startDate: string;
    endDate: string;
    price: number;
    deposit: number;
}

const CancelContractModal: React.FC<CancelContractModalProps> = ({
    visible,
    onClose,
    onConfirm,
    contractId,
    startDate,
    endDate,
    price,
    deposit,
}) => {
    const [desiredEndDate, setDesiredEndDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [reason, setReason] = useState<string>('');


    const handleConfirm = () => {
        const start = parseISO(startDate);
        const end = parseISO(endDate);
        if (!desiredEndDate) {
            Alert.alert('Lỗi', 'Vui lòng nhập ngày kết thúc mong muốn.');
            return;
        }
        if (!reason.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập lý do hủy hợp đồng.');
            return;
        }
        onConfirm(desiredEndDate, reason);
    };

    const handleConfirmDate = (date: Date) => {
        setDesiredEndDate(date);
        setDatePickerVisibility(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Xác nhận huỷ hợp đồng</Text>
                    <Text style={styles.contractInfo}>Mã hợp đồng: {contractId}</Text>
                    <Text style={styles.contractInfo}>Ngày bắt đầu: {format(new Date(startDate), 'dd/MM/yyyy')}</Text>
                    <Text style={styles.contractInfo}>Ngày kết thúc: {format(new Date(endDate), 'dd/MM/yyyy')}</Text>
                    <Text style={styles.contractInfo}>Giá: {price.toLocaleString()} ₫</Text>
                    <Text style={styles.contractInfo}>Tiền cọc: {deposit.toLocaleString()} ₫</Text>
                    <Text style={styles.modalText}>Bạn có chắc chắn muốn hủy hợp đồng này? Hãy chọn ngày kết thúc mong muốn để chúng tôi xử lý.</Text>
                    <Text style={styles.text}>Ngày kết thúc mong muốn:</Text>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setDatePickerVisibility(true)}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Chọn ngày kết thúc"
                            value={desiredEndDate ? format(desiredEndDate, 'dd/MM/yyyy') : ''}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        minimumDate={parseISO(startDate)}
                        maximumDate={parseISO(endDate)}
                    />
                    <Text style={styles.text}>Lí do:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Nhập lí do hủy hợp đồng'
                        value={reason}
                        onChangeText={setReason}
                    />
                    <Text style={{ color: 'red', marginBottom: 10 }}>Lưu ý: Nếu muốn huỷ hợp đồng trước hạn nhưng không thông báo trước 30 ngày thì sẽ mất tiền cọc và phải trả thêm 1 tháng tiền thuê cho người thuê.</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                            <Text style={styles.buttonText}>Xác nhận</Text>
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
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'flex-start', // Align items to the left
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 18,
    },
    contractInfo: {
        marginBottom: 2,
        textAlign: 'left',
        fontSize: 14,
        color: '#007BFF',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    textInput: {
        width: '100%',
        padding: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    text: {

        fontSize: 14,
        marginBottom: 5,
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

export default CancelContractModal;

