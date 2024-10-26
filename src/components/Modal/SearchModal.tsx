// import React, { useEffect, useState } from 'react';
// import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable, StyleSheet, Dimensions, TextInput } from 'react-native';
// import AddressInput from '../form/AddressInput';
// import { IconOutline } from '@ant-design/icons-react-native';
// import { RadioButton } from 'react-native-paper';
// import { IAttribute } from '../../types/property';
// import { fetchPropertyAttributes } from '../../api/api';
// import { Picker } from '@react-native-picker/picker';
// import Slider from '@react-native-community/slider';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';

// export const interiorOptions = [
//     {
//         label: 'Đầy đủ nội thất',
//         value: 'Đầy đủ nội thất',
//     },
//     {
//         label: 'Nội thất cơ bản',
//         value: 'Nội thất cơ bản',
//     },
//     {
//         label: 'Không nội thất',
//         value: 'Không nội thất',
//     },
// ];

// interface SearchModalProps {
//     visible: boolean;
//     onClose: () => void;
//     onApplyFilters: (filters: any) => void;
// }

// const { width, height } = Dimensions.get('window');
// const modalWidth = width;
// const modalHeight = height * 0.8;

// const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onApplyFilters }) => {
//     const locations = ['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'];

//     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
//     const [selectedCityName, setSelectedCityName] = useState<string | undefined>(undefined);
//     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
//     const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>(undefined);
//     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);
//     const [selectedWardName, setSelectedWardName] = useState<string | undefined>(undefined);

//     const [street, setStreet] = useState<string>('');

//     const [attributes, setAttributes] = useState<IAttribute[]>([]);
//     const [selectedAttributes, setSelectedAttributes] = useState<IAttribute[]>([]);
//     const [interior, setInterior] = useState('');
//     const [numberOfBedrooms, setNumberOfBedrooms] = useState<number | undefined>(undefined);
//     const [numberOfBathrooms, setNumberOfBathrooms] = useState<number | undefined>(undefined);
//     const [priceRange, setPriceRange] = useState([0, 1000000000]);


//     useEffect(() => {
//         const loadAttributes = async () => {
//             try {
//                 const data = await fetchPropertyAttributes();
//                 setAttributes(data);
//             } catch (error) {
//                 console.error('Error loading attributes:', error);
//             }
//         };

//         loadAttributes();
//     }, []);

//     const handleAttributeChange = (value: string) => {
//         setSelectedAttributes(prev => {
//             if (prev.includes(value)) {
//                 return prev.filter(attr => attr !== value);
//             } else {
//                 return [...prev, value];
//             }
//         });
//     };

//     const handleRefresh = () => {
//         setSelectedCity(undefined);
//         setSelectedCityName(undefined);
//         setSelectedDistrict(undefined);
//         setSelectedDistrictName(undefined);
//         setSelectedWard(undefined);
//         setSelectedWardName(undefined);
//         setStreet('');
//         setPriceRange([0, 1000000000]);
//         setSelectedAttributes([]);
//         setNumberOfBedrooms(undefined);
//         setNumberOfBathrooms(undefined);
//         setInterior('');
//     };

//     return (
//         <Modal
//             animationType="fade"
//             transparent={true}
//             visible={visible}
//             onRequestClose={onClose}
//             style={styles.bottomModal}
//         >
//             <View style={styles.centeredView}>
//                 <View style={styles.modalView}>

//                     <View style={styles.modalHeader}>
//                         <Text style={styles.modalTitle}>Bộ lọc</Text>
//                         <Pressable onPress={onClose}>
//                             <IconOutline name="close" size={24} color="red" />
//                         </Pressable>
//                     </View>

//                     <ScrollView>
//                         <View style={styles.condition}>
//                             <Text style={styles.title}>Tìm Theo khu vực</Text>
//                             <View style={styles.locationOptionsContainer}>
//                                 <Text style={{ padding: 8, fontSize: 16, fontWeight: '500' }}>Phổ biến:</Text>
//                                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                                     {locations.map((location, index) => (
//                                         <TouchableOpacity key={index} style={styles.optionButton}>
//                                             <Text style={styles.sectionTitle}>{location}</Text>
//                                         </TouchableOpacity>
//                                     ))}
//                                 </ScrollView>
//                             </View>

