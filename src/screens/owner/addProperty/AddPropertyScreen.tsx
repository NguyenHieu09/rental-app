// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import AddressInput from '../../../components/form/AddressInput';
// import { commonStyles } from '../../../styles/theme';
// import MultiSelect from 'react-native-multiple-select';
// import { Checkbox } from '@ant-design/react-native';
// import { fetchPropertyAttributes } from '../../../api/api';
// import { Picker } from '@react-native-picker/picker';
// import { IAttribute } from '../../../types/property';

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
//     const [images, setImages] = useState<string[]>([]);
//     const [street, setStreet] = useState('');
//     const [termsAccepted, setTermsAccepted] = useState(false);

//     const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
//     const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
//     const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

//     const [attributes, setAttributes] = useState<IAttribute[]>([]);

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
//     const handleSubmit = () => {
//         console.log({
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
//         });
//     };

//     return (
//         <View style={commonStyles.container}>
//             {/* <Text style={styles.header}>Thêm tài sản mới</Text> */}
//             <ScrollView >
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
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nội thất"
//                     value={interior}
//                     onChangeText={setInterior}
//                 />
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
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Loại bất động sản"
//                     value={type}
//                     onChangeText={setType}
//                 />
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

//                 <Picker
//                     selectedValue={attributes}
//                     onValueChange={(itemValue) => setAttributes(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Chọn tiện ích" value={undefined} />
//                     {attributes.map((attribute) => (
//                         <Picker.Item key={attribute.id} label={attribute.name} value={attribute.id} />
//                     ))}
//                 </Picker>


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

//                 <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
//                     <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
//                 </TouchableOpacity>
//                 <View style={styles.termsContainer}>
//                     <Checkbox

//                         checked={termsAccepted}
//                         onChange={(event) => setTermsAccepted(event.target.checked)}
//                     />
//                     <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
//                 </View>
//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                     <Text style={styles.submitButtonText}>GỬI</Text>
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
//     checked: {
//         fontSize: 20,
//     },
//     unchecked: {
//         fontSize: 20,
//         color: '#ccc',
//     },
//     termsText: {
//         fontSize: 14,
//         flexShrink: 1,
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
//     picker: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//     },
// });

// export default AddProperty;


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AddressInput from '../../../components/form/AddressInput';
import { commonStyles } from '../../../styles/theme';
import MultiSelect from 'react-native-multiple-select';
import { Checkbox } from '@ant-design/react-native';
import { fetchPropertyAttributes, fetchPropertyTypes } from '../../../api/api';
import { Picker } from '@react-native-picker/picker';
import { IAttribute } from '../../../types/property'; // Import interface IAttribute

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
    const [images, setImages] = useState<string[]>([]);
    const [street, setStreet] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

    const [attributes, setAttributes] = useState<IAttribute[]>([]); // Khởi tạo attributes là một mảng rỗng
    const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);

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
            try {
                const data = await fetchPropertyTypes();
                console.log('Property types:', data);

                setPropertyTypes(data);
            } catch (error) {
                console.error('Error loading property types:', error);
            }
        };

        loadAttributes();
        loadPropertyTypes();
    }, []);

    const handleSubmit = () => {
        console.log({
            title,
            description,
            acreage,
            price,
            interior,
            bedroom,
            bathroom,
            landArea,
            type,
            floor,
            deposit,
            minDuration,
            attributeIds,
            images,
            address: {
                city: selectedCity,
                district: selectedDistrict,
                ward: selectedWard,
                street,
            },
            termsAccepted,
        });
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

                <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
                    <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
                </TouchableOpacity>
                <View style={styles.termsContainer}>
                    <Checkbox
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>GỬI</Text>
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
        // padding: 10,
        marginBottom: 15,
    },
    picker: {
        fontSize: 10,
    },
});

export default AddProperty;