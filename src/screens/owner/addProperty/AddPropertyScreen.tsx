import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import AddressInput from '../../../components/form/AddressInput';
import { commonStyles } from '../../../styles/theme';
import { Picker } from '@react-native-picker/picker';
import { fetchPropertyTypes, fetchPropertyAttributes, createProperty } from '../../../api/api';
import { IAttribute } from '../../../types/property';
import { Checkbox } from '@ant-design/react-native';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';

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

interface ImageFile {
    uri: string;
    fileName: string;
}


const AddPropertyScreen: React.FC = () => {
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
    const [attributeIds, setAttributeIds] = useState<string[]>([]);
    const [images, setImages] = useState<ImageFile[]>([]);
    const [street, setStreet] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);


    const [selectedCityName, setSelectedCityName] = useState<string | undefined>(undefined);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>(undefined);
    const [selectedWardName, setSelectedWardName] = useState<string | undefined>(undefined);

    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const [propertyTypes, setPropertyTypes] = useState<IAttribute[]>([]);
    const [loading, setLoading] = useState(false);


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
                setPropertyTypes(data);
            } catch (error) {
                console.error('Error loading property types:', error);
            }
        };

        loadAttributes();
        loadPropertyTypes();
    }, []);

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
                { uri: selectedImage.uri || '', fileName }
            ]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleAttributeChange = (value: string) => {
        setSelectedAttributes(prev => {
            if (prev.includes(value)) {
                return prev.filter(attr => attr !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleUpload = async () => {
        if (loading) return;

        setLoading(true);
        try {
            if (!title || !description || !price || !type || !interior || !termsAccepted) {
                Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
                setLoading(false);
                return;
            }

            const conditions = [
                { type: "Diện tích", value: `${acreage} m2` },
                { type: "Diện tích quyền sử dụng đất", value: `${landArea} m2` },
                { type: "Phòng ngủ", value: `${bedroom} phòng` },
                { type: "Phòng tắm", value: `${bathroom} phòng` },
                { type: "Số tầng", value: `${floor} tầng` },
                { type: "Nội thất", value: interior },
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
            selectedAttributes.forEach(id => formData.append('attributeIds[]', id));
            for (const image of images) {
                formData.append('images', {
                    uri: image.uri,
                    name: image.fileName,
                    type: 'image/jpeg',
                } as any);
            }
            console.log('Form data:', formData);



            const response = await createProperty(formData);
            if (response.success) {
                Alert.alert('Thành công', 'Bất động sản đã được thêm thành công.');

            } else {
                Alert.alert('Lỗi', response.message || 'Có lỗi xảy ra.');
            }
        } catch (error) {
            console.error('Error uploading property:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải lên.');
        } finally {
            setLoading(false); // Stop loading state
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
                <TextInput
                    style={styles.input}
                    placeholder="Tiền đặt cọc"
                    value={deposit}
                    onChangeText={setDeposit}
                    keyboardType="numeric"
                />

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

                <TextInput
                    style={styles.input}
                    placeholder="Số tầng"
                    value={floor}
                    onChangeText={setFloor}
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
                        selectedValue={type.id}
                        onValueChange={(itemValue) => {
                            const selectedType = propertyTypes.find(type => type.id === itemValue);
                            if (selectedType) {
                                setType({ id: selectedType.id, name: selectedType.name });
                            }
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Chọn loại bất động sản" value={undefined} />
                        {propertyTypes.map((option) => (
                            <Picker.Item key={option.id} label={option.name} value={option.id} />
                        ))}
                    </Picker>
                </View>

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
                <View style={styles.radioContainer}>
                    <Text style={styles.label}>Chọn tiện ích:</Text>
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
                />

                {/* <AddressInput
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedWard={selectedWard}
                    setSelectedWard={setSelectedWard}
                    street={street}
                    setStreet={setStreet}
                /> */}

                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri: image.uri }} style={styles.image} />
                            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.termsContainer}>
                    <Checkbox
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Smart Home</Text>
                </View>
                <TouchableOpacity style={[styles.submitButton, commonStyles.button]} onPress={handleUpload} disabled={loading}>
                    <Text style={[styles.submitButtonText, commonStyles.buttonText]}>{loading ? 'Đang tải...' : 'GỬI'}</Text>
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
});

export default AddPropertyScreen;