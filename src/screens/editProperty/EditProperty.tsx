

// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Checkbox, RadioButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
// import { IAttribute, ICondition, IProperty } from '../../types/property';
// import { RootStackParamList } from '../../types/navigation';
// import { fetchPropertyAttributes, fetchPropertyDetail, fetchPropertyTypes } from '../../api/api';
// import { commonStyles } from '../../styles/theme';
// import AddressInput from '../../components/form/AddressInput';

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

// const EditPropertyScreen: React.FC = () => {
//     const route = useRoute<RouteProp<RootStackParamList, 'EditPropertyScreen'>>();
//     const { slug } = route.params; // ID của bất động sản cần chỉnh sửa
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();


//     const [loading, setLoading] = useState(false);
//     const [propertyDetails, setPropertyDetails] = useState<IProperty | null>(null);

//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [acreage, setAcreage] = useState('');
//     const [price, setPrice] = useState('');
//     const [interior, setInterior] = useState('');
//     const [bedroom, setBedroom] = useState('');
//     const [bathroom, setBathroom] = useState('');
//     const [landArea, setLandArea] = useState('');
//     const [type, setType] = useState<IAttribute>({ id: '', name: '' });
//     const [floor, setFloor] = useState('');
//     const [deposit, setDeposit] = useState('');
//     const [minDuration, setMinDuration] = useState('');
//     const [images, setImages] = useState<{ uri: string; fileName: string }[]>([]);
//     const [street, setStreet] = useState('');

//     const [selectedCity, setSelectedCity] = useState<string | undefined>();
//     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>();
//     const [selectedWard, setSelectedWard] = useState<string | undefined>();
//     const [selectedCityName, setSelectedCityName] = useState<string | undefined>();
//     const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>();
//     const [selectedWardName, setSelectedWardName] = useState<string | undefined>();

//     const [attributes, setAttributes] = useState<IAttribute[]>([]);
//     const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

//     const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);

//     useEffect(() => {
//         const loadPropertyDetails = async () => {
//             try {
//                 const data = await fetchPropertyDetail(slug);
//                 setPropertyDetails(data);

//                 // Khởi tạo giá trị
//                 setTitle(data.title);
//                 setDescription(data.description);
//                 setAcreage(data.rentalConditions.find((condition: ICondition) => condition.type === 'Diện tích')?.value || '');
//                 setPrice(data.price.toString());
//                 setInterior(data.rentalConditions.find((condition: ICondition) => condition.type === 'Nội thất')?.value || '');
//                 setBedroom(data.rentalConditions.find((condition: ICondition) => condition.type === 'Phòng ngủ')?.value || '');
//                 setBathroom(data.rentalConditions.find((condition: ICondition) => condition.type === 'Phòng tắm')?.value || '');
//                 setLandArea(data.rentalConditions.find((condition: ICondition) => condition.type === 'Diện tích quyền sử dụng đất')?.value || '');
//                 setType({ id: data.type.id, name: data.type.name });
//                 setFloor(data.rentalConditions.find((condition: ICondition) => condition.type === 'Số tầng')?.value || '');
//                 setDeposit(data.deposit.toString());
//                 setMinDuration(data.minDuration.toString());
//                 setImages(data.images.map((image: string) => ({ uri: image, fileName: image.split('/').pop() || 'image.jpg' })));
//                 setStreet(data.address.street);
//                 setSelectedCity(data.address.city);
//                 setSelectedDistrict(data.address.district);
//                 setSelectedWard(data.address.ward);
//                 setAttributes(data.attributes);
//                 console.log(data.attributes);

//                 console.log("dữ liệu", data.address.ward);

//                 setSelectedAttributes(data.attributes.map((attr: IAttribute) => attr.id));
//             } catch (error) {
//                 console.error('Error loading property details:', error);
//             }
//         };

//         const loadAttributesAndTypes = async () => {
//             try {
//                 const attributes = await fetchPropertyAttributes();
//                 const propertyTypes = await fetchPropertyTypes();
//                 setAttributes(attributes);
//                 setPropertyTypes(propertyTypes);
//             } catch (error) {
//                 console.error('Error loading attributes and types:', error);
//             }
//         };

//         loadPropertyDetails();
//         loadAttributesAndTypes();
//     }, [slug]);

