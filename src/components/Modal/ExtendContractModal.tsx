import { format, isValid, parse, parseISO } from 'date-fns';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IContract } from '../../types/contract';
import Button from '../button/Button';
import FormGroup from '../form/FormGroup';

interface ExtendContractModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (extensionDate: string, reason: string) => Promise<void>;
    contract?: IContract;
    endDate?: string;
    type: string;
}

const ExtendContractModal: React.FC<ExtendContractModalProps> = ({
    visible,
    onClose,
    onConfirm,
    type,
    contract,
    endDate,
}) => {
    const [extensionDate, setExtensionDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [error, setError] = useState('');

    const handleConfirmDate = (date: Date) => {
        const formattedDate = format(date, 'dd/MM/yyyy');
        setExtensionDate(formattedDate);
        setDatePickerVisibility(false);
        setError('');
    };

    const handleConfirm = async () => {
        if (!extensionDate) {
            return setError('Vui lòng chọn ngày gia hạn');
        } else if (!isValid(parse(extensionDate, 'dd/MM/yyyy', new Date()))) {
            return setError('Ngày gia hạn không hợp lệ');
        }

        setLoading(true);
        try {
            await onConfirm(
                format(
                    parse(extensionDate, 'dd/MM/yyyy', new Date()),
                    'yyyy-MM-dd',
                ),
                reason,
            );
            onClose();
        } catch (error) {
            console.log('🚀 ~ handleConfirm ~ error:', error);
            Alert.alert('Lỗi', (error as Error).message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setExtensionDate('');
        setReason('');
        setError('');
        onClose();
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
        <Modal visible={visible} transparent={true} animationType='slide'>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        {type === 'EXTEND_CONTRACT'
                            ? 'Gia hạn hợp đồng'
                            : 'Gia hạn hóa đơn'}
                    </Text>
                    <FormGroup label='Ngày gia hạn' isRequired error={error}>
                        <TouchableOpacity
                            onPress={() => setDatePickerVisibility(true)}
                            style={{ width: '100%' }}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Chọn ngày gia hạn'
                                value={extensionDate}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirmDate}
                            onCancel={() => setDatePickerVisibility(false)}
                            minimumDate={minDate}
                            maximumDate={maxDate}
                        />
                    </FormGroup>
                    <FormGroup label='Lý do'>
                        <TextInput
                            style={styles.input}
                            placeholder='Nhập lý do gia hạn...'
                            value={reason}
                            onChangeText={setReason}
                        />
                    </FormGroup>

                    <View style={styles.buttonContainer}>
                        <Button
                            style={[styles.button]}
                            variant='outlined'
                            onPress={handleClose}
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
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
