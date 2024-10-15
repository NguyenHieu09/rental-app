// // // // import React, { useEffect, useState } from 'react';
// // // // import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// // // // import AddressInput from '../../../components/form/AddressInput';
// // // // import { commonStyles } from '../../../styles/theme';
// // // // import MultiSelect from 'react-native-multiple-select';
// // // // import { Checkbox } from '@ant-design/react-native';
// // // // import { fetchPropertyAttributes, fetchPropertyTypes } from '../../../api/api';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import { IAttribute } from '../../../types/property'; // Import interface IAttribute

// // // // export const interiorOptions = [
// // // //     {
// // // //         label: 'Đầy đủ nội thất',
// // // //         value: 'Đầy đủ nội thất',
// // // //     },
// // // //     {
// // // //         label: 'Nội thất cơ bản',
// // // //         value: 'Nội thất cơ bản',
// // // //     },
// // // //     {
// // // //         label: 'Không nội thất',
// // // //         value: 'Không nội thất',
// // // //     },
// // // // ];

// // // // const AddProperty: React.FC = () => {
// // // //     const [title, setTitle] = useState('');
// // // //     const [description, setDescription] = useState('');
// // // //     const [acreage, setAcreage] = useState('');
// // // //     const [price, setPrice] = useState('');
// // // //     const [interior, setInterior] = useState('');
// // // //     const [bedroom, setBedroom] = useState('');
// // // //     const [bathroom, setBathroom] = useState('');
// // // //     const [landArea, setLandArea] = useState('');
// // // //     const [type, setType] = useState('');
// // // //     const [floor, setFloor] = useState('');
// // // //     const [deposit, setDeposit] = useState('');
// // // //     const [minDuration, setMinDuration] = useState('');
// // // //     const [attributeIds, setAttributeIds] = useState<string[]>([]);
// // // //     const [images, setImages] = useState<string[]>([]);
// // // //     const [street, setStreet] = useState('');
// // // //     const [termsAccepted, setTermsAccepted] = useState(false);

// // // //     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
// // // //     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
// // // //     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

// // // //     const [attributes, setAttributes] = useState<IAttribute[]>([]); // Khởi tạo attributes là một mảng rỗng
// // // //     const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);

// // // //     useEffect(() => {
// // // //         const loadAttributes = async () => {
// // // //             try {
// // // //                 const data = await fetchPropertyAttributes();
// // // //                 setAttributes(data);
// // // //             } catch (error) {
// // // //                 console.error('Error loading attributes:', error);
// // // //             }
// // // //         };

// // // //         const loadPropertyTypes = async () => {
// // // //             try {
// // // //                 const data = await fetchPropertyTypes();
// // // //                 // console.log('Property types:', data);

// // // //                 setPropertyTypes(data);
// // // //             } catch (error) {
// // // //                 console.error('Error loading property types:', error);
// // // //             }
// // // //         };

// // // //         loadAttributes();
// // // //         loadPropertyTypes();
// // // //     }, []);

// // // //     const handleSubmit = () => {
// // // //         console.log({
// // // //             title,
// // // //             description,
// // // //             acreage,
// // // //             price,
// // // //             interior,
// // // //             bedroom,
// // // //             bathroom,
// // // //             landArea,
// // // //             type,
// // // //             floor,
// // // //             deposit,
// // // //             minDuration,
// // // //             attributeIds,
// // // //             images,
// // // //             address: {
// // // //                 city: selectedCity,
// // // //                 district: selectedDistrict,
// // // //                 ward: selectedWard,
// // // //                 street,
// // // //             },
// // // //             termsAccepted,
// // // //         });
// // // //     };

// // // //     return (
// // // //         <View style={commonStyles.container}>
// // // //             <ScrollView>
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Tiêu đề"
// // // //                     value={title}
// // // //                     onChangeText={setTitle}
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Mô tả"
// // // //                     value={description}
// // // //                     onChangeText={setDescription}
// // // //                     multiline
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Diện tích (m2)"
// // // //                     value={acreage}
// // // //                     onChangeText={setAcreage}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Giá"
// // // //                     value={price}
// // // //                     onChangeText={setPrice}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <View style={styles.pickerContainer}>
// // // //                     <Picker
// // // //                         selectedValue={interior}
// // // //                         onValueChange={(itemValue) => setInterior(itemValue)}
// // // //                         style={styles.picker}
// // // //                     >
// // // //                         <Picker.Item label="Chọn nội thất" value={undefined} />
// // // //                         {interiorOptions.map((option) => (
// // // //                             <Picker.Item key={option.value} label={option.label} value={option.value} />
// // // //                         ))}
// // // //                     </Picker>
// // // //                 </View>
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Số phòng ngủ"
// // // //                     value={bedroom}
// // // //                     onChangeText={setBedroom}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Số phòng tắm"
// // // //                     value={bathroom}
// // // //                     onChangeText={setBathroom}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Diện tích quyền sử dụng đất (m2)"
// // // //                     value={landArea}
// // // //                     onChangeText={setLandArea}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <View style={styles.pickerContainer}>
// // // //                     <Picker
// // // //                         selectedValue={type}
// // // //                         onValueChange={(itemValue) => setType(itemValue)}
// // // //                         style={styles.picker}
// // // //                     >
// // // //                         <Picker.Item label="Chọn loại bất động sản" value={undefined} />
// // // //                         {propertyTypes.map((option) => (
// // // //                             <Picker.Item key={option.id} label={option.name} value={option.id} />
// // // //                         ))}
// // // //                     </Picker>
// // // //                 </View>
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Số tầng"
// // // //                     value={floor}
// // // //                     onChangeText={setFloor}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Tiền đặt cọc"
// // // //                     value={deposit}
// // // //                     onChangeText={setDeposit}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <TextInput
// // // //                     style={styles.input}
// // // //                     placeholder="Thời gian thuê tối thiểu"
// // // //                     value={minDuration}
// // // //                     onChangeText={setMinDuration}
// // // //                     keyboardType="numeric"
// // // //                 />
// // // //                 <View style={styles.pickerContainer}>
// // // //                     <Picker
// // // //                         selectedValue={attributeIds}
// // // //                         onValueChange={(itemValue) => setAttributeIds(itemValue)}
// // // //                         style={styles.picker}
// // // //                     >
// // // //                         <Picker.Item label="Chọn tiện ích" value={undefined} />
// // // //                         {Array.isArray(attributes) && attributes.map((attribute) => (
// // // //                             <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
// // // //                         ))}
// // // //                     </Picker>
// // // //                 </View>

