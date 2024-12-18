

import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Button from '../button/Button';

interface SuggestionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

interface ImageFile {
    uri: string;
    fileName: string;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ visible, onClose, onSubmit }) => {
    const [proposed, setProposed] = useState('');
    const [resolvedAt, setResolvedAt] = useState<Date | undefined>(undefined);
    const [compensation, setCompensation] = useState('');
    const [media, setMedia] = useState<ImageFile[]>([]);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        proposed: '',
        resolvedAt: '',
        compensation: '',
    });

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });
            if (!result.canceled) {
                const selectedImage = result.assets[0];
                const fileName = selectedImage.fileName || 'default_filename.jpg';
                setMedia([...media, { uri: selectedImage.uri || '', fileName }]);
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

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        // Process images before submitting
        const processedMedia = await Promise.all(
            media.map(async (image) => {
                const response = await fetch(image.uri);
                const blob = await response.blob();
                return {
                    uri: image.uri,
                    name: image.fileName,
                    type: blob.type,
                };
            })
        );

        onSubmit({ proposed, resolvedAt: resolvedAt ? format(resolvedAt, 'dd/MM/yyyy') : '', compensation, media: processedMedia });
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.label}>Đề xuất xử lý</Text>
                    <TextInput
                        style={[styles.input, errors.proposed && styles.errorInput]}
                        placeholder="Đề xuất phương án xử lý..."
                        value={proposed}
                        onChangeText={setProposed}
                    />
                    {errors.proposed ? <Text style={styles.errorText}>{errors.proposed}</Text> : null}

                    <Text style={styles.label}>Ngày giải quyết</Text>
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

                    <Text style={styles.label}>Tiền bồi thường</Text>
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
                        <Text style={styles.uploadText}>Tải lên hình ảnh</Text>
                    </TouchableOpacity>

                    <View style={styles.mediaContainer}>
                        {media.map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: image.uri }} style={styles.media} />
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
                        <Button onPress={onClose}>Hủy</Button>
                        <Button onPress={handleSubmit}>Gửi đề xuất</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        elevation: 5,
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
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadText: {
        color: '#555',
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
        width: 80,
        height: 80,
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

export default SuggestionModal;