// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [ward, setWard] = useState('');
//     const [street, setStreet] = useState('');
//     const [termsAccepted, setTermsAccepted] = useState(false);

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
//                 city,
//                 district,
//                 ward,
//                 street,
//             },
//             termsAccepted,
//         });
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.header}>Đăng ký tài sản mới</Text>
//             <Text style={styles.subHeader}>Đăng ký trên thị trường nơi người thuê đang chờ đợi!</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Tiêu đề"
//                 value={title}
//                 onChangeText={setTitle}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Mô tả"
//                 value={description}
//                 onChangeText={setDescription}
//                 multiline
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Diện tích (m2)"
//                 value={acreage}
//                 onChangeText={setAcreage}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Giá"
//                 value={price}
//                 onChangeText={setPrice}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nội thất"
//                 value={interior}
//                 onChangeText={setInterior}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Số phòng ngủ"
//                 value={bedroom}
//                 onChangeText={setBedroom}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Số phòng tắm"
//                 value={bathroom}
//                 onChangeText={setBathroom}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Diện tích quyền sử dụng đất (m2)"
//                 value={landArea}
//                 onChangeText={setLandArea}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Loại bất động sản"
//                 value={type}
//                 onChangeText={setType}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Số tầng"
//                 value={floor}
//                 onChangeText={setFloor}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Tiền đặt cọc"
//                 value={deposit}
//                 onChangeText={setDeposit}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Thời gian thuê tối thiểu"
//                 value={minDuration}
//                 onChangeText={setMinDuration}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Danh sách các thuộc tính (mảng các chuỗi)"
//                 value={attributeIds.join(', ')}
//                 onChangeText={(text) => setAttributeIds(text.split(',').map(attr => attr.trim()))}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Thành phố"
//                 value={city}
//                 onChangeText={setCity}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Quận/Huyện"
//                 value={district}
//                 onChangeText={setDistrict}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Phường/Xã"
//                 value={ward}
//                 onChangeText={setWard}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Đường"
//                 value={street}
//                 onChangeText={setStreet}
//             />
//             <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
//                 <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
//             </TouchableOpacity>
//             <View style={styles.termsContainer}>
//                 <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
//                     <Text style={termsAccepted ? styles.checked : styles.unchecked}>☑️</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.termsText}>Tôi đồng ý với các điều khoản và điều kiện của Bimal</Text>
//             </View>
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>GỬI</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     subHeader: {
//         fontSize: 16,
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
//     },
//     checked: {
//         fontSize: 20,
//     },
//     unchecked: {
//         fontSize: 20,
//         color: '#ccc',
//     },
//     termsText: {
//         marginLeft: 10,
//         fontSize: 14,
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
// });

// export default AddProperty;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AddressInput from '../../../components/form/AddressInput';
import { commonStyles } from '../../../styles/theme';
// import AddressInput from './AddressInput'; // Import AddressInput component

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
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

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
                city,
                district,
                ward,
                street,
            },
            termsAccepted,
        });
    };

    return (
        <View style={commonStyles.container}>
            <Text style={styles.header}>Thêm tài sản mới</Text>
            <ScrollView >
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
                    placeholder="Nội thất"
                    value={interior}
                    onChangeText={setInterior}
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
                    placeholder="Loại bất động sản"
                    value={type}
                    onChangeText={setType}
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
                <AddressInput
                    city={city}
                    setCity={setCity}
                    district={district}
                    setDistrict={setDistrict}
                    ward={ward}
                    setWard={setWard}
                    street={street}
                    setStreet={setStreet}
                />
                <TouchableOpacity style={styles.uploadButton} onPress={() => {/* handle image upload */ }}>
                    <Text style={styles.uploadButtonText}>Tải lên hình ảnh tài sản</Text>
                </TouchableOpacity>
                <View style={styles.termsContainer}>
                    <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                        <Text style={termsAccepted ? styles.checked : styles.unchecked}>☑️</Text>
                    </TouchableOpacity>
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
    },
    checked: {
        fontSize: 20,
    },
    unchecked: {
        fontSize: 20,
        color: '#ccc',
    },
    termsText: {
        marginLeft: 10,
        fontSize: 14,
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
});

export default AddProperty;