//                             <AddressInput
//                                 selectedCity={selectedCity}
//                                 setSelectedCity={(value, name) => {
//                                     setSelectedCity(value);
//                                     setSelectedCityName(name);
//                                 }}
//                                 selectedDistrict={selectedDistrict}
//                                 setSelectedDistrict={(value, name) => {
//                                     setSelectedDistrict(value);
//                                     setSelectedDistrictName(name);
//                                 }}
//                                 selectedWard={selectedWard}
//                                 setSelectedWard={(value, name) => {
//                                     setSelectedWard(value);
//                                     setSelectedWardName(name);
//                                 }}
//                                 street={street}
//                                 setStreet={setStreet}
//                                 showStreetInput={false}
//                             />
//                         </View>


//                         <View style={styles.condition}>

//                             <Text style={styles.title}>Giá</Text>
//                             <Text>{`Giá tối thiểu: ${priceRange[0].toLocaleString()} đ`}</Text>
//                             <Text>{`Giá tối đa: ${priceRange[1].toLocaleString()} đ`}</Text>
//                             <View style={{ alignItems: 'center' }}>
//                                 <MultiSlider
//                                     sliderLength={modalWidth - 60}
//                                     values={priceRange}
//                                     onValuesChange={(values) => setPriceRange(values)}
//                                     min={0}
//                                     max={1000000000}
//                                     step={100000}
//                                     allowOverlap={false}
//                                     snapped={true}
//                                     trackStyle={styles.track}
//                                     selectedStyle={styles.selectedTrack}
//                                     unselectedStyle={styles.unselectedTrack}
//                                     markerStyle={styles.marker}

//                                 />
//                             </View>


//                         </View>



//                         <View style={styles.condition}>
//                             <Text style={styles.title}>Nội thất</Text>
//                             <View>
//                                 <Text style={styles.label}>
//                                     Số phòng ngủ
//                                 </Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Nhập số phòng ngủ"
//                                     keyboardType="numeric"
//                                     value={numberOfBedrooms?.toString()}
//                                     onChangeText={(text) => setNumberOfBedrooms(Number(text))}
//                                 />
//                             </View>

//                             <View>
//                                 <Text style={styles.label}>
//                                     Số phòng tắm
//                                 </Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Nhập số phòng tắm"
//                                     keyboardType="numeric"
//                                     value={numberOfBathrooms?.toString()}
//                                     onChangeText={(text) => setNumberOfBathrooms(Number(text))}
//                                 />
//                             </View>

//                             <View style={[styles.input, { padding: -10 }]}>
//                                 <Picker
//                                     selectedValue={interior}
//                                     onValueChange={(itemValue) => setInterior(itemValue)}
//                                 >
//                                     <Picker.Item label="Chọn nội thất" value={undefined} />
//                                     {interiorOptions.map((option) => (
//                                         <Picker.Item key={option.value} label={option.label} value={option.value} />
//                                     ))}
//                                 </Picker>
//                             </View>

//                             <View>
//                                 <Text style={styles.label}>Tiện ích</Text>
//                                 {attributes.map(attribute => (
//                                     <View key={attribute.id} style={styles.radioButton}>
//                                         <RadioButton
//                                             color="#007BFF"
//                                             value={attribute.id}
//                                             status={selectedAttributes.includes(attribute.id) ? 'checked' : 'unchecked'}
//                                             onPress={() => handleAttributeChange(attribute.id)}
//                                         />
//                                         <Text>{attribute.name}</Text>
//                                     </View>
//                                 ))}
//                             </View>
//                         </View>
//                     </ScrollView>

