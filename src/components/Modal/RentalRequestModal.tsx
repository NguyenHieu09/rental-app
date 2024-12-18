import { addMonths, format, startOfDay } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { sendRentalRequest } from "../../api/contract";
import { commonStyles } from "../../styles/theme";
import { IProperty } from "../../types/property";
import Button from "../button/Button";
import FormGroup from "../form/FormGroup";

interface RentalRequestModalProps {
  isVisible: boolean;
  onClose: () => void;
  property: IProperty; // Ensure property is included in the props
  ownerId: string;
  userId: string;
}

interface Errors {
  startDate?: string;
  months?: string;
  deposit?: string;
  price?: string;
}

const RentalRequestModal: React.FC<RentalRequestModalProps> = ({
  isVisible,
  onClose,
  property,
  ownerId,
  userId,
}) => {
  const { propertyId, images, slug, title } = property;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [months, setMonths] = useState<string>(
    property?.minDuration?.toString() || "1"
  );
  const [deposit, setDeposit] = useState<string>(
    property?.deposit?.toString() || ""
  );
  const [rentalPrice, setRentalPrice] = useState<string>(
    property?.price?.toString() || ""
  );

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);

  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (startDate && months) {
      const calculatedEndDate = addMonths(
        startOfDay(startDate),
        parseInt(months)
      );
      setEndDate(calculatedEndDate);
    } else {
      setEndDate(null);
    }
  }, [startDate, months]);

  const handleConfirmStartDate = (date: Date) => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
    setErrors((prev) => ({
      ...prev,
      startDate: undefined,
    }));
  };

  const handleRentalRequest = async () => {
    const errors: Errors = {};

    if (!startDate) {
      errors.startDate = "Chọn ngày bắt đầu";
    }

    if (!months || parseInt(months) <= 0) {
      errors.months = "Nhập số tháng thuê";
    }

    if (!deposit || parseFloat(deposit) < 0) {
      errors.deposit = "Nhập số tiền cọc";
    }

    if (!rentalPrice || parseFloat(rentalPrice) < 0) {
      errors.price = "Nhập số tiền thuê";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const rentalRequestData = {
      ownerId,
      propertyId,
      rentalPrice: parseFloat(rentalPrice),
      rentalDeposit: parseFloat(deposit),
      rentalEndDate: format(endDate!, "dd/MM/yyyy"),
      rentalStartDate: format(startDate!, "dd/MM/yyyy"),
    };

    setLoading(true);
    try {
      const response = await sendRentalRequest(rentalRequestData);
      Alert.alert("Thành công", "Yêu cầu thuê nhà đã được gửi!");
      onClose();
    } catch (error: any) {
      const errorMessage = error.message || "Yêu cầu thuê nhà bị lỗi.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeMonths = (text: string) => {
    setMonths(text);
    setErrors((prev) => ({
      ...prev,
      months: undefined,
    }));
  };

  const handleChangeDeposit = (text: string) => {
    setDeposit(text);
    setErrors((prev) => ({
      ...prev,
      deposit: undefined,
    }));
  };

  const handleChangeRentalPrice = (text: string) => {
    setRentalPrice(text);
    setErrors((prev) => ({
      ...prev,
      price: undefined,
    }));
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <FormGroup label="Ngày bắt đầu" isRequired error={errors?.startDate}>
          <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
            <TextInput
              style={styles.input}
              placeholder="Ngày bắt đầu"
              value={startDate ? format(startDate, "dd/MM/yyyy") : ""}
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
        </FormGroup>
        <FormGroup label="Số tháng" isRequired error={errors?.months}>
          <TextInput
            style={styles.input}
            placeholder="Số tháng thuê"
            keyboardType="numeric"
            value={months}
            onChangeText={handleChangeMonths}
          />
        </FormGroup>
        <FormGroup label="Ngày kết thúc">
          <TextInput
            style={styles.input}
            placeholder="Ngày kết thúc"
            value={endDate ? format(endDate, "dd/MM/yyyy") : ""}
            editable={false}
          />
        </FormGroup>
        <FormGroup label="Tiền thuê" isRequired error={errors?.price}>
          <TextInput
            style={styles.input}
            placeholder="Tiền thuê"
            keyboardType="numeric"
            value={rentalPrice}
            onChangeText={handleChangeRentalPrice}
          />
        </FormGroup>
        <FormGroup label="Tiền cọc" isRequired error={errors?.deposit}>
          <TextInput
            style={styles.input}
            placeholder="Tiền cọc"
            keyboardType="numeric"
            value={deposit}
            onChangeText={handleChangeDeposit}
          />
        </FormGroup>
        <View style={styles.footer}>
          <Button
            variant="outlined"
            onPress={handleClose}
            style={commonStyles.flex1}
          >
            Huỷ
          </Button>
          <Button
            style={commonStyles.flex1}
            type="primary"
            variant="fill"
            loading={loading}
            onPress={handleRentalRequest}
          >
            Gửi yêu cầu
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    fontWeight: "500",
    color: "white",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
});

export default RentalRequestModal;