//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: false,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const selectedImage = result.assets[0];
//             const fileName = selectedImage.fileName || 'default_filename.jpg';
//             setImages((prevImages) => [
//                 ...prevImages,
//                 { uri: selectedImage.uri || '', fileName },
//             ]);
//         }
//     };

//     const removeImage = (index: number) => {
//         setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     };

//     const handleAttributeChange = (value: string) => {
//         setSelectedAttributes((prev) => {
//             if (prev.includes(value)) {
//                 return prev.filter((attr) => attr !== value);
//             } else {
//                 return [...prev, value];
//             }
//         });
//     };

//     const handleUpdate = async () => {
//         if (loading) return;

//         setLoading(true);
//         try {
//             if (!title || !description || !price || !type.id || !interior) {
//                 Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
//                 setLoading(false);
//                 return;
//             }

//             const conditions = [
//                 { type: 'Diện tích', value: `${acreage} m2` },
//                 { type: 'Diện tích quyền sử dụng đất', value: `${landArea} m2` },
//                 { type: 'Phòng ngủ', value: `${bedroom} phòng` },
//                 { type: 'Phòng tắm', value: `${bathroom} phòng` },
//                 { type: 'Số tầng', value: `${floor} tầng` },
//                 { type: 'Nội thất', value: interior },
//             ];

//             const formData = new FormData();
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('price', price);
//             formData.append('deposit', deposit);
//             formData.append('acreage', acreage);
//             formData.append('city', selectedCityName || '');
//             formData.append('district', selectedDistrictName || '');
//             formData.append('ward', selectedWardName || '');
//             formData.append('street', street);
//             formData.append('conditions', JSON.stringify(conditions));
//             formData.append('type', JSON.stringify({ id: type.id, name: type.name }));
//             selectedAttributes.forEach((id) =>
//                 formData.append('attributeIds[]', id),
//             );
//             for (const image of images) {
//                 formData.append('images', {
//                     uri: image.uri,
//                     name: image.fileName,
//                     type: 'image/jpeg',
//                 } as any);
//             }

//             console.log('Form data:', formData);

//             // const response = await updateProperty(slug, formData);
//             // if (response.success) {
//             //     Alert.alert('Thành công', 'Cập nhật thành công.');
//             //     navigation.navigate('ManageProperty');
//             // } else {
//             //     Alert.alert('Lỗi', response.message || 'Có lỗi xảy ra.');
//             // }
//         } catch (error) {
//             console.error('Error updating property:', error);
//             Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // console.log('Selected city:', selectedCity);
//     console.log('Selected district:', selectedDistrict);
//     console.log('Selected ward:', selectedWard);
//     // console.log('Street:', street);

//     return (
//         <View style={commonStyles.container}>
//             <ScrollView>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Tiêu đề'
//                     value={title}
//                     onChangeText={setTitle}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Mô tả'
//                     value={description}
//                     onChangeText={setDescription}
//                     multiline
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Diện tích (m2)'
//                     value={acreage}
//                     onChangeText={setAcreage}
//                     keyboardType='numeric'
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Giá'
//                     value={price}
//                     onChangeText={setPrice}
//                     keyboardType='numeric'
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Tiền cọc'
//                     value={deposit}
//                     onChangeText={setDeposit}
//                     keyboardType='numeric'
//                 />

//                 <TextInput
//                     style={styles.input}
//                     placeholder='Phòng ngủ'
//                     value={bedroom}
//                     onChangeText={setBedroom}
//                     keyboardType='numeric'
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Phòng tắm, vệ sinh'
//                     value={bathroom}
//                     onChangeText={setBathroom}
//                     keyboardType='numeric'
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Diện tích quyền sử dụng đất (m2)'
//                     value={landArea}
//                     onChangeText={setLandArea}
//                     keyboardType='numeric'
//                 />

//                 <TextInput
//                     style={styles.input}
//                     placeholder='Số tầng'
//                     value={floor}
//                     onChangeText={setFloor}
//                     keyboardType='numeric'
//                 />

