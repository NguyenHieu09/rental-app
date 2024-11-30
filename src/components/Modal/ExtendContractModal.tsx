

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles } from '../../styles/theme';
import { format, parseISO, isValid, parse } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IContract } from '../../types/contract';
import Button from '../button/Button';

interface ExtendContractModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (extensionDate: string, reason: string) => void;
    contract?: IContract;
    endDate?: string;
    type: string;
}

const ExtendContractModal: React.FC<ExtendContractModalProps> = ({ visible, onClose, onConfirm, type, contract, endDate }) => {
    const [extensionDate, setExtensionDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirmDate = (date: Date) => {
        const formattedDate = format(date, 'dd/MM/yyyy');
        setExtensionDate(formattedDate);
        setDatePickerVisibility(false);
    };

    const handleConfirm = async () => {
        if (!extensionDate) {
            Alert.alert('Lỗi', 'Vui lòng nhập ngày gia hạn');
            return;
        }

        const parsedDate = parse(extensionDate, 'dd/MM/yyyy', new Date());
        if (!isValid(parsedDate)) {
            Alert.alert('Lỗi', 'Ngày gia hạn không hợp lệ');
            return;
        }

        setLoading(true);
        try {
            await onConfirm(format(parsedDate, 'yyyy-MM-dd'), reason);
            Alert.alert('Thành công', 'Cập nhật trạng thái yêu cầu gia hạn thành công');
            onClose();
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi gia hạn');
        } finally {
            setLoading(false);
        }
    };

    const today = new Date();
    const contractEndDate = contract ? parseISO(contract.endDate) : today;
    const paymentEndDate = endDate ? parseISO(endDate) : today;

    const minDate =
        type === 'EXTEND_PAYMENT' && isValid(paymentEndDate)
            ? paymentEndDate
            : type === 'EXTEND_CONTRACT' && isValid(contractEndDate)
                ? contractEndDate
                : today;

    const maxDate =
        type === 'EXTEND_PAYMENT' && isValid(paymentEndDate)
            ? new Date(paymentEndDate.getTime() + 5 * 24 * 60 * 60 * 1000)
            : undefined;

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        {type === 'EXTEND_CONTRACT' ? 'Gia hạn hợp đồng' : 'Gia hạn hóa đơn'}
                    </Text>

                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ width: "100%" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ngày gia hạn"
                            value={extensionDate}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        minimumDate={minDate}
                        maximumDate={maxDate}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Lý do"
                        value={reason}
                        onChangeText={setReason}
                    />

                    <View style={styles.buttonContainer}>

                        <Button
                            style={[styles.button]}

                            variant='outlined'
                            type='danger'
                            onPress={onClose}
                        >
                            Hủy
                        </Button>

                        <Button
                            style={[styles.button]}
                            loading={loading}
                            variant='fill'
                            type='primary'
                            onPress={handleConfirm}
                        >
                            Gia hạn
                        </Button>
                    </View>
                </View>
            </View>
        </Modal >
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
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
        // width: '100%',
        gap: 10,
    },
    button: {
        // backgroundColor: '#2196F3',


        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,


    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ExtendContractModal;