//                     <View style={styles.footer}>
//                         <TouchableOpacity onPress={handleRefresh} style={[styles.clearButton, { borderWidth: 1, borderColor: '#ccc' }]}>
//                             <Text>Xoá Lọc</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => {
//                             const filterCriteria = {
//                                 city: selectedCityName,
//                                 district: selectedDistrictName,
//                                 ward: selectedWardName,
//                                 minPrice: priceRange[0],
//                                 maxPrice: priceRange[1],
//                                 amenities: selectedAttributeNames,
//                                 bedroom: numberOfBedrooms,
//                                 bathroom: numberOfBathrooms,
//                                 furniture: interior,
//                             };
//                             onApplyFilters(filterCriteria);
//                             onClose();
//                         }} style={[styles.applyButton]}>
//                             <Text style={styles.applyButtonText}>Áp dụng</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'flex-end',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     bottomModal: {
//         justifyContent: 'flex-end',
//         margin: 0,
//     },
//     modalView: {
//         width: modalWidth,
//         height: modalHeight,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         position: 'absolute',
//         bottom: 0,
//     },
//     modalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '500',
//         marginBottom: 10,
//         paddingTop: 10
//     },
//     closeButton: {
//         fontSize: 18,
//         color: 'red',
//     },
//     locationOptionsContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     optionButton: {
//         backgroundColor: '#eee',
//         padding: 8,
//         borderRadius: 5,
//         marginHorizontal: 5,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     condition: {
//         marginBottom: 15,
//         borderTopWidth: 1,
//         borderTopColor: '#607D8B',

//     },
//     label: {
//         fontSize: 14,
//         fontWeight: '500',
//     },
//     input: {
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderRadius: 5,
//         borderColor: '#ccc',
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 15,
//         borderTopWidth: 1,
//         borderTopColor: '#ccc',
//     },
//     clearButton: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     applyButton: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         backgroundColor: '#007BFF',
//         borderRadius: 5,
//     },
//     applyButtonText: {
//         color: 'white',
//         fontWeight: '500',
//     },
//     sliderLabel: {
//         fontSize: 14,
//         marginVertical: 10,
//     },
//     slider: {
//         width: '100%',
//         height: 40,
//     },
//     track: {
//         height: 4,
//         backgroundColor: '#d3d3d3',
//     },
//     selectedTrack: {
//         backgroundColor: '#007BFF',
//     },
//     unselectedTrack: {
//         backgroundColor: '#d3d3d3',
//     },
//     marker: {
//         height: 20,
//         width: 20,
//         backgroundColor: '#007BFF',
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#ffffff',
//     },
// });

// export default SearchModal;

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, ScrollView, TouchableOpacity, Pressable, StyleSheet, Dimensions, TextInput } from 'react-native';
// // import AddressInput from '../form/AddressInput';
// // import { IconOutline } from '@ant-design/icons-react-native';
// // import { RadioButton } from 'react-native-paper';
// // import { IAttribute } from '../../types/property';
// // import { fetchPropertyAttributes } from '../../api/api';
// // import { Picker } from '@react-native-picker/picker';
// // import MultiSlider from '@ptomasroos/react-native-multi-slider';
// // import Modal from 'react-native-modal';

// // export const interiorOptions = [
// //     {
// //         label: 'Đầy đủ nội thất',
// //         value: 'Đầy đủ nội thất',
// //     },
// //     {
// //         label: 'Nội thất cơ bản',
// //         value: 'Nội thất cơ bản',
// //     },
// //     {
// //         label: 'Không nội thất',
// //         value: 'Không nội thất',
// //     },
// // ];

// // interface SearchModalProps {
// //     visible: boolean;
// //     onClose: () => void;
// //     onApplyFilters: (filters: any) => void;
// // }

// // const { width, height } = Dimensions.get('window');
// // const modalWidth = width;
// // const modalHeight = height * 0.8;

// // const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onApplyFilters }) => {
// //     const locations = ['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'];

// //     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
// //     const [selectedCityName, setSelectedCityName] = useState<string | undefined>(undefined);
// //     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
// //     const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>(undefined);
// //     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);
// //     const [selectedWardName, setSelectedWardName] = useState<string | undefined>(undefined);
// //     const [street, setStreet] = useState<string>('');

