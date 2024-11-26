import * as ImagePicker from 'expo-image-picker';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { IReview } from '../../types/review';
import { createReview } from '../../api/api';

const ReviewFooter = ({
    isFirstReview,
    isRenter,
    contractId,
    propertyId,
    setReview,
}: {
    isFirstReview?: boolean;
    isRenter?: boolean;
    propertyId: string;
    contractId: string;
    setReview: Dispatch<SetStateAction<IReview | null>>;
}) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [inputText, setInputText] = useState('');
    const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const openImageLibrary = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Quyền truy cập bị từ chối',
                'Bạn cần cấp quyền để truy cập vào thư viện ảnh.',
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const newImageUris = result.assets.map((asset) => asset.uri);
            setSelectedImages((prev) => [...prev, ...newImageUris]);
            setImages((prev) => [...prev, ...result.assets]);
        }
    };

    const handleSendMessage = async () => {
        if (
            !isFirstReview &&
            inputText.trim().length === 0 &&
            selectedImages.length === 0
        ) {
            Alert.alert(
                'Không có nội dung',
                'Vui lòng nhập đánh giá hoặc chọn hình ảnh để gửi.',
            );
            return;
        }

        setLoading(true);
        try {
            const formData: FormData = new FormData();

            // Add images to form data
            selectedImages.forEach((uri) => {
                const blob = new Blob([uri], { type: 'image/jpeg' });
                formData.append('images', blob);
            });
            formData.append('content', inputText);
            formData.append('rating', String(rating * 2));
            formData.append('contractId', contractId);
            formData.append('propertyId', propertyId);

            const review = await createReview(formData);
            console.log('🚀 ~ handleSendMessage ~ review:', review);

            setInputText(''); // Xóa nội dung văn bản sau khi gửi
            setSelectedImages([]); // Xóa hình ảnh đã chọn
            setImages([]); // Xóa hình ảnh đã chọn
            setRating(5); // Đặt lại đánh giá mặc định
            setReview(review);
        } catch (error) {
            console.log('🚀 ~ handleSendMessage ~ error:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (uri: string) => {
        setSelectedImages((prev) => prev.filter((image) => image !== uri));
        setImages((prev) => prev.filter((image) => image.uri !== uri));
    };

    const handleChangeRating = (rating: number) => {
        setRating(rating);
    };

    return (
        <View style={styles.container}>
            {isFirstReview && (
                <StarRating
                    rating={rating}
                    onChange={handleChangeRating}
                    starSize={20}
                    color='#f1c40f'
                />
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder='Nhập đánh giá...'
                />
                <TouchableOpacity
                    onPress={openImageLibrary}
                    style={styles.uploadButton}
                >
                    <Feather name='image' size={24} color='#007AFF' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSendMessage}
                    style={styles.sendButton}
                >
                    {loading ? (
                        <ActivityIndicator size='small' color='#007AFF' />
                    ) : (
                        <Feather name='send' size={24} color='#007AFF' />
                    )}
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageScroll}
            >
                {selectedImages.map((uri, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri }} style={styles.image} />
                        <TouchableOpacity
                            onPress={() => removeImage(uri)}
                            style={styles.deleteIcon}
                        >
                            <AntDesign name='close' size={14} color='red' />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'hsl(240 5.9% 90%)',
        marginTop: 12,
    },
    imageScroll: {
        // marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        // marginRight: 10,
    },
    sendButton: {
        // padding: 5,
    },
    uploadButton: {
        // padding: 5,
    },
});

export default ReviewFooter;