//                 <TextInput
//                     style={styles.input}
//                     placeholder='Thời gian thuê tối thiểu'
//                     value={minDuration}
//                     onChangeText={setMinDuration}
//                     keyboardType='numeric'
//                 />
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={type.id}
//                         onValueChange={(itemValue) => {
//                             const selectedType = propertyTypes.find(
//                                 (type) => type.id === itemValue,
//                             );
//                             if (selectedType) {
//                                 setType({
//                                     id: selectedType.id,
//                                     name: selectedType.name,
//                                 });
//                             }
//                         }}
//                         style={styles.picker}
//                     >
//                         <Picker.Item
//                             label='Chọn loại bất động sản'
//                             value={undefined}
//                         />
//                         {propertyTypes.map((option) => (
//                             <Picker.Item
//                                 key={option.id}
//                                 label={option.name}
//                                 value={option.id}
//                             />
//                         ))}
//                     </Picker>
//                 </View>

//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={interior}
//                         onValueChange={(itemValue) => setInterior(itemValue)}
//                         style={styles.picker}
//                     >
//                         <Picker.Item label='Chọn nội thất' value={undefined} />
//                         {interiorOptions.map((option) => (
//                             <Picker.Item
//                                 key={option.value}
//                                 label={option.label}
//                                 value={option.value}
//                             />
//                         ))}
//                     </Picker>
//                 </View>
//                 <View style={styles.radioContainer}>
//                     <Text style={styles.label}>Tiện ích</Text>
//                     {attributes.map((attribute) => (
//                         <View key={attribute.id} style={styles.checkboxContainer}>
//                             <Checkbox
//                                 color="#007BFF"
//                                 status={selectedAttributes.includes(attribute.id) ? 'checked' : 'unchecked'}
//                                 onPress={() => handleAttributeChange(attribute.id)} // Thêm hàm xử lý khi thay đổi checkbox
//                             />
//                             <Text>{attribute.name}</Text>
//                         </View>
//                     ))}
//                 </View>

//                 <AddressInput
//                     selectedCity={selectedCity}
//                     setSelectedCity={(value, name) => {
//                         setSelectedCity(value);
//                         setSelectedCityName(name);
//                     }}
//                     selectedDistrict={selectedDistrict}
//                     setSelectedDistrict={(value, name) => {
//                         setSelectedDistrict(value);
//                         setSelectedDistrictName(name);
//                     }}
//                     selectedWard={selectedWard}
//                     setSelectedWard={(value, name) => {
//                         setSelectedWard(value);
//                         setSelectedWardName(name);
//                     }}
//                     street={street}
//                     setStreet={setStreet}
//                     showStreetInput={true}
//                 />

//                 <TouchableOpacity
//                     style={styles.uploadButton}
//                     onPress={pickImage}
//                 >
//                     <Text style={styles.uploadButtonText}>
//                         Tải lên hình ảnh tài sản
//                     </Text>
//                 </TouchableOpacity>
//                 <View style={styles.imageContainer}>
//                     {images.map((image, index) => (
//                         <View key={index} style={styles.imageWrapper}>
//                             <Image
//                                 source={{ uri: image.uri }}
//                                 style={styles.image}
//                             />
//                             <TouchableOpacity
//                                 style={styles.removeButton}
//                                 onPress={() => removeImage(index)}
//                             >
//                                 <Text style={styles.removeButtonText}>X</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </View>
//                 <TouchableOpacity
//                     style={[styles.submitButton, commonStyles.button]}
//                     onPress={handleUpdate}
//                     disabled={loading}
//                 >
//                     <Text
//                         style={[
//                             styles.submitButtonText,
//                             commonStyles.buttonText,
//                         ]}
//                     >
//                         {loading ? 'Đang cập nhật...' : 'Cập nhật bất động sản'}
//                     </Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
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
//     imageContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 15,
//     },
//     imageWrapper: {
//         position: 'relative',
//         marginRight: 10,
//         marginBottom: 10,
//     },
//     image: {
//         width: 100,
//         height: 100,
//     },
//     removeButton: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         backgroundColor: 'red',
//         borderRadius: 50,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     removeButtonText: {
//         color: '#fff',
//         fontSize: 12,
//     },
//     submitButton: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         alignItems: 'center',
//         borderRadius: 5,
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
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
//     radioContainer: {
//         // marginVertical: 20,
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // marginBottom: 10,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
// });

// export default EditPropertyScreen;