// // // //                 <AddressInput
// // // //                     selectedCity={selectedCity}
// // // //                     setSelectedCity={setSelectedCity}
// // // //                     selectedDistrict={selectedDistrict}
// // // //                     setSelectedDistrict={setSelectedDistrict}
// // // //                     selectedWard={selectedWard}
// // // //                     setSelectedWard={setSelectedWard}
// // // //                     street={street}
// // // //                     setStreet={setStreet}
// // // //                 />

// // // //                 <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
// // // //                     <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
// // // //                 </TouchableOpacity>
// // // //                 <View style={styles.termsContainer}>
// // // //                     <Checkbox
// // // //                         checked={termsAccepted}
// // // //                         onChange={(event) => setTermsAccepted(event.target.checked)}
// // // //                         style={styles.checkbox}
// // // //                     />
// // // //                     <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
// // // //                 </View>
// // // //                 <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleSubmit}>
// // // //                     <Text style={[styles.submitButtonText, commonStyles.buttonText]}>GỬI</Text>
// // // //                 </TouchableOpacity>
// // // //             </ScrollView>
// // // //         </View>
// // // //     );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //     container: {
// // // //         // flex: 1,
// // // //         // padding: 20,
// // // //         // backgroundColor: '#fff',
// // // //     },
// // // //     header: {
// // // //         fontSize: 24,
// // // //         fontWeight: 'bold',
// // // //         marginBottom: 10,
// // // //         marginTop: 20,
// // // //     },
// // // //     subHeader: {
// // // //         fontSize: 14,
// // // //         color: '#555',
// // // //         marginBottom: 20,
// // // //     },
// // // //     input: {
// // // //         borderWidth: 1,
// // // //         borderColor: '#ccc',
// // // //         borderRadius: 5,
// // // //         padding: 10,
// // // //         marginBottom: 15,
// // // //     },
// // // //     uploadButton: {
// // // //         borderWidth: 1,
// // // //         borderColor: '#ccc',
// // // //         borderStyle: 'dashed',
// // // //         borderRadius: 5,
// // // //         padding: 20,
// // // //         alignItems: 'center',
// // // //         marginBottom: 15,
// // // //     },
// // // //     uploadButtonText: {
// // // //         color: '#555',
// // // //     },
// // // //     termsContainer: {
// // // //         flexDirection: 'row',
// // // //         alignItems: 'center',
// // // //         marginBottom: 20,
// // // //         flexWrap: 'nowrap',
// // // //     },
// // // //     termsText: {
// // // //         marginLeft: 10,
// // // //         fontSize: 14,
// // // //         flexShrink: 1,
// // // //     },
// // // //     checkbox: {
// // // //         width: 24,
// // // //         height: 24,
// // // //     },
// // // //     submitButton: {
// // // //         backgroundColor: '#28a745',
// // // //         borderRadius: 5,
// // // //         padding: 15,
// // // //         alignItems: 'center',
// // // //     },
// // // //     submitButtonText: {
// // // //         color: '#fff',
// // // //         fontWeight: 'bold',
// // // //     },
// // // //     multiSelect: {
// // // //         marginBottom: 15,
// // // //     },
// // // //     multiSelectDropdown: {
// // // //         padding: 10,
// // // //     },
// // // //     pickerContainer: {
// // // //         borderWidth: 1,
// // // //         borderColor: '#ccc',
// // // //         borderRadius: 5,
// // // //         // padding: 10,
// // // //         marginBottom: 15,
// // // //     },
// // // //     picker: {
// // // //         fontSize: 10,
// // // //     },
// // // // });

// // // // export default AddProperty;

// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// // // import AddressInput from '../../../components/form/AddressInput';
// // // import { commonStyles } from '../../../styles/theme';
// // // import { Picker } from '@react-native-picker/picker';
// // // import { fetchPropertyTypes, fetchPropertyAttributes } from '../../../api/api';
// // // import { IAttribute } from '../../../types/property';
// // // // import { Form, UploadFile, UploadProps } from 'antd';
// // // // import Dragger from 'antd/es/upload/Dragger';
// // // import { InboxOutlined } from '@ant-design/icons';
// // // import { Checkbox, Form } from '@ant-design/react-native';

// // // export const interiorOptions = [
// // //     {
// // //         label: 'Đầy đủ nội thất',
// // //         value: 'Đầy đủ nội thất',
// // //     },
// // //     {
// // //         label: 'Nội thất cơ bản',
// // //         value: 'Nội thất cơ bản',
// // //     },
// // //     {
// // //         label: 'Không nội thất',
// // //         value: 'Không nội thất',
// // //     },
// // // ];

// // // const AddProperty: React.FC = () => {
// // //     const [title, setTitle] = useState('');
// // //     const [description, setDescription] = useState('');
// // //     const [acreage, setAcreage] = useState('');
// // //     const [price, setPrice] = useState('');
// // //     const [interior, setInterior] = useState('');
// // //     const [bedroom, setBedroom] = useState('');
// // //     const [bathroom, setBathroom] = useState('');
// // //     const [landArea, setLandArea] = useState('');
// // //     const [type, setType] = useState('');
// // //     const [floor, setFloor] = useState('');
// // //     const [deposit, setDeposit] = useState('');
// // //     const [minDuration, setMinDuration] = useState('');
// // //     const [attributeIds, setAttributeIds] = useState<string[]>([]);
// // //     const [images, setImages] = useState<UploadFile<any>[]>([]);
// // //     const [street, setStreet] = useState('');
// // //     const [termsAccepted, setTermsAccepted] = useState(false);

