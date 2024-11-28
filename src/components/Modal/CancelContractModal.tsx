import { format, parseISO } from 'date-fns';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import { commonStyles } from '../../styles/theme';
import { formatPrice } from '../../utils/formattedPrice';
import Button from '../button/Button';

interface CancelContractModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (endDate: Date, reason: string) => Promise<void>;
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
    const [loading, setLoading] = useState(false);
    const userTypes = useSelector(
        (state: RootState) => state.user.user?.userTypes,
    );
    const isRenter = userTypes?.includes('renter');

    // const handleConfirm = () => {
    //     // const start = parseISO(startDate);
    //     // const end = parseISO(endDate);
    //     if (!desiredEndDate) {
    //         Alert.alert('Lỗi', 'Vui lòng nhập ngày kết thúc mong muốn.');
    //         return;
    //     }
    //     if (!reason.trim()) {
    //         Alert.alert('Lỗi', 'Vui lòng nhập lý do hủy hợp đồng.');
    //         return;
    //     }
    //     onConfirm(desiredEndDate, reason);
    // };

    const handleConfirm = async () => {
        if (!desiredEndDate) {
            Alert.alert('Lỗi', 'Vui lòng nhập ngày kết thúc mong muốn.');
            return;
        }

        try {
            setLoading(true);
            await onConfirm(desiredEndDate, reason);
        } catch (error) {
            Alert.alert(
                'Lỗi',
                'Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDate = (date: Date) => {
        setDesiredEndDate(date);
        setDatePickerVisibility(false);
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Huỷ hợp đồng</Text>
                    <Text style={styles.contractInfo}>
                        <Text style={styles.fw600}>Mã hợp đồng:</Text>{' '}
                        {contractId}
                    </Text>
                    <Text style={styles.contractInfo}>
                        <Text style={styles.fw600}>Ngày bắt đầu:</Text>{' '}
                        {format(new Date(startDate), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.contractInfo}>
                        <Text style={styles.fw600}>Ngày kết thúc:</Text>{' '}
                        {format(new Date(endDate), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.contractInfo}>
                        <Text style={styles.fw600}>Giá:</Text>{' '}
                        {formatPrice(price)}
                    </Text>
                    <Text style={styles.contractInfo}>
                        <Text style={styles.fw600}>Tiền cọc:</Text>{' '}
                        {formatPrice(deposit)}
                    </Text>
                    <Text style={commonStyles.h5}>Xác nhận huỷ hợp đồng</Text>
                    <Text style={styles.contractInfo}>
                        Bạn có chắc chắn muốn hủy hợp đồng này? Hãy chọn ngày
                        kết thúc mong muốn để chúng tôi xử lý.
                    </Text>
                    <Text style={styles.text}>Ngày kết thúc mong muốn</Text>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ width: '100%', flex: 1 }}
                            onPress={() => setDatePickerVisibility(true)}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder='Chọn ngày kết thúc'
                                value={
                                    desiredEndDate
                                        ? format(desiredEndDate, 'dd/MM/yyyy')
                                        : ''
                                }
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        minimumDate={parseISO(startDate)}
                        maximumDate={parseISO(endDate)}
                    />
                    <Text style={styles.text}>Lý do</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={[styles.textInput, commonStyles.flex1]}
                            placeholder='Nhập lý do hủy hợp đồng'
                            value={reason}
                            onChangeText={setReason}
                        />
                    </View>
                    <Text
                        style={{
                            color: '#ff4d4f',
                            fontSize: 14,
                            lineHeight: 22,
                            marginBottom: 10,
                        }}
                    >
                        {isRenter
                            ? `Lưu ý: Nếu muốn huỷ hợp đồng trước hạn nhưng không thông báo trước 30 ngày thì sẽ mất tiền cọc và phải trả thêm 1 tháng tiền thuê cho người thuê.`
                            : `Lưu ý: Nếu muốn huỷ hợp đồng trước hạn nhưng không thông báo trước 30 ngày thì sẽ mất tiền cọc cho chủ nhà.`}
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <Button
                            style={commonStyles.flex1}
                            variant='outlined'
                            onPress={onClose}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={commonStyles.flex1}
                            variant='outlined'
                            type='danger'
                            onPress={handleConfirm}
                            loading={loading}
                        >
                            Xác nhận
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
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'flex-start', // Align items to the left
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 12,
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
    },
    modalButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 8,
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
    fw600: {
        fontWeight: '600',
    },
});

export default CancelContractModal;