// //     const [attributes, setAttributes] = useState<IAttribute[]>([]);
// //     const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
// //     const [interior, setInterior] = useState('');
// //     const [numberOfBedrooms, setNumberOfBedrooms] = useState<number | undefined>(undefined);
// //     const [numberOfBathrooms, setNumberOfBathrooms] = useState<number | undefined>(undefined);
// //     const [priceRange, setPriceRange] = useState([0, 1000000000]); // Giá mặc định

// //     useEffect(() => {
// //         const loadAttributes = async () => {
// //             try {
// //                 const data = await fetchPropertyAttributes();
// //                 setAttributes(data);
// //             } catch (error) {
// //                 console.error('Error loading attributes:', error);
// //             }
// //         };

// //         loadAttributes();
// //     }, []);

// //     const handleAttributeChange = (value: string) => {
// //         setSelectedAttributes(prev => {
// //             if (prev.includes(value)) {
// //                 return prev.filter(attr => attr !== value);
// //             } else {
// //                 return [...prev, value];
// //             }
// //         });
// //     };

// //     const handleRefresh = () => {
// //         setSelectedCity(undefined);
// //         setSelectedCityName(undefined);
// //         setSelectedDistrict(undefined);
// //         setSelectedDistrictName(undefined);
// //         setSelectedWard(undefined);
// //         setSelectedWardName(undefined);
// //         setStreet('');
// //         setPriceRange([0, 1000000000]);
// //         setSelectedAttributes([]);
// //         setNumberOfBedrooms(undefined);
// //         setNumberOfBathrooms(undefined);
// //         setInterior('');
// //     };

// //     return (
// //         <Modal
// //             isVisible={visible}
// //             onBackdropPress={onClose}
// //             onSwipeComplete={onClose}
// //             swipeDirection="down"
// //             style={styles.bottomModal}
// //         >
// //             <View style={styles.modalView}>

// //                 <View style={styles.modalHeader}>
// //                     <Text style={styles.modalTitle}>Bộ lọc</Text>
// //                     <Pressable onPress={onClose}>
// //                         <IconOutline name="close" size={24} color="red" />
// //                     </Pressable>
// //                 </View>

// //                 <ScrollView>
// //                     <View style={styles.condition}>
// //                         <Text style={styles.title}>Tìm Theo khu vực</Text>
// //                         <View style={styles.locationOptionsContainer}>
// //                             <Text style={{ padding: 8, fontSize: 16, fontWeight: '500' }}>Phổ biến:</Text>
// //                             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //                                 {locations.map((location, index) => (
// //                                     <TouchableOpacity key={index} style={styles.optionButton}>
// //                                         <Text style={styles.sectionTitle}>{location}</Text>
// //                                     </TouchableOpacity>
// //                                 ))}
// //                             </ScrollView>
// //                         </View>

// //                         <AddressInput
// //                             selectedCity={selectedCity}
// //                             setSelectedCity={(value, name) => {
// //                                 setSelectedCity(value);
// //                                 setSelectedCityName(name);
// //                             }}
// //                             selectedDistrict={selectedDistrict}
// //                             setSelectedDistrict={(value, name) => {
// //                                 setSelectedDistrict(value);
// //                                 setSelectedDistrictName(name);
// //                             }}
// //                             selectedWard={selectedWard}
// //                             setSelectedWard={(value, name) => {
// //                                 setSelectedWard(value);
// //                                 setSelectedWardName(name);
// //                             }}
// //                             street={street}
// //                             setStreet={setStreet}
// //                             showStreetInput={false}
// //                         />
// //                     </View>

// //                     <View style={styles.condition}>
// //                         <Text style={styles.title}>Giá</Text>
// //                         <Text>{`Giá tối thiểu: ${priceRange[0].toLocaleString()} đ`}</Text>
// //                         <Text>{`Giá tối đa: ${priceRange[1].toLocaleString()} đ`}</Text>
// //                         <View style={{ alignItems: 'center' }}>
// //                             <MultiSlider
// //                                 sliderLength={modalWidth - 60}
// //                                 values={priceRange}
// //                                 onValuesChange={(values) => setPriceRange(values)}
// //                                 min={0}
// //                                 max={1000000000}
// //                                 step={100000}
// //                                 allowOverlap={false}
// //                                 snapped={true}
// //                                 trackStyle={styles.track}
// //                                 selectedStyle={styles.selectedTrack}
// //                                 unselectedStyle={styles.unselectedTrack}
// //                                 markerStyle={styles.marker}
// //                             />
// //                         </View>
// //                     </View>