// // //     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
// // //     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
// // //     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

// // //     const [attributes, setAttributes] = useState<IAttribute[]>([]);
// // //     const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);
// // //     let debounceTimeout: NodeJS.Timeout | null = null;

// // //     useEffect(() => {
// // //         const loadAttributes = async () => {
// // //             try {
// // //                 const data = await fetchPropertyAttributes();
// // //                 setAttributes(data);
// // //             } catch (error) {
// // //                 console.error('Error loading attributes:', error);
// // //             }
// // //         };

// // //         const loadPropertyTypes = async () => {
// // //             if (debounceTimeout) {
// // //                 clearTimeout(debounceTimeout);
// // //             }
// // //             debounceTimeout = setTimeout(async () => {
// // //                 try {
// // //                     const data = await fetchPropertyTypes();
// // //                     setPropertyTypes(data);
// // //                 } catch (error) {
// // //                     console.error('Error loading property types:', error);
// // //                 }
// // //             }, 300); // 300ms debounce time
// // //         };

// // //         loadAttributes();
// // //         loadPropertyTypes();
// // //     }, []);

// // //     const handleSubmit = async () => {
// // //         const conditions: Array<{
// // //             type: string;
// // //             value: string;
// // //         }> = [];

// // //         if (acreage)
// // //             conditions.push({
// // //                 type: 'Diện tích',
// // //                 value: `${acreage} m2`,
// // //             });
// // //         if (landArea)
// // //             conditions.push({
// // //                 type: 'Diện tích quyền sử dụng đất',
// // //                 value: `${landArea} m2`,
// // //             });
// // //         if (bathroom)
// // //             conditions.push({
// // //                 type: 'Phòng tắm',
// // //                 value: `${bathroom} phòng`,
// // //             });
// // //         if (bedroom)
// // //             conditions.push({
// // //                 type: 'Phòng ngủ',
// // //                 value: `${bedroom} phòng`,
// // //             });
// // //         if (floor)
// // //             conditions.push({
// // //                 type: 'Số tầng',
// // //                 value: `${floor} tầng`,
// // //             });
// // //         if (interior)
// // //             conditions.push({
// // //                 type: 'Nội thất',
// // //                 value: `${interior}`,
// // //             });

// // //         const formData = new FormData();

// // //         const data = {
// // //             title,
// // //             description,
// // //             acreage,
// // //             price,
// // //             interior,
// // //             bedroom,
// // //             bathroom,
// // //             landArea,
// // //             type,
// // //             floor,
// // //             deposit,
// // //             minDuration,
// // //             attributeIds,
// // //             images,
// // //             address: {
// // //                 city: selectedCity,
// // //                 district: selectedDistrict,
// // //                 ward: selectedWard,
// // //                 street,
// // //             },
// // //             termsAccepted,
// // //         };

// // //         Object.entries(data).forEach(([key, value]) => {
// // //             if (key === 'attributeIds' && Array.isArray(value))
// // //                 (value as string[]).forEach((attributeId) => {
// // //                     formData.append('attributeIds[]', attributeId);
// // //                 });
// // //             else if (value) formData.append(key, value as string);
// // //         });

// // //         images.forEach((file) => {
// // //             if (file.originFileObj) formData.append('images', file.originFileObj);
// // //         });

// // //         formData.append('conditions', JSON.stringify(conditions));
// // //         formData.append('type', JSON.stringify(type));

// // //         try {
// // //             console.log('Form data:', formData);

// // //             // await createProperty(formData);
// // //             // Điều hướng đến trang OWNER_PROPERTIES
// // //         } catch (error) {
// // //             console.error(error);
// // //         }
// // //     };

// // //     const uploadProps: UploadProps = {
// // //         name: 'images',
// // //         multiple: true,
// // //         accept: 'image/*',
// // //         listType: 'picture-card',
// // //         showUploadList: {
// // //             showPreviewIcon: false,
// // //         },
// // //         iconRender: () => null,
// // //         onChange: (info) => {
// // //             setImages(info.fileList);
// // //         },
// // //     };

// // //     return (
// // //         <View style={commonStyles.container}>
// // //             <ScrollView>
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Tiêu đề"
// // //                     value={title}
// // //                     onChangeText={setTitle}
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Mô tả"
// // //                     value={description}
// // //                     onChangeText={setDescription}
// // //                     multiline
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Diện tích (m2)"
// // //                     value={acreage}
// // //                     onChangeText={setAcreage}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Giá"
// // //                     value={price}
// // //                     onChangeText={setPrice}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <View style={styles.pickerContainer}>
// // //                     <Picker
// // //                         selectedValue={interior}
// // //                         onValueChange={(itemValue) => setInterior(itemValue)}
// // //                         style={styles.picker}
// // //                     >
// // //                         <Picker.Item label="Chọn nội thất" value={undefined} />
// // //                         {interiorOptions.map((option) => (
// // //                             <Picker.Item key={option.value} label={option.label} value={option.value} />
// // //                         ))}
// // //                     </Picker>
// // //                 </View>
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Số phòng ngủ"
// // //                     value={bedroom}
// // //                     onChangeText={setBedroom}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Số phòng tắm"
// // //                     value={bathroom}
// // //                     onChangeText={setBathroom}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Diện tích quyền sử dụng đất (m2)"
// // //                     value={landArea}
// // //                     onChangeText={setLandArea}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <View style={styles.pickerContainer}>
// // //                     <Picker
// // //                         selectedValue={type}
// // //                         onValueChange={(itemValue) => setType(itemValue)}
// // //                         style={styles.picker}
// // //                     >
// // //                         <Picker.Item label="Chọn loại bất động sản" value={undefined} />
// // //                         {propertyTypes.map((option) => (
// // //                             <Picker.Item key={option.id} label={option.name} value={option.id} />
// // //                         ))}
// // //                     </Picker>
// // //                 </View>
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Số tầng"
// // //                     value={floor}
// // //                     onChangeText={setFloor}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Tiền đặt cọc"
// // //                     value={deposit}
// // //                     onChangeText={setDeposit}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="Thời gian thuê tối thiểu"
// // //                     value={minDuration}
// // //                     onChangeText={setMinDuration}
// // //                     keyboardType="numeric"
// // //                 />
// // //                 <View style={styles.pickerContainer}>
// // //                     <Picker
// // //                         selectedValue={attributeIds}
// // //                         onValueChange={(itemValue) => setAttributeIds(itemValue)}
// // //                         style={styles.picker}
// // //                     >
// // //                         <Picker.Item label="Chọn tiện ích" value={undefined} />
// // //                         {attributes.map((attribute) => (
// // //                             <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
// // //                         ))}
// // //                     </Picker>
// // //                 </View>