import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { IAttribute, ICondition, IProperty } from '../../types/property';
import { RootStackParamList } from '../../types/navigation';
import { fetchPropertyAttributes, fetchPropertyDetail, fetchPropertyTypes } from '../../api/api';
import { commonStyles } from '../../styles/theme';
import AddressInput from '../../components/form/AddressInput';

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

const EditPropertyScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'EditPropertyScreen'>>();
    const { slug } = route.params; // ID của bất động sản cần chỉnh sửa
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [loading, setLoading] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState<IProperty | null>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [acreage, setAcreage] = useState('');
    const [price, setPrice] = useState('');
    const [interior, setInterior] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [landArea, setLandArea] = useState('');
    const [type, setType] = useState<IAttribute>({ id: '', name: '' });
    const [floor, setFloor] = useState('');
    const [deposit, setDeposit] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [images, setImages] = useState<{ uri: string; fileName: string }[]>([]);
    const [street, setStreet] = useState('');

    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>();
    const [selectedWard, setSelectedWard] = useState<string | undefined>();
    const [selectedCityName, setSelectedCityName] = useState<string | undefined>();
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>();
    const [selectedWardName, setSelectedWardName] = useState<string | undefined>();

    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);

    useEffect(() => {
        const loadPropertyDetails = async () => {
            try {
                const data = await fetchPropertyDetail(slug);
                setPropertyDetails(data);



                setTitle(data.title);
                setDescription(data.description);
                setAcreage(data.rentalConditions.find((condition: ICondition) => condition.type === 'Diện tích')?.value || '');
                setPrice(data.price.toString());
                setInterior(data.rentalConditions.find((condition: ICondition) => condition.type === 'Nội thất')?.value || '');
                setBedroom(data.rentalConditions.find((condition: ICondition) => condition.type === 'Phòng ngủ')?.value || '');
                setBathroom(data.rentalConditions.find((condition: ICondition) => condition.type === 'Phòng tắm')?.value || '');
                setLandArea(data.rentalConditions.find((condition: ICondition) => condition.type === 'Diện tích quyền sử dụng đất')?.value || '');
                setType({ id: data.type.id, name: data.type.name });
                setFloor(data.rentalConditions.find((condition: ICondition) => condition.type === 'Số tầng')?.value || '');
                setDeposit(data.deposit.toString());
                setMinDuration(data.minDuration.toString());
                setImages(data.images.map((image: string) => ({ uri: image, fileName: image.split('/').pop() || 'image.jpg' })));
                setStreet(data.address.street);
                setSelectedCity(data.address.city);
                setSelectedDistrict(data.address.district);
                setSelectedWard(data.address.ward);
                setAttributes(data.attributes);

                // Map the attribute names to their IDs
                const attributeIds = data.attributes.map((attr: IAttribute) => {
                    const attribute = attributes.find(a => a.name === attr.name);
                    return attribute ? attribute.id : '';
                }).filter(id => id !== '');

                setSelectedAttributes(attributeIds);
            } catch (error) {
                console.error('Error loading property details:', error);
            }
        };

        const loadAttributesAndTypes = async () => {
            try {
                const attributes = await fetchPropertyAttributes();
                const propertyTypes = await fetchPropertyTypes();
                setAttributes(attributes);
                setPropertyTypes(propertyTypes);
            } catch (error) {
                console.error('Error loading attributes and types:', error);
            }
        };

        loadPropertyDetails();
        loadAttributesAndTypes();
    }, [slug]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            const fileName = selectedImage.fileName || 'default_filename.jpg';
            setImages((prevImages) => [
                ...prevImages,
                { uri: selectedImage.uri || '', fileName },
            ]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleAttributeChange = (value: string) => {


        setSelectedAttributes((prev) => {
            if (prev.includes(value)) {
                return prev.filter((attr) => attr !== value);
            } else {
                return [...prev, value];
            }
        });

    };

    const handleUpdate = async () => {
        if (loading) return;

        setLoading(true);
        try {
            if (!title || !description || !price || !type.id || !interior) {
                Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
                setLoading(false);
                return;
            }

            const conditions = [
                { type: 'Diện tích', value: `${acreage} m2` },
                { type: 'Diện tích quyền sử dụng đất', value: `${landArea} m2` },
                { type: 'Phòng ngủ', value: `${bedroom} phòng` },
                { type: 'Phòng tắm', value: `${bathroom} phòng` },
                { type: 'Số tầng', value: `${floor} tầng` },
                { type: 'Nội thất', value: interior },
            ];

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('deposit', deposit);
            formData.append('acreage', acreage);
            formData.append('city', selectedCityName || '');
            formData.append('district', selectedDistrictName || '');
            formData.append('ward', selectedWardName || '');
            formData.append('street', street);
            formData.append('conditions', JSON.stringify(conditions));
            formData.append('type', JSON.stringify({ id: type.id, name: type.name }));
            selectedAttributes.forEach((id) =>
                formData.append('attributeIds[]', id),
            );
            for (const image of images) {
                formData.append('images', {
                    uri: image.uri,
                    name: image.fileName,
                    type: 'image/jpeg',
                } as any);
            }

            console.log('Form data:', formData);

            // const response = await updateProperty(slug, formData);
            // if (response.success) {
            //     Alert.alert('Thành công', 'Cập nhật thành công.');
            //     navigation.navigate('ManageProperty');
            // } else {
            //     Alert.alert('Lỗi', response.message || 'Có lỗi xảy ra.');
            // }
        } catch (error) {
            console.error('Error updating property:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật.');
        } finally {
            setLoading(false);
        }
    };

    console.log('Selected district:', selectedDistrict);
    console.log('Selected ward:', selectedWard);

    return (
        <View style={commonStyles.container}>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder='Tiêu đề'
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Mô tả'
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder='Diện tích (m2)'
                    value={acreage}
                    onChangeText={setAcreage}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Giá'
                    value={price}
                    onChangeText={setPrice}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Tiền cọc'
                    value={deposit}
                    onChangeText={setDeposit}
                    keyboardType='numeric'
                />

                <TextInput
                    style={styles.input}
                    placeholder='Phòng ngủ'
                    value={bedroom}
                    onChangeText={setBedroom}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phòng tắm, vệ sinh'
                    value={bathroom}
                    onChangeText={setBathroom}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Diện tích quyền sử dụng đất (m2)'
                    value={landArea}
                    onChangeText={setLandArea}
                    keyboardType='numeric'
                />

                <TextInput
                    style={styles.input}
                    placeholder='Số tầng'
                    value={floor}
                    onChangeText={setFloor}
                    keyboardType='numeric'
                />

                <TextInput
                    style={styles.input}
                    placeholder='Thời gian thuê tối thiểu'
                    value={minDuration}
                    onChangeText={setMinDuration}
                    keyboardType='numeric'
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type.id}
                        onValueChange={(itemValue) => {
                            const selectedType = propertyTypes.find(
                                (type) => type.id === itemValue,
                            );
                            if (selectedType) {
                                setType({
                                    id: selectedType.id,
                                    name: selectedType.name,
                                });
                            }
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label='Chọn loại bất động sản'
                            value={undefined}
                        />
                        {propertyTypes.map((option) => (
                            <Picker.Item
                                key={option.id}
                                label={option.name}
                                value={option.id}
                            />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={interior}
                        onValueChange={(itemValue) => setInterior(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label='Chọn nội thất' value={undefined} />
                        {interiorOptions.map((option) => (
                            <Picker.Item
                                key={option.value}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </Picker>
                </View>
                <View style={styles.radioContainer}>
                    <Text style={styles.label}>Tiện ích</Text>
                    {attributes.map((attribute) => (
                        <View key={attribute.id} style={styles.checkboxContainer}>
                            <Checkbox
                                color="#007BFF"
                                status={selectedAttributes.includes(attribute.id) ? 'checked' : 'unchecked'}
                                onPress={() => handleAttributeChange(attribute.id)} // Thêm hàm xử lý khi thay đổi checkbox
                            />
                            <Text>{attribute.name}</Text>
                        </View>
                    ))}
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
                    showStreetInput={true}
                />

                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                >
                    <Text style={styles.uploadButtonText}>
                        Tải lên hình ảnh tài sản
                    </Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeImage(index)}
                            >
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.submitButton, commonStyles.button]}
                    onPress={handleUpdate}
                    disabled={loading}
                >
                    <Text
                        style={[styles.submitButtonText, commonStyles.buttonText]}
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật bất động sản'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 50,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    radioContainer: {
        // marginVertical: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default EditPropertyScreen;