// //                     <View style={styles.condition}>
// //                         <Text style={styles.title}>Nội thất</Text>
// //                         <View>
// //                             <Text style={styles.label}>
// //                                 Số phòng ngủ
// //                             </Text>
// //                             <TextInput
// //                                 style={styles.input}
// //                                 placeholder="Nhập số phòng ngủ"
// //                                 keyboardType="numeric"
// //                                 value={numberOfBedrooms?.toString()}
// //                                 onChangeText={(text) => setNumberOfBedrooms(Number(text))}
// //                             />
// //                         </View>

// //                         <View>
// //                             <Text style={styles.label}>
// //                                 Số phòng tắm
// //                             </Text>
// //                             <TextInput
// //                                 style={styles.input}
// //                                 placeholder="Nhập số phòng tắm"
// //                                 keyboardType="numeric"
// //                                 value={numberOfBathrooms?.toString()}
// //                                 onChangeText={(text) => setNumberOfBathrooms(Number(text))}
// //                             />
// //                         </View>

// //                         <View style={[styles.input, { padding: -10 }]}>
// //                             <Picker
// //                                 selectedValue={interior}
// //                                 onValueChange={(itemValue) => setInterior(itemValue)}
// //                             >
// //                                 <Picker.Item label="Chọn nội thất" value={undefined} />
// //                                 {interiorOptions.map((option) => (
// //                                     <Picker.Item key={option.value} label={option.label} value={option.value} />
// //                                 ))}
// //                             </Picker>
// //                         </View>

// //                         <View>
// //                             <Text style={styles.label}>Tiện ích</Text>
// //                             {attributes.map(attribute => (
// //                                 <View key={attribute.id} style={styles.radioButton}>
// //                                     <RadioButton
// //                                         color="#007BFF"
// //                                         value={attribute.id}
// //                                         status={selectedAttributes.includes(attribute.id) ? 'checked' : 'unchecked'}
// //                                         onPress={() => handleAttributeChange(attribute.id)}
// //                                     />
// //                                     <Text>{attribute.name}</Text>
// //                                 </View>
// //                             ))}
// //                         </View>
// //                     </View>
// //                 </ScrollView>

