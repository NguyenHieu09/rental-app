

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { sendRentalRequest } from '../../api/api';
// import { Property } from '../../types/navigation';
import { format } from 'date-fns';
import { IProperty } from '../../types/property';
import { sendRentalRequest } from '../../api/contract';
// import { format } from 'date-fns';

interface RentalRequestModalProps {
    isVisible: boolean;
    onClose: () => void;
    property: IProperty; // Ensure property is included in the props
    ownerId: string;
    userId: string;
}

const RentalRequestModal: React.FC<RentalRequestModalProps> = ({ isVisible, onClose, property, ownerId, userId }) => {
    const { propertyId, images, slug, title } = property;

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [deposit, setDeposit] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const handleConfirmStartDate = (date: Date) => {
        setStartDate(date);
        setStartDatePickerVisibility(false);
    };

    const handleConfirmEndDate = (date: Date) => {
        setEndDate(date);
        setEndDatePickerVisibility(false);
    };

    const handleRentalRequest = async () => {
        if (!startDate || !endDate) {
            Alert.alert('Error', 'Please select start and end dates');
            return;
        }

        // Calculate the exact date one month after the start date
        const minEndDate = new Date(startDate);
        minEndDate.setMonth(minEndDate.getMonth() + 1);

        // Check if the end date is at least one month after the start date
        if (endDate < minEndDate) {
            Alert.alert('Lỗi', 'Thời gian thuê tối thiểu là 1 tháng');
            return;
        }

        const rentalRequestData = {
            ownerId,
            propertyId,
            rentalPrice: parseFloat(rentalPrice),
            rentalDeposit: parseFloat(deposit),
            rentalEndDate: format(endDate, 'dd/MM/yyyy'),
            rentalStartDate: format(startDate, 'dd/MM/yyyy'),
        };

        try {
            const response = await sendRentalRequest(rentalRequestData);
            Alert.alert('Success', 'Yêu cầu thuê nhà đã được gửi!');
            onClose();
        } catch (error: any) {
            const errorMessage = error.message || 'Yêu cầu thuê nhà bị lỗi.';
            Alert.alert('Error', errorMessage);
        }
    };


    // const handleRentalRequest = async () => {
    //     if (!startDate || !endDate) {
    //         Alert.alert('Error', 'Please select start and end dates');
    //         return;
    //     }

    //     const rentalRequestData = {
    //         ownerId,
    //         propertyId,
    //         // property: { propertyId },
    //         rentalPrice: parseFloat(rentalPrice),
    //         rentalDeposit: parseFloat(deposit),
    //         rentalEndDate: format(endDate, 'dd/MM/yyyy'),
    //         rentalStartDate: format(startDate, 'dd/MM/yyyy'),
    //         // renterId: userId,
    //     };

    //     try {
    //         const response = await sendRentalRequest(rentalRequestData);
    //         Alert.alert('Success', 'Yêu cầu thuê nhà đã được gửi!');
    //         onClose();
    //     } catch (error: any) {
    //         const errorMessage = error.message || 'Yêu cầu thuê nhà bị lỗi.';
    //         Alert.alert('Error', errorMessage);
    //     }
    // };

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
                <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày kết thúc"
                        value={endDate ? format(endDate, 'dd/MM/yyyy') : ''}
                        editable={false}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmEndDate}
                    onCancel={() => setEndDatePickerVisibility(false)}
                    minimumDate={startDate || new Date()}
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
                <TouchableOpacity style={styles.submitButton} onPress={handleRentalRequest}>
                    <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
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