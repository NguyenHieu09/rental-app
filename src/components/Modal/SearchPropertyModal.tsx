import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconOutline } from "@ant-design/icons-react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { formatPrice } from "../../utils/formattedPrice";
import AddressInput from "../form/AddressInput";
import { Picker } from "@react-native-picker/picker";

interface SearchPropertyModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const { width, height } = Dimensions.get("window");
const modalWidth = width;
const modalHeight = height * 0.8;

const propertyStatusOptions = [
  { label: "Tất cả", value: "" },
  { label: "Đang chờ duyệt", value: "PENDING" },
  { label: "Đã duyệt", value: "ACTIVE" },
  { label: "Đã ẩn", value: "INACTIVE" },
  { label: "Đã từ chối", value: "REJECTED" },
  { label: "Đã cho thuê", value: "UNAVAILABLE" },
];

const SearchPropertyModal: React.FC<SearchPropertyModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
}) => {
  const [title, setTitle] = useState<string>("");
  const [depositRange, setDepositRange] = useState([0, 1000000000]);
  const [rentPriceRange, setRentPriceRange] = useState([0, 1000000000]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedCityName, setSelectedCityName] = useState<string | undefined>(
    undefined
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    undefined
  );
  const [selectedDistrictName, setSelectedDistrictName] = useState<
    string | undefined
  >(undefined);
  const [selectedWard, setSelectedWard] = useState<string | undefined>(
    undefined
  );
  const [selectedWardName, setSelectedWardName] = useState<string | undefined>(
    undefined
  );
  const [street, setStreet] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleRefresh = () => {
    setTitle("");
    setDepositRange([0, 1000000000]);
    setRentPriceRange([0, 1000000000]);
    setSelectedCity(undefined);
    setSelectedCityName(undefined);
    setSelectedDistrict(undefined);
    setSelectedDistrictName(undefined);
    setSelectedWard(undefined);
    setSelectedWardName(undefined);
    setStreet("");
    setSelectedStatus("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Tìm kiếm bất động sản</Text>
            <Pressable onPress={onClose}>
              <IconOutline name="close" size={24} color="red" />
            </Pressable>
          </View>

          <ScrollView>
            <View style={styles.condition}>
              <Text style={styles.title}>Tiêu đề</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tiêu đề"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.condition}>
              <Text style={styles.title}>Tiền đặt cọc</Text>
              <Text>{`Tiền đặt cọc tối thiểu: ${formatPrice(
                depositRange[0]
              )}`}</Text>
              <Text>{`Tiền đặt cọc tối đa: ${formatPrice(
                depositRange[1]
              )}`}</Text>
              <View style={{ alignItems: "center" }}>
                <MultiSlider
                  sliderLength={modalWidth - 60}
                  values={depositRange}
                  onValuesChange={(values) => setDepositRange(values)}
                  min={0}
                  max={1000000000}
                  step={100000}
                  allowOverlap={false}
                  snapped={true}
                  trackStyle={styles.track}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.marker}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nhập tiền đặt cọc tối thiểu"
                keyboardType="numeric"
                value={String(depositRange[0] || 0)}
                onChangeText={(text) => {
                  const value = Number(text) || depositRange[0];
                  const otherValue = depositRange[1];

                  if (value > otherValue) {
                    setDepositRange([otherValue, value]);
                  } else {
                    setDepositRange([value, otherValue]);
                  }
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập tiền đặt cọc tối đa"
                keyboardType="numeric"
                value={String(depositRange[1] || 0)}
                onChangeText={(text) => {
                  const value = Number(text) || depositRange[1];
                  const otherValue = depositRange[0];

                  if (value < otherValue) {
                    setDepositRange([value, otherValue]);
                  } else {
                    setDepositRange([otherValue, value]);
                  }
                }}
              />
            </View>

            <View style={styles.condition}>
              <Text style={styles.title}>Giá thuê</Text>
              <Text>{`Giá thuê tối thiểu: ${formatPrice(
                rentPriceRange[0]
              )}`}</Text>
              <Text>{`Giá thuê tối đa: ${formatPrice(
                rentPriceRange[1]
              )}`}</Text>
              <View style={{ alignItems: "center" }}>
                <MultiSlider
                  sliderLength={modalWidth - 60}
                  values={rentPriceRange}
                  onValuesChange={(values) => setRentPriceRange(values)}
                  min={0}
                  max={1000000000}
                  step={100000}
                  allowOverlap={false}
                  snapped={true}
                  trackStyle={styles.track}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.marker}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nhập giá thuê tối thiểu"
                keyboardType="numeric"
                value={String(rentPriceRange[0] || 0)}
                onChangeText={(text) => {
                  const value = Number(text) || rentPriceRange[0];
                  const otherValue = rentPriceRange[1];

                  if (value > otherValue) {
                    setRentPriceRange([otherValue, value]);
                  } else {
                    setRentPriceRange([value, otherValue]);
                  }
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập giá thuê tối đa"
                keyboardType="numeric"
                value={String(rentPriceRange[1] || 0)}
                onChangeText={(text) => {
                  const value = Number(text) || rentPriceRange[1];
                  const otherValue = rentPriceRange[0];

                  if (value < otherValue) {
                    setRentPriceRange([value, otherValue]);
                  } else {
                    setRentPriceRange([otherValue, value]);
                  }
                }}
              />
            </View>

            <View style={styles.condition}>
              <Text style={styles.title}>Trạng thái</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedStatus}
                  onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                  style={styles.picker}
                >
                  {propertyStatusOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.condition}>
              <Text style={styles.title}>Địa chỉ</Text>
              <AddressInput
                selectedCity={selectedCity}
                setSelectedCity={(value, name) => {
                  setSelectedCity(value);
                  setSelectedCityName(name);
                }}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={(value, name) => {
                  setSelectedDistrict(value);
                  setSelectedDistrictName(name);
                }}
                selectedWard={selectedWard}
                setSelectedWard={(value, name) => {
                  setSelectedWard(value);
                  setSelectedWardName(name);
                }}
                street={street}
                setStreet={setStreet}
                showStreetInput={false}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleRefresh}
              style={[
                styles.clearButton,
                { borderWidth: 1, borderColor: "#ccc" },
              ]}
            >
              <Text>Xoá Lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const filterCriteria = {
                  title,
                  depositFrom: depositRange[0],
                  depositTo: depositRange[1],
                  priceFrom: rentPriceRange[0],
                  priceTo: rentPriceRange[1],
                  city: selectedCityName,
                  district: selectedDistrictName,
                  ward: selectedWardName,
                  status: selectedStatus,
                };
                onApplyFilters(filterCriteria);
                onClose();
              }}
              style={[styles.applyButton]}
            >
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: modalWidth,
    height: modalHeight,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    color: "red",
  },
  condition: {
    marginBottom: 15,
  },
  input: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "500",
  },
  track: {
    height: 4,
    backgroundColor: "#d3d3d3",
  },
  selectedTrack: {
    backgroundColor: "#007BFF",
  },
  unselectedTrack: {
    backgroundColor: "#d3d3d3",
  },
  marker: {
    height: 20,
    width: 20,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default SearchPropertyModal;