// //                 <View style={styles.footer}>
// //                     <TouchableOpacity onPress={handleRefresh} style={[styles.clearButton, { borderWidth: 1, borderColor: '#ccc' }]}>
// //                         <Text>Xoá Lọc</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity onPress={() => {
// //                         const filterCriteria = {
// //                             city: selectedCityName,
// //                             district: selectedDistrictName,
// //                             ward: selectedWardName,
// //                             minPrice: priceRange[0],
// //                             maxPrice: priceRange[1],
// //                             amenities: selectedAttributes,
// //                             bedroom: numberOfBedrooms,
// //                             bathroom: numberOfBathrooms,
// //                             furniture: interior,
// //                         };
// //                         onApplyFilters(filterCriteria);
// //                         onClose();
// //                     }} style={[styles.applyButton]}>
// //                         <Text style={styles.applyButtonText}>Áp dụng</Text>
// //                     </TouchableOpacity>
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     centeredView: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'flex-end',
// //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     },
// //     modalView: {
// //         width: modalWidth,
// //         height: modalHeight,
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         padding: 20,
// //         position: 'absolute',
// //         bottom: 0,
// //     },
// //     bottomModal: {
// //         justifyContent: 'flex-end',
// //         margin: 0,
// //     },
// //     modalHeader: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginBottom: 20,
// //     },
// //     modalTitle: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //     },
// //     title: {
// //         fontSize: 18,
// //         fontWeight: '500',
// //         marginBottom: 10,
// //     },
// //     closeButton: {
// //         fontSize: 18,
// //         color: 'red',
// //     },
// //     locationOptionsContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //     },
// //     optionButton: {
// //         backgroundColor: '#eee',
// //         padding: 8,
// //         borderRadius: 5,
// //         marginHorizontal: 5,
// //     },
// //     sectionTitle: {
// //         fontSize: 16,
// //         fontWeight: '500',
// //     },
// //     condition: {
// //         marginBottom: 15,
// //     },
// //     label: {
// //         fontSize: 14,
// //         fontWeight: '500',
// //     },
// //     input: {
// //         marginVertical: 10,
// //         padding: 10,
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         borderColor: '#ccc',
// //     },
// //     radioButton: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //     },
// //     footer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         paddingVertical: 15,
// //         borderTopWidth: 1,
// //         borderTopColor: '#ccc',
// //     },
// //     clearButton: {
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 5,
// //     },
// //     applyButton: {
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         backgroundColor: '#007BFF',
// //         borderRadius: 5,
// //     },
// //     applyButtonText: {
// //         color: 'white',
// //         fontWeight: '500',
// //     },
// //     sliderLabel: {
// //         fontSize: 14,
// //         marginVertical: 10,
// //     },
// //     slider: {
// //         width: '100%',
// //         height: 40,
// //     },
// //     track: {
// //         height: 4,
// //         backgroundColor: '#d3d3d3',
// //     },
// //     selectedTrack: {
// //         backgroundColor: '#007BFF',
// //     },
// //     unselectedTrack: {
// //         backgroundColor: '#d3d3d3',
// //     },
// //     marker: {
// //         height: 20,
// //         width: 20,
// //         backgroundColor: '#007BFF',
// //         borderRadius: 10,
// //         borderWidth: 2,
// //         borderColor: '#ffffff',
// //     },
// // });

// // export default SearchModal;


import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable, StyleSheet, Dimensions, TextInput } from 'react-native';
import AddressInput from '../form/AddressInput';
import { IconOutline } from '@ant-design/icons-react-native';
import { RadioButton } from 'react-native-paper';
import { IAttribute } from '../../types/property';
import { fetchPropertyAttributes } from '../../api/api';
import { Picker } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export const interiorOptions = [
    {
        label: 'Đầy đủ nội thất',
        value: 'Đầy đủ nội thất',
    },
    {
        label: 'Nội thất cơ bản',
        value: 'Nội thất cơ bản',
    },
    {
        label: 'Không nội thất',
        value: 'Không nội thất',
    },
];

interface SearchModalProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
}

