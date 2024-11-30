

import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../components/button/Button';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { createReportByRenter } from '../../../api/contract';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';

interface ImageFile {
    uri: string;
    fileName: string;
}

type AddReportRouteProp = RouteProp<RootStackParamList, 'AddReport'>;

const AddReport: React.FC = () => {
    const route = useRoute<AddReportRouteProp>();
    const { contractId } = route.params;

    const [reportType, setReportType] = useState<string>('');
    const [severity, setSeverity] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [resolutionSuggestion, setResolutionSuggestion] = useState<string>('');
    const [resolutionDate, setResolutionDate] = useState<Date | undefined>(undefined);
    const [reward, setReward] = useState<string>('');
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [images, setImages] = useState<ImageFile[]>([]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || resolutionDate;
        setShowDatePicker(false);
        setResolutionDate(currentDate);
    };
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

    const handleSubmit = async () => {
        const formData = new FormData();



        // Append other form fields
        formData.append('type', reportType);
        formData.append('priority', severity);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('proposed', resolutionSuggestion);
        formData.append('resolvedAt', resolutionDate ? dayjs(resolutionDate).format('DD/MM/YYYY') : '');
        formData.append('compensation', String(reward || 0));
        formData.append('contractId', contractId);

        for (const image of images) {
            formData.append('evidences', {
                uri: image.uri,
                name: image.fileName,
                type: 'image/jpeg',
            } as any);
        }
        console.log('Form data:', formData);


        try {
            const res = await createReportByRenter(formData);
            console.log('Report created successfully:', res);
            Alert.alert('Success', 'Report created successfully');
        } catch (error) {
            console.error('Error creating report:', error);
            Alert.alert('Error', 'Failed to create report');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.title}>Báo cáo sự cố & vi phạm</Text>

                <Text style={styles.label}>Loại báo cáo</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={reportType} onValueChange={setReportType}>
                        <Picker.Item label="Chọn loại báo cáo" value="" />
                        <Picker.Item label="Sự cố" value="incident" />
                        <Picker.Item label="Vi phạm" value="violation" />
                    </Picker>
                </View>

                <Text style={styles.label}>Mức độ</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={severity} onValueChange={setSeverity}>
                        <Picker.Item label="Chọn mức độ" value="" />
                        <Picker.Item label="Thấp" value="low" />
                        <Picker.Item label="Trung bình" value="medium" />
                        <Picker.Item label="Cao" value="high" />
                    </Picker>
                </View>

                <Text style={styles.label}>Tiêu đề</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Tóm tắt vấn đề" />

                <Text style={styles.label}>Mô tả chi tiết</Text>
                <TextInput style={styles.textarea} value={description} onChangeText={setDescription} placeholder="Mô tả chi tiết về sự cố hoặc vi phạm..." multiline />

                <Text style={styles.label}>Đề xuất xử lý</Text>
                <TextInput style={styles.input} value={resolutionSuggestion} onChangeText={setResolutionSuggestion} placeholder="Đề xuất phương án xử lý..." />

                <Text style={styles.label}>Ngày giải quyết</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: "100%" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày giải quyết"
                        value={resolutionDate ? format(resolutionDate, 'dd/MM/yyyy') : ''}
                        editable={false}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={resolutionDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <Text style={styles.label}>Tiền bồi thường</Text>
                <TextInput style={styles.input} value={reward} onChangeText={setReward} placeholder="Nhập số tiền bồi thường..." keyboardType="numeric" />
                <Text style={styles.label}>Ảnh/video minh chứng</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>Tải lên hình ảnh</Text>
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

                <View style={styles.buttonContainer}>
                    <Button type='primary' variant='fill' style={styles.button} onPress={handleSubmit}>Gửi báo cáo</Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
    textarea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    button: {
        flex: 1,
        height: 50
    },
    pickerContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        height: 50,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
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
});

export default AddReport;