// // //                 <AddressInput
// // //                     selectedCity={selectedCity}
// // //                     setSelectedCity={setSelectedCity}
// // //                     selectedDistrict={selectedDistrict}
// // //                     setSelectedDistrict={setSelectedDistrict}
// // //                     selectedWard={selectedWard}
// // //                     setSelectedWard={setSelectedWard}
// // //                     street={street}
// // //                     setStreet={setStreet}
// // //                 />

// // //                 <Form.Item
// // //                     name="images"
// // //                     rules={[
// // //                         {
// // //                             required: true,
// // //                             message: 'Vui lòng tải lên ít nhất một hình ảnh hoặc video',
// // //                         },
// // //                     ]}
// // //                 >
// // //                     <Dragger {...uploadProps}>
// // //                         <p className="ant-upload-drag-icon">
// // //                             <InboxOutlined />
// // //                         </p>
// // //                         <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
// // //                         <p className="ant-upload-hint">
// // //                             Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm
// // //                             khác.
// // //                         </p>
// // //                     </Dragger>
// // //                 </Form.Item>

// // //                 <View style={styles.termsContainer}>
// // //                     <Checkbox
// // //                         checked={termsAccepted}
// // //                         onChange={(event) => setTermsAccepted(event.target.checked)}
// // //                         style={styles.checkbox}
// // //                     />
// // //                     <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
// // //                 </View>
// // //                 <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleSubmit}>
// // //                     <Text style={[styles.submitButtonText, commonStyles.buttonText]}>GỬI</Text>
// // //                 </TouchableOpacity>
// // //             </ScrollView>
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         // flex: 1,
// // //         // padding: 20,
// // //         // backgroundColor: '#fff',
// // //     },
// // //     header: {
// // //         fontSize: 24,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10,
// // //         marginTop: 20,
// // //     },
// // //     subHeader: {
// // //         fontSize: 14,
// // //         color: '#555',
// // //         marginBottom: 20,
// // //     },
// // //     input: {
// // //         borderWidth: 1,
// // //         borderColor: '#ccc',
// // //         borderRadius: 5,
// // //         padding: 10,
// // //         marginBottom: 15,
// // //     },
// // //     uploadButton: {
// // //         borderWidth: 1,
// // //         borderColor: '#ccc',
// // //         borderStyle: 'dashed',
// // //         borderRadius: 5,
// // //         padding: 20,
// // //         alignItems: 'center',
// // //         marginBottom: 15,
// // //     },
// // //     uploadButtonText: {
// // //         color: '#555',
// // //     },
// // //     termsContainer: {
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         marginBottom: 20,
// // //         flexWrap: 'nowrap',
// // //     },
// // //     termsText: {
// // //         marginLeft: 10,
// // //         fontSize: 14,
// // //         flexShrink: 1,
// // //     },
// // //     checkbox: {
// // //         width: 24,
// // //         height: 24,
// // //     },
// // //     submitButton: {
// // //         backgroundColor: '#28a745',
// // //         borderRadius: 5,
// // //         padding: 15,
// // //         alignItems: 'center',
// // //     },
// // //     submitButtonText: {
// // //         color: '#fff',
// // //         fontWeight: 'bold',
// // //     },
// // //     multiSelect: {
// // //         marginBottom: 15,
// // //     },
// // //     multiSelectDropdown: {
// // //         padding: 10,
// // //     },
// // //     pickerContainer: {
// // //         borderWidth: 1,
// // //         borderColor: '#ccc',
// // //         borderRadius: 5,
// // //         marginBottom: 15,
// // //     },
// // //     picker: {
// // //         fontSize: 10,
// // //     },
// // // });

// // // export default AddProperty;

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// // import AddressInput from '../../../components/form/AddressInput';
// // import { commonStyles } from '../../../styles/theme';
// // import { Picker } from '@react-native-picker/picker';
// // import { fetchPropertyTypes, fetchPropertyAttributes } from '../../../api/api';
// // import { IAttribute } from '../../../types/property';
// // import { Checkbox, Form } from '@ant-design/react-native';
// // import { UploadFile, UploadProps } from 'antd';

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