const { width, height } = Dimensions.get('window');
const modalWidth = width;
const modalHeight = height * 0.8;

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onApplyFilters }) => {
    const locations = ['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'];

    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedCityName, setSelectedCityName] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);
    const [selectedWardName, setSelectedWardName] = useState<string | undefined>(undefined);
    const [street, setStreet] = useState<string>('');

    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [interior, setInterior] = useState('');
    const [numberOfBedrooms, setNumberOfBedrooms] = useState<number | undefined>(undefined);
    const [numberOfBathrooms, setNumberOfBathrooms] = useState<number | undefined>(undefined);
    const [priceRange, setPriceRange] = useState([0, 1000000000]);

    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const data = await fetchPropertyAttributes();
                setAttributes(data);
            } catch (error) {
                console.error('Error loading attributes:', error);
            }
        };

        loadAttributes();
    }, []);

    const handleAttributeChange = (value: string) => {
        setSelectedAttributes(prev => {
            if (prev.includes(value)) {
                return prev.filter(attr => attr !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleRefresh = () => {
        setSelectedCity(undefined);
        setSelectedCityName(undefined);
        setSelectedDistrict(undefined);
        setSelectedDistrictName(undefined);
        setSelectedWard(undefined);
        setSelectedWardName(undefined);
        setStreet('');
        setPriceRange([0, 1000000000]);
        setSelectedAttributes([]);
        setNumberOfBedrooms(undefined);
        setNumberOfBathrooms(undefined);
        setInterior('');
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
                        <Text style={styles.modalTitle}>Bộ lọc</Text>
                        <Pressable onPress={onClose}>
                            <IconOutline name="close" size={24} color="red" />
                        </Pressable>
                    </View>

                    <ScrollView>
                        <View style={styles.condition}>
                            <Text style={styles.title}>Tìm Theo khu vực</Text>
                            <View style={styles.locationOptionsContainer}>
                                <Text style={{ padding: 8, fontSize: 16, fontWeight: '500' }}>Phổ biến:</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {locations.map((location, index) => (
                                        <TouchableOpacity key={index} style={styles.optionButton}>
                                            <Text style={styles.sectionTitle}>{location}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

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

                        <View style={styles.condition}>
                            <Text style={styles.title}>Giá</Text>
                            <Text>{`Giá tối thiểu: ${priceRange[0].toLocaleString()} đ`}</Text>
                            <Text>{`Giá tối đa: ${priceRange[1].toLocaleString()} đ`}</Text>
                            <View style={{ alignItems: 'center' }}>
                                <MultiSlider
                                    sliderLength={modalWidth - 60}
                                    values={priceRange}
                                    onValuesChange={(values) => setPriceRange(values)}
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
                        </View>

                        <View style={styles.condition}>
                            <Text style={styles.title}>Nội thất</Text>
                            <View>
                                <Text style={styles.label}>
                                    Số phòng ngủ
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số phòng ngủ"
                                    keyboardType="numeric"
                                    value={numberOfBedrooms?.toString()}
                                    onChangeText={(text) => setNumberOfBedrooms(Number(text))}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>
                                    Số phòng tắm
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số phòng tắm"
                                    keyboardType="numeric"
                                    value={numberOfBathrooms?.toString()}
                                    onChangeText={(text) => setNumberOfBathrooms(Number(text))}
                                />
                            </View>

                            <View style={[styles.input, { padding: -10 }]}>
                                <Picker
                                    selectedValue={interior}
                                    onValueChange={(itemValue) => setInterior(itemValue)}
                                >
                                    <Picker.Item label="Chọn nội thất" value={undefined} />
                                    {interiorOptions.map((option) => (
                                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                                    ))}
                                </Picker>
                            </View>

                            <View>
                                <Text style={styles.label}>Tiện ích</Text>
                                {attributes.map(attribute => (
                                    <View key={attribute.id} style={styles.radioButton}>
                                        <RadioButton
                                            color="#007BFF"
                                            value={attribute.id}
                                            status={selectedAttributes.includes(attribute.id) ? 'checked' : 'unchecked'}
                                            onPress={() => handleAttributeChange(attribute.id)}
                                        />
                                        <Text>{attribute.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleRefresh} style={[styles.clearButton, { borderWidth: 1, borderColor: '#ccc' }]}>
                            <Text>Xoá Lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const selectedAttributeNames = selectedAttributes.map(attrId => {
                                const attribute = attributes.find(attr => attr.id === attrId);
                                return attribute ? attribute.name : '';
                            });

                            const filterCriteria = {
                                city: selectedCityName,
                                district: selectedDistrictName,
                                ward: selectedWardName,
                                minPrice: priceRange[0],
                                maxPrice: priceRange[1],
                                amenities: selectedAttributeNames,
                                bedroom: numberOfBedrooms,
                                bathroom: numberOfBathrooms,
                                furniture: interior,
                            };
                            onApplyFilters(filterCriteria);
                            onClose();
                        }} style={[styles.applyButton]}>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: modalWidth,
        height: modalHeight,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
    },
    locationOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    condition: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    clearButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    applyButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    sliderLabel: {
        fontSize: 14,
        marginVertical: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    track: {
        height: 4,
        backgroundColor: '#d3d3d3',
    },
    selectedTrack: {
        backgroundColor: '#007BFF',
    },
    unselectedTrack: {
        backgroundColor: '#d3d3d3',
    },
    marker: {
        height: 20,
        width: 20,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
});

export default SearchModal;