


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addMonths, format, startOfDay } from 'date-fns';
import { IProperty } from '../../types/property';
import { sendRentalRequest } from '../../api/contract';

interface RentalRequestModalProps {
    isVisible: boolean;
    onClose: () => void;
    property: IProperty; // Ensure property is included in the props
    ownerId: string;
    userId: string;
}

const RentalRequestModal: React.FC<RentalRequestModalProps> = ({ isVisible, onClose, property, ownerId, userId }) => {
    const { propertyId, images, slug, title } = property;
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(new Date()); // Mặc định là hôm nay
    const [months, setMonths] = useState<string>(property?.minDuration?.toString() || '');
    const [deposit, setDeposit] = useState<string>(property?.deposit?.toString() || '');
    const [rentalPrice, setRentalPrice] = useState<string>(property?.price?.toString() || '');

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (startDate && months) {
            const calculatedEndDate = addMonths(startOfDay(startDate), parseInt(months));
            setEndDate(calculatedEndDate);
        } else {
            setEndDate(null);
        }
    }, [startDate, months]);

    const handleConfirmStartDate = (date: Date) => {
        setStartDate(date);
        setStartDatePickerVisibility(false);
    };

    const handleRentalRequest = async () => {
        if (!startDate) {
            Alert.alert('Lỗi', 'Vui lòng chọn ngày bắt đầu.');
            return;
        }

        if (!months || parseInt(months) <= 0) {
            Alert.alert('Lỗi', 'Số tháng phải lớn hơn 0.');
            return;
        }

        if (!deposit || parseFloat(deposit) <= 0) {
            Alert.alert('Lỗi', 'Tiền cọc phải lớn hơn 0.');
            return;
        }

        if (!rentalPrice || parseFloat(rentalPrice) <= 0) {
            Alert.alert('Lỗi', 'Tiền thuê phải lớn hơn 0.');
            return;
        }

        const rentalRequestData = {
            ownerId,
            propertyId,
            rentalPrice: parseFloat(rentalPrice),
            rentalDeposit: parseFloat(deposit),
            rentalEndDate: format(endDate!, 'dd/MM/yyyy'),
            rentalStartDate: format(startDate, 'dd/MM/yyyy'),
        };

        setLoading(true); // Bật trạng thái loading
        try {
            const response = await sendRentalRequest(rentalRequestData);
            Alert.alert('Thành công', 'Yêu cầu thuê nhà đã được gửi!');
            onClose();
        } catch (error: any) {
            const errorMessage = error.message || 'Yêu cầu thuê nhà bị lỗi.';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Nhập thông tin thuê nhà</Text>
                <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày bắt đầu"
                        value={startDate ? format(startDate, 'dd/MM/yyyy') : ''}
                        editable={false}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmStartDate}
                    onCancel={() => setStartDatePickerVisibility(false)}
                    minimumDate={new Date()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số tháng thuê"
                    keyboardType="numeric"
                    value={months}
                    onChangeText={(text) => setMonths(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ngày kết thúc"
                    value={endDate ? format(endDate, 'dd/MM/yyyy') : ''}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tiền cọc"
                    keyboardType="numeric"
                    value={deposit}
                    onChangeText={(text) => setDeposit(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tiền thuê"
                    keyboardType="numeric"
                    value={rentalPrice}
                    onChangeText={(text) => setRentalPrice(text)}
                />
                <TouchableOpacity style={[styles.submitButton]} onPress={handleRentalRequest} disabled={loading}>
                    <Text style={styles.submitButtonText}>{loading ? 'Đang gửi...' : 'Gửi yêu cầu'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        fontWeight: '500',
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});

export default RentalRequestModal;