// // const AddProperty: React.FC = () => {
// //     const [title, setTitle] = useState('');
// //     const [description, setDescription] = useState('');
// //     const [acreage, setAcreage] = useState('');
// //     const [price, setPrice] = useState('');
// //     const [interior, setInterior] = useState('');
// //     const [bedroom, setBedroom] = useState('');
// //     const [bathroom, setBathroom] = useState('');
// //     const [landArea, setLandArea] = useState('');
// //     const [type, setType] = useState('');
// //     const [floor, setFloor] = useState('');
// //     const [deposit, setDeposit] = useState('');
// //     const [minDuration, setMinDuration] = useState('');
// //     const [attributeIds, setAttributeIds] = useState<string[]>([]);
// //     const [images, setImages] = useState<UploadFile<any>[]>([]);
// //     const [street, setStreet] = useState('');
// //     const [termsAccepted, setTermsAccepted] = useState(false);

// //     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
// //     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
// //     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

// //     const [attributes, setAttributes] = useState<IAttribute[]>([]);
// //     const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);
// //     let debounceTimeout: NodeJS.Timeout | null = null;

// //     useEffect(() => {
// //         const loadAttributes = async () => {
// //             try {
// //                 const data = await fetchPropertyAttributes();
// //                 setAttributes(data);
// //             } catch (error) {
// //                 console.error('Error loading attributes:', error);
// //             }
// //         };

// //         const loadPropertyTypes = async () => {
// //             if (debounceTimeout) {
// //                 clearTimeout(debounceTimeout);
// //             }
// //             debounceTimeout = setTimeout(async () => {
// //                 try {
// //                     const data = await fetchPropertyTypes();
// //                     setPropertyTypes(data);
// //                 } catch (error) {
// //                     console.error('Error loading property types:', error);
// //                 }
// //             }, 300); // 300ms debounce time
// //         };

// //         loadAttributes();
// //         loadPropertyTypes();
// //     }, []);

// //     const handleSubmit = async () => {
// //         const conditions: Array<{
// //             type: string;
// //             value: string;
// //         }> = [];

// //         if (acreage)
// //             conditions.push({
// //                 type: 'Diện tích',
// //                 value: `${acreage} m2`,
// //             });
// //         if (landArea)
// //             conditions.push({
// //                 type: 'Diện tích quyền sử dụng đất',
// //                 value: `${landArea} m2`,
// //             });
// //         if (bathroom)
// //             conditions.push({
// //                 type: 'Phòng tắm',
// //                 value: `${bathroom} phòng`,
// //             });
// //         if (bedroom)
// //             conditions.push({
// //                 type: 'Phòng ngủ',
// //                 value: `${bedroom} phòng`,
// //             });
// //         if (floor)
// //             conditions.push({
// //                 type: 'Số tầng',
// //                 value: `${floor} tầng`,
// //             });
// //         if (interior)
// //             conditions.push({
// //                 type: 'Nội thất',
// //                 value: `${interior}`,
// //             });

// //         const formData = new FormData();

// //         const data = {
// //             title,
// //             description,
// //             acreage,
// //             price,
// //             interior,
// //             bedroom,
// //             bathroom,
// //             landArea,
// //             type,
// //             floor,
// //             deposit,
// //             minDuration,
// //             attributeIds,
// //             images,
// //             address: {
// //                 city: selectedCity,
// //                 district: selectedDistrict,
// //                 ward: selectedWard,
// //                 street,
// //             },
// //             termsAccepted,
// //         };

// //         Object.entries(data).forEach(([key, value]) => {
// //             if (key === 'attributeIds' && Array.isArray(value))
// //                 (value as string[]).forEach((attributeId) => {
// //                     formData.append('attributeIds[]', attributeId);
// //                 });
// //             else if (value) formData.append(key, value as string);
// //         });

// //         images.forEach((file) => {
// //             if (file.originFileObj) formData.append('images', file.originFileObj);
// //         });

// //         formData.append('conditions', JSON.stringify(conditions));
// //         formData.append('type', JSON.stringify(type));

// //         try {
// //             console.log('Form data:', formData);

// //             // await createProperty(formData);
// //             // Điều hướng đến trang OWNER_PROPERTIES
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     const uploadProps: UploadProps = {
// //         name: 'images',
// //         multiple: true,
// //         accept: 'image/*',
// //         onChange(info) {
// //             const { fileList } = info;
// //             setImages(fileList);
// //         },
// //     };

// //     return (
// //         <View style={commonStyles.container}>
// //             <ScrollView>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Tiêu đề"
// //                     value={title}
// //                     onChangeText={setTitle}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Mô tả"
// //                     value={description}
// //                     onChangeText={setDescription}
// //                     multiline
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Diện tích (m2)"
// //                     value={acreage}
// //                     onChangeText={setAcreage}
// //                     keyboardType="numeric"
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Giá"
// //                     value={price}
// //                     onChangeText={setPrice}
// //                     keyboardType="numeric"
// //                 />
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={interior}
// //                         onValueChange={(itemValue) => setInterior(itemValue)}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item label="Chọn nội thất" value={undefined} />
// //                         {interiorOptions.map((option) => (
// //                             <Picker.Item key={option.value} label={option.label} value={option.value} />
// //                         ))}
// //                     </Picker>
// //                 </View>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Số phòng ngủ"
// //                     value={bedroom}
// //                     onChangeText={setBedroom}
// //                     keyboardType="numeric"
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Số phòng tắm"
// //                     value={bathroom}
// //                     onChangeText={setBathroom}
// //                     keyboardType="numeric"
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Diện tích quyền sử dụng đất (m2)"
// //                     value={landArea}
// //                     onChangeText={setLandArea}
// //                     keyboardType="numeric"
// //                 />
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={type}
// //                         onValueChange={(itemValue) => setType(itemValue)}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item label="Chọn loại bất động sản" value={undefined} />
// //                         {propertyTypes.map((option) => (
// //                             <Picker.Item key={option.id} label={option.name} value={option.id} />
// //                         ))}
// //                     </Picker>
// //                 </View>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Số tầng"
// //                     value={floor}
// //                     onChangeText={setFloor}
// //                     keyboardType="numeric"
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Tiền đặt cọc"
// //                     value={deposit}
// //                     onChangeText={setDeposit}
// //                     keyboardType="numeric"
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Thời gian thuê tối thiểu"
// //                     value={minDuration}
// //                     onChangeText={setMinDuration}
// //                     keyboardType="numeric"
// //                 />
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={attributeIds}
// //                         onValueChange={(itemValue) => setAttributeIds(itemValue)}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item label="Chọn tiện ích" value={undefined} />
// //                         {Array.isArray(attributes) && attributes.map((attribute) => (
// //                             <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
// //                         ))}
// //                     </Picker>
// //                 </View>

// //                 <AddressInput
// //                     selectedCity={selectedCity}
// //                     setSelectedCity={setSelectedCity}
// //                     selectedDistrict={selectedDistrict}
// //                     setSelectedDistrict={setSelectedDistrict}
// //                     selectedWard={selectedWard}
// //                     setSelectedWard={setSelectedWard}
// //                     street={street}
// //                     setStreet={setStreet}
// //                 />

// //                 <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
// //                     <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
// //                 </TouchableOpacity>
// //                 <View style={styles.termsContainer}>
// //                     <Checkbox
// //                         checked={termsAccepted}
// //                         onChange={(event) => setTermsAccepted(event.target.checked)}
// //                         style={styles.checkbox}
// //                     />
// //                     <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
// //                 </View>
// //                 <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleSubmit}>
// //                     <Text style={[styles.submitButtonText, commonStyles.buttonText]}>GỬI</Text>
// //                 </TouchableOpacity>
// //             </ScrollView>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         // flex: 1,
// //         // padding: 20,
// //         // backgroundColor: '#fff',
// //     },
// //     header: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //         marginTop: 20,
// //     },
// //     subHeader: {
// //         fontSize: 14,
// //         color: '#555',
// //         marginBottom: 20,
// //     },
// //     input: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         padding: 10,
// //         marginBottom: 15,
// //     },
// //     uploadButton: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderStyle: 'dashed',
// //         borderRadius: 5,
// //         padding: 20,
// //         alignItems: 'center',
// //         marginBottom: 15,
// //     },
// //     uploadButtonText: {
// //         color: '#555',
// //     },
// //     termsContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         marginBottom: 20,
// //         flexWrap: 'nowrap',
// //     },
// //     termsText: {
// //         marginLeft: 10,
// //         fontSize: 14,
// //         flexShrink: 1,
// //     },
// //     checkbox: {
// //         width: 24,
// //         height: 24,
// //     },
// //     submitButton: {
// //         backgroundColor: '#28a745',
// //         borderRadius: 5,
// //         padding: 15,
// //         alignItems: 'center',
// //     },
// //     submitButtonText: {
// //         color: '#fff',
// //         fontWeight: 'bold',
// //     },
// //     multiSelect: {
// //         marginBottom: 15,
// //     },
// //     multiSelectDropdown: {
// //         padding: 10,
// //     },
// //     pickerContainer: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         marginBottom: 15,
// //     },
// //     picker: {
// //         fontSize: 10,
// //     },
// // });

// // export default AddProperty;

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import AddressInput from '../../../components/form/AddressInput';
// import { commonStyles } from '../../../styles/theme';
// import { Picker } from '@react-native-picker/picker';
// import { fetchPropertyTypes, fetchPropertyAttributes } from '../../../api/api';
// import { IAttribute } from '../../../types/property';
// import * as ImagePicker from 'expo-image-picker';
// import { Checkbox } from '@ant-design/react-native';

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

// const AddProperty: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [acreage, setAcreage] = useState('');
//     const [price, setPrice] = useState('');
//     const [interior, setInterior] = useState('');
//     const [bedroom, setBedroom] = useState('');
//     const [bathroom, setBathroom] = useState('');
//     const [landArea, setLandArea] = useState('');
//     const [type, setType] = useState('');
//     const [floor, setFloor] = useState('');
//     const [deposit, setDeposit] = useState('');
//     const [minDuration, setMinDuration] = useState('');
//     const [attributeIds, setAttributeIds] = useState<string[]>([]);
//     const [images, setImages] = useState<any[]>([]);
//     const [street, setStreet] = useState('');
//     const [termsAccepted, setTermsAccepted] = useState(false);

//     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
//     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
//     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

//     const [attributes, setAttributes] = useState<IAttribute[]>([]);
//     const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);
//     let debounceTimeout: NodeJS.Timeout | null = null;

//     useEffect(() => {
//         const loadAttributes = async () => {
//             try {
//                 const data = await fetchPropertyAttributes();
//                 setAttributes(data);
//             } catch (error) {
//                 console.error('Error loading attributes:', error);
//             }
//         };

//         const loadPropertyTypes = async () => {
//             if (debounceTimeout) {
//                 clearTimeout(debounceTimeout);
//             }
//             debounceTimeout = setTimeout(async () => {
//                 try {
//                     const data = await fetchPropertyTypes();
//                     setPropertyTypes(data);
//                 } catch (error) {
//                     console.error('Error loading property types:', error);
//                 }
//             }, 300); // 300ms debounce time
//         };

//         loadAttributes();
//         loadPropertyTypes();
//     }, []);

//     const handleImageUpload = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Sorry, we need camera roll permissions to make this work!');
//             return;
//         }

//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsMultipleSelection: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImages(result.assets);
//         }
//     };

//     const handleSubmit = async () => {
//         const conditions: Array<{
//             type: string;
//             value: string;
//         }> = [];

//         if (acreage)
//             conditions.push({
//                 type: 'Diện tích',
//                 value: `${acreage} m2`,
//             });
//         if (landArea)
//             conditions.push({
//                 type: 'Diện tích quyền sử dụng đất',
//                 value: `${landArea} m2`,
//             });
//         if (bathroom)
//             conditions.push({
//                 type: 'Phòng tắm',
//                 value: `${bathroom} phòng`,
//             });
//         if (bedroom)
//             conditions.push({
//                 type: 'Phòng ngủ',
//                 value: `${bedroom} phòng`,
//             });
//         if (floor)
//             conditions.push({
//                 type: 'Số tầng',
//                 value: `${floor} tầng`,
//             });
//         if (interior)
//             conditions.push({
//                 type: 'Nội thất',
//                 value: `${interior}`,
//             });

//         const formData = new FormData();

//         const data = {
//             title,
//             description,
//             acreage,
//             price,
//             interior,
//             bedroom,
//             bathroom,
//             landArea,
//             type,
//             floor,
//             deposit,
//             minDuration,
//             attributeIds,
//             images,
//             address: {
//                 city: selectedCity,
//                 district: selectedDistrict,
//                 ward: selectedWard,
//                 street,
//             },
//             termsAccepted,
//         };

//         Object.entries(data).forEach(([key, value]) => {
//             if (key === 'attributeIds' && Array.isArray(value))
//                 (value as string[]).forEach((attributeId) => {
//                     formData.append('attributeIds[]', attributeId);
//                 });
//             else if (value) formData.append(key, value as string);
//         });

//         for (const file of images) {
//             if (file.uri) {
//                 const response = await fetch(file.uri);
//                 const blob = await response.blob();
//                 formData.append('images', blob, file.fileName);
//             }
//         }

//         formData.append('conditions', JSON.stringify(conditions));
//         formData.append('type', JSON.stringify(type));

//         try {
//             console.log('Form data:', formData);

//             // await createProperty(formData);
//             // Điều hướng đến trang OWNER_PROPERTIES
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <View style={commonStyles.container}>
//             <ScrollView>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Tiêu đề"
//                     value={title}
//                     onChangeText={setTitle}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Mô tả"
//                     value={description}
//                     onChangeText={setDescription}
//                     multiline
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Diện tích (m2)"
//                     value={acreage}
//                     onChangeText={setAcreage}
//                     keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Giá"
//                     value={price}
//                     onChangeText={setPrice}
//                     keyboardType="numeric"
//                 />
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={interior}
//                         onValueChange={(itemValue) => setInterior(itemValue)}
//                         style={styles.picker}
//                     >
//                         <Picker.Item label="Chọn nội thất" value={undefined} />
//                         {interiorOptions.map((option) => (
//                             <Picker.Item key={option.value} label={option.label} value={option.value} />
//                         ))}
//                     </Picker>
//                 </View>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Số phòng ngủ"
//                     value={bedroom}
//                     onChangeText={setBedroom}
//                     keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Số phòng tắm"
//                     value={bathroom}
//                     onChangeText={setBathroom}
//                     keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Diện tích quyền sử dụng đất (m2)"
//                     value={landArea}
//                     onChangeText={setLandArea}
//                     keyboardType="numeric"
//                 />
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={type}
//                         onValueChange={(itemValue) => setType(itemValue)}
//                         style={styles.picker}
//                     >
//                         <Picker.Item label="Chọn loại bất động sản" value={undefined} />
//                         {propertyTypes.map((option) => (
//                             <Picker.Item key={option.id} label={option.name} value={option.id} />
//                         ))}
//                     </Picker>
//                 </View>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Số tầng"
//                     value={floor}
//                     onChangeText={setFloor}
//                     keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Tiền đặt cọc"
//                     value={deposit}
//                     onChangeText={setDeposit}
//                     keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Thời gian thuê tối thiểu"
//                     value={minDuration}
//                     onChangeText={setMinDuration}
//                     keyboardType="numeric"
//                 />
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={attributeIds}
//                         onValueChange={(itemValue) => setAttributeIds(itemValue)}
//                         style={styles.picker}
//                     >
//                         <Picker.Item label="Chọn tiện ích" value={undefined} />
//                         {Array.isArray(attributes) && attributes.map((attribute) => (
//                             <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
//                         ))}
//                     </Picker>
//                 </View>

//                 <AddressInput
//                     selectedCity={selectedCity}
//                     setSelectedCity={setSelectedCity}
//                     selectedDistrict={selectedDistrict}
//                     setSelectedDistrict={setSelectedDistrict}
//                     selectedWard={selectedWard}
//                     setSelectedWard={setSelectedWard}
//                     street={street}
//                     setStreet={setStreet}
//                 />

//                 <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
//                     <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
//                 </TouchableOpacity>
//                 <View style={styles.termsContainer}>
//                     <Checkbox
//                         checked={termsAccepted}
//                         onChange={(event) => setTermsAccepted(event.target.checked)}
//                         style={styles.checkbox}
//                     />
//                     <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
//                 </View>
//                 <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleSubmit}>
//                     <Text style={[styles.submitButtonText, commonStyles.buttonText]}>GỬI</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         // padding: 20,
//         // backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         marginTop: 20,
//     },
//     subHeader: {
//         fontSize: 14,
//         color: '#555',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//     },
//     uploadButton: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderStyle: 'dashed',
//         borderRadius: 5,
//         padding: 20,
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     uploadButtonText: {
//         color: '#555',
//     },
//     termsContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//         flexWrap: 'nowrap',
//     },
//     termsText: {
//         marginLeft: 10,
//         fontSize: 14,
//         flexShrink: 1,
//     },
//     checkbox: {
//         width: 24,
//         height: 24,
//     },
//     submitButton: {
//         backgroundColor: '#28a745',
//         borderRadius: 5,
//         padding: 15,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     multiSelect: {
//         marginBottom: 15,
//     },
//     multiSelectDropdown: {
//         padding: 10,
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     picker: {
//         fontSize: 10,
//     },
// });

// export default AddProperty;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AddressInput from '../../../components/form/AddressInput';
import { commonStyles } from '../../../styles/theme';
import { Picker } from '@react-native-picker/picker';
import { fetchPropertyTypes, fetchPropertyAttributes, createProperty } from '../../../api/api';
import { IAttribute } from '../../../types/property';
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from '@ant-design/react-native';


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

const AddProperty: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [acreage, setAcreage] = useState('');
    const [price, setPrice] = useState('');
    const [interior, setInterior] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [landArea, setLandArea] = useState('');
    const [type, setType] = useState('');
    const [floor, setFloor] = useState('');
    const [deposit, setDeposit] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [attributeIds, setAttributeIds] = useState<string[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [street, setStreet] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);
    let debounceTimeout: NodeJS.Timeout | null = null;

    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const data = await fetchPropertyAttributes();
                setAttributes(data);
            } catch (error) {
                console.error('Error loading attributes:', error);
            }
        };

        const loadPropertyTypes = async () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(async () => {
                try {
                    const data = await fetchPropertyTypes();
                    setPropertyTypes(data);
                } catch (error) {
                    console.error('Error loading property types:', error);
                }
            }, 300); // 300ms debounce time
        };

        loadAttributes();
        loadPropertyTypes();
    }, []);

    const handleImageUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, ...result.assets]);
        }
    };

    const handleSubmit = async () => {
        const conditions: Array<{
            type: string;
            value: string;
        }> = [];

        if (acreage)
            conditions.push({
                type: 'Diện tích',
                value: `${acreage} m2`,
            });
        if (landArea)
            conditions.push({
                type: 'Diện tích quyền sử dụng đất',
                value: `${landArea} m2`,
            });
        if (bathroom)
            conditions.push({
                type: 'Phòng tắm',
                value: `${bathroom} phòng`,
            });
        if (bedroom)
            conditions.push({
                type: 'Phòng ngủ',
                value: `${bedroom} phòng`,
            });
        if (floor)
            conditions.push({
                type: 'Số tầng',
                value: `${floor} tầng`,
            });
        if (interior)
            conditions.push({
                type: 'Nội thất',
                value: `${interior}`,
            });

        const formData = new FormData();

        const data = {
            title,
            description,
            acreage,
            price,
            interior,
            bedroom,
            bathroom,
            landArea,
            type: JSON.stringify({ id: type, name: propertyTypes.find(pt => pt.id === type)?.name }),
            floor,
            deposit,
            minDuration,
            attributeIds,
            address: {
                city: selectedCity,
                district: selectedDistrict,
                ward: selectedWard,
                street,
            },
            termsAccepted,
        };

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'attributeIds' && Array.isArray(value))
                (value as string[]).forEach((attributeId) => {
                    formData.append('attributeIds[]', attributeId);
                });
            else if (value) formData.append(key, value as string);
        });

        for (const file of images) {
            if (file.uri) {
                const response = await fetch(file.uri);
                const blob = await response.blob();
                formData.append('images', blob, file.fileName);
            }
        }

        formData.append('conditions', JSON.stringify(conditions));

        try {
            console.log('Form data:', formData);
            const res = await createProperty(formData);

        } catch (error) {
            console.error('Error submitting property:', error);
        }
    };



    return (
        <View style={commonStyles.container}>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder="Tiêu đề"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mô tả"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="Diện tích (m2)"
                    value={acreage}
                    onChangeText={setAcreage}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Giá"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={interior}
                        onValueChange={(itemValue) => setInterior(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Chọn nội thất" value={undefined} />
                        {interiorOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Số phòng ngủ"
                    value={bedroom}
                    onChangeText={setBedroom}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số phòng tắm"
                    value={bathroom}
                    onChangeText={setBathroom}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Diện tích quyền sử dụng đất (m2)"
                    value={landArea}
                    onChangeText={setLandArea}
                    keyboardType="numeric"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Chọn loại bất động sản" value={undefined} />
                        {propertyTypes.map((option) => (
                            <Picker.Item key={option.id} label={option.name} value={option.id} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Số tầng"
                    value={floor}
                    onChangeText={setFloor}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tiền đặt cọc"
                    value={deposit}
                    onChangeText={setDeposit}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Thời gian thuê tối thiểu"
                    value={minDuration}
                    onChangeText={setMinDuration}
                    keyboardType="numeric"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={attributeIds}
                        onValueChange={(itemValue) => setAttributeIds(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Chọn tiện ích" value={undefined} />
                        {Array.isArray(attributes) && attributes.map((attribute) => (
                            <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
                        ))}
                    </Picker>
                </View>

                <AddressInput
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedWard={selectedWard}
                    setSelectedWard={setSelectedWard}
                    street={street}
                    setStreet={setStreet}
                />

                <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                    <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
                </TouchableOpacity>

                <ScrollView horizontal>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image.uri }}
                            style={styles.image}
                        />
                    ))}
                </ScrollView>

                <View style={styles.termsContainer}>
                    <Checkbox
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
                </View>
                <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleSubmit}>
                    <Text style={[styles.submitButtonText, commonStyles.buttonText]}>GỬI</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        // backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    subHeader: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadButtonText: {
        color: '#555',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'nowrap',
    },
    termsText: {
        marginLeft: 10,
        fontSize: 14,
        flexShrink: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
    },
    submitButton: {
        backgroundColor: '#28a745',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    multiSelect: {
        marginBottom: 15,
    },
    multiSelectDropdown: {
        padding: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        fontSize: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});

export default AddProperty;

// import { useState } from 'react';
// import { Button, Image, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const AddProperty: React.FC = () => {
//     const [image, setImage] = useState<string | null>(null);

//     const pickImage = async () => {
//         // No permissions request is necessary for launching the image library
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         console.log(result);

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Button title="Pick an image from camera roll" onPress={pickImage} />
//             {image && <Image source={{ uri: image }} style={styles.image} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 200,
//         height: 200,
//     },
// });


// export default AddProperty;