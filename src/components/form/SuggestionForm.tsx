// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const SuggestionForm: React.FC = () => {
//     const [suggestion, setSuggestion] = useState('');
//     const [resolutionDate, setResolutionDate] = useState('');
//     const [amount, setAmount] = useState('');
//     const [media, setMedia] = useState<string[]>([]);

//     const handleImagePicker = async () => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (permissionResult.granted) {
//             const result = await ImagePicker.launchImageLibraryAsync();
//             if (!result.canceled) {
//                 setMedia([...media, result.assets[0].uri]);
//             }
//         }
//     };

//     const handleSubmit = () => {
//         // Handle submission logic here  
//         console.log({
//             suggestion,
//             resolutionDate,
//             amount,
//             media
//         });
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>Đề xuất xử lý *</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Đề xuất phương án xử lý..."
//                 value={suggestion}
//                 onChangeText={setSuggestion}
//             />

//             <Text style={styles.label}>Ngày giải quyết *</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Ngày giải quyết"
//                 value={resolutionDate}
//                 onChangeText={setResolutionDate}
//             />

//             <Text style={styles.label}>Tiền bồi thường *</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nhập số tiền bồi thường..."
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//             />

//             <Text style={styles.label}>Ảnh, video minh chứng</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
//                 <Text>+ Đăng tải</Text>
//             </TouchableOpacity>

//             <View style={styles.mediaContainer}>
//                 {media.map((uri, index) => (
//                     <Image key={index} source={{ uri }} style={styles.media} />
//                 ))}
//             </View>

//             <View style={styles.buttonContainer}>
//                 <Button title="Hủy" onPress={() => console.log('Cancelled')} color="#ccc" />
//                 <Button title="Gửi đề xuất" onPress={handleSubmit} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },
//     label: {
//         marginVertical: 8,
//         fontSize: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 4,
//         padding: 10,
//         marginBottom: 16,
//     },
//     uploadButton: {
//         backgroundColor: '#e0e0e0',
//         padding: 10,
//         borderRadius: 4,
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     mediaContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 16,
//     },
//     media: {
//         width: 100,
//         height: 100,
//         margin: 5,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
// });

// export default SuggestionForm;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const SuggestionForm: React.FC = () => {
    const [proposed, setProposed] = useState('');
    const [resolvedAt, setResolvedAt] = useState<Date | undefined>(undefined);
    const [compensation, setCompensation] = useState('');
    const [media, setMedia] = useState<string[]>([]);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        proposed: '',
        resolvedAt: '',
        compensation: '',
    });

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setMedia([...media, result.assets[0].uri]);
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || resolvedAt;
        setShowDatePicker(false);
        setResolvedAt(currentDate);
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = { proposed: '', resolvedAt: '', compensation: '' };

        if (!proposed) {
            newErrors.proposed = 'Vui lòng nhập đề xuất xử lý.';
            valid = false;
        }

        if (!resolvedAt) {
            newErrors.resolvedAt = 'Vui lòng chọn ngày giải quyết.';
            valid = false;
        }

        if (!compensation) {
            newErrors.compensation = 'Vui lòng nhập số tiền bồi thường.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (!validateFields()) {
            return;
        }

        // Handle submission logic here
        console.log({
            proposed,
            resolvedAt: resolvedAt ? format(resolvedAt, 'yyyy-MM-dd') : '',
            compensation,
            media
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Đề xuất xử lý *</Text>
            <TextInput
                style={[styles.input, errors.proposed && styles.errorInput]}
                placeholder="Đề xuất phương án xử lý..."
                value={proposed}
                onChangeText={setProposed}
            />
            {errors.proposed ? <Text style={styles.errorText}>{errors.proposed}</Text> : null}

            <Text style={styles.label}>Ngày giải quyết *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: "100%" }}>
                <TextInput
                    style={[styles.input, errors.resolvedAt && styles.errorInput]}
                    placeholder="Ngày giải quyết"
                    value={resolvedAt ? format(resolvedAt, 'dd/MM/yyyy') : ''}
                    editable={false}
                />
            </TouchableOpacity>
            {errors.resolvedAt ? <Text style={styles.errorText}>{errors.resolvedAt}</Text> : null}
            {showDatePicker && (
                <DateTimePicker
                    value={resolvedAt || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Text style={styles.label}>Tiền bồi thường *</Text>
            <TextInput
                style={[styles.input, errors.compensation && styles.errorInput]}
                placeholder="Nhập số tiền bồi thường..."
                value={compensation}
                onChangeText={setCompensation}
                keyboardType="numeric"
            />
            {errors.compensation ? <Text style={styles.errorText}>{errors.compensation}</Text> : null}

            <Text style={styles.label}>Ảnh, video minh chứng</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
                <Text>+ Đăng tải</Text>
            </TouchableOpacity>

            <View style={styles.mediaContainer}>
                {media.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.media} />
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveImage(index)}
                        >
                            <Text style={styles.removeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Hủy" onPress={() => console.log('Cancelled')} color="#ccc" />
                <Button title="Gửi đề xuất" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        marginVertical: 8,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    uploadButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 16,
    },
    mediaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
    },
    media: {
        width: 100,
        height: 100,
        borderRadius: 8,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SuggestionForm;