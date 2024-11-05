// // import React, { useState } from 'react';
// // import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Text } from 'react-native';
// // import Feather from 'react-native-vector-icons/Feather';
// // import AntDesign from 'react-native-vector-icons/AntDesign';

// // import * as ImagePicker from 'expo-image-picker';
// // import { uploadFiles } from '../../utils/firebase';

// // interface ChatInputProps {
// //     inputText: string;
// //     setInputText: (text: string) => void;
// //     handleSend: () => void;
// // }

// // const ChatInput: React.FC<ChatInputProps> = ({ inputText, setInputText, handleSend }) => {
// //     const [selectedImages, setSelectedImages] = useState<string[]>([]);

// //     const openImageLibrary = async () => {
// //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //         if (status !== 'granted') {
// //             Alert.alert("Permission Denied", "You need to enable permissions to access the photo library.");
// //             return;
// //         }

// //         const result = await ImagePicker.launchImageLibraryAsync({
// //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //             allowsEditing: false,
// //             quality: 1,
// //         });

// //         if (result.canceled) {
// //             return;
// //         }

// //         if (result.assets && result.assets.length > 0) {
// //             const newImageUris = result.assets.map(asset => asset.uri);
// //             setSelectedImages(prev => [...prev, ...newImageUris]);
// //         }
// //     };

// //     const handleImageSend = async () => {
// //         if (selectedImages.length === 0) {
// //             Alert.alert("No Images", "Please select images to send.");
// //             return;
// //         }

// //         try {
// //             const uploadedUrls = await uploadFiles({
// //                 files: selectedImages.map(uri => ({
// //                     uri,
// //                     name: uri.split('/').pop() || 'image.jpg',
// //                 })),
// //             });

// //             console.log("Uploaded images:", uploadedUrls);
// //             // Gọi handleSend với văn bản và các URL hình ảnh đã tải lên
// //             handleSend(inputText, uploadedUrls);
// //             setSelectedImages([]); // Xóa hình ảnh đã chọn sau khi gửi
// //         } catch (error) {
// //             console.error("Error uploading images:", error);
// //             Alert.alert("Upload Error", "There was an error uploading your images.");
// //         }
// //     };


// //     const removeImage = (uri: string) => {
// //         setSelectedImages(prev => prev.filter(image => image !== uri));
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
// //                 {selectedImages.map((uri, index) => (
// //                     <View key={index} style={styles.imageContainer}>
// //                         <Image source={{ uri }} style={styles.image} />
// //                         <TouchableOpacity onPress={() => removeImage(uri)} style={styles.deleteIcon}>
// //                             <AntDesign name="close" size={14} color="red" />
// //                         </TouchableOpacity>
// //                     </View>
// //                 ))}
// //             </ScrollView>
// //             <View style={styles.inputContainer}>
// //                 <TouchableOpacity onPress={openImageLibrary} style={{ paddingHorizontal: 5 }}>
// //                     <Feather name="image" size={30} color="#007BFF" />
// //                 </TouchableOpacity>
// //                 <TextInput
// //                     style={styles.input}
// //                     value={inputText}
// //                     onChangeText={setInputText}
// //                     placeholder="Nhập tin nhắn..."
// //                     placeholderTextColor="#888"
// //                 />
// //                 <TouchableOpacity onPress={handleImageSend} style={{ marginRight: 5 }}>
// //                     <Feather name="send" size={30} color="#007BFF" />
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //     );
// // };


// // const styles = StyleSheet.create({
// //     container: {
// //         paddingBottom: 10,
// //     },
// //     imageScroll: {
// //         marginBottom: 10,
// //     },
// //     imageContainer: {
// //         position: 'relative',
// //         marginRight: 5,
// //     },
// //     image: {
// //         width: 60,
// //         height: 60,
// //         borderRadius: 5,
// //     },
// //     deleteIcon: {
// //         position: 'absolute',
// //         top: 0,
// //         right: 0,
// //         backgroundColor: 'rgba(255, 255, 255, 0.7)',
// //         borderRadius: 15,
// //         padding: 2,
// //     },
// //     inputContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         marginTop: 10,
// //         paddingVertical: 5,
// //         backgroundColor: '#fff',
// //         borderRadius: 5,
// //     },
// //     input: {
// //         flex: 1,
// //         borderRadius: 5,
// //         padding: 5,
// //         marginRight: 10,
// //         backgroundColor: '#fff',
// //     },
// // });

// // export default ChatInput;

// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import * as ImagePicker from 'expo-image-picker';
// import { uploadFiles } from '../../utils/firebase';

// interface ChatInputProps {
//     inputText: string;
//     setInputText: (text: string) => void;
//     handleSend: (text: string, uploadedImageUrls: string[]) => void; // Thay đổi ở đây
// }

// const ChatInput: React.FC<ChatInputProps> = ({ inputText, setInputText, handleSend }) => {
//     const [selectedImages, setSelectedImages] = useState<string[]>([]);

//     const openImageLibrary = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert("Permission Denied", "You need to enable permissions to access the photo library.");
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: false,
//             quality: 1,
//         });

//         if (result.canceled) {
//             return;
//         }

//         if (result.assets && result.assets.length > 0) {
//             const newImageUris = result.assets.map(asset => asset.uri);
//             setSelectedImages(prev => [...prev, ...newImageUris]);
//         }
//     };

//     const handleImageSend = async () => {
//         if (selectedImages.length === 0) {
//             Alert.alert("No Images", "Please select images to send.");
//             return;
//         }

//         try {
//             const uploadedUrls = await uploadFiles({
//                 files: selectedImages.map(uri => ({
//                     uri,
//                     name: uri.split('/').pop() || 'image.jpg',
//                 })),
//             });

//             console.log("Uploaded images:", uploadedUrls);
//             handleSend('', uploadedUrls); // Gửi tin nhắn với chỉ URL hình ảnh
//             setSelectedImages([]); // Xóa hình ảnh đã chọn sau khi gửi
//             setInputText(''); // Xóa nội dung văn bản sau khi gửi
//         } catch (error) {
//             console.error("Error uploading images:", error);
//             Alert.alert("Upload Error", "There was an error uploading your images.");
//         }
//     };

//     // const handleImageSend = async () => {
//     //     if (selectedImages.length === 0) {
//     //         Alert.alert("No Images", "Please select images to send.");
//     //         return;
//     //     }

//     //     try {
//     //         const uploadedUrls = await uploadFiles({
//     //             files: selectedImages.map(uri => ({
//     //                 uri,
//     //                 name: uri.split('/').pop() || 'image.jpg',
//     //             })),
//     //         });

//     //         console.log("Uploaded images:", uploadedUrls);
//     //         // Gọi handleSend với văn bản và các URL hình ảnh đã tải lên
//     //         handleSend(inputText, uploadedUrls);
//     //         setSelectedImages([]); // Xóa hình ảnh đã chọn sau khi gửi
//     //         setInputText(''); // Xóa nội dung văn bản sau khi gửi
//     //     } catch (error) {
//     //         console.error("Error uploading images:", error);
//     //         Alert.alert("Upload Error", "There was an error uploading your images.");
//     //     }
//     // };

//     const removeImage = (uri: string) => {
//         setSelectedImages(prev => prev.filter(image => image !== uri));
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
//                 {selectedImages.map((uri, index) => (
//                     <View key={index} style={styles.imageContainer}>
//                         <Image source={{ uri }} style={styles.image} />
//                         <TouchableOpacity onPress={() => removeImage(uri)} style={styles.deleteIcon}>
//                             <AntDesign name="close" size={14} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </ScrollView>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.input}
//                     value={inputText}
//                     onChangeText={setInputText}
//                     placeholder="Type a message..."
//                 />
//                 <TouchableOpacity onPress={handleImageSend}>
//                     <Feather name="send" size={24} color="#007AFF" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={openImageLibrary} style={styles.uploadButton}>
//                     <Feather name="image" size={24} color="#007AFF" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column',
//         padding: 10,
//         backgroundColor: '#fff',
//     },
//     imageScroll: {
//         marginBottom: 10,
//     },
//     imageContainer: {
//         position: 'relative',
//         marginRight: 5,
//     },
//     image: {
//         width: 50,
//         height: 50,
//         borderRadius: 5,
//     },
//     deleteIcon: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         backgroundColor: 'white',
//         borderRadius: 50,
//         padding: 2,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     input: {
//         flex: 1,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginRight: 10,
//     },
//     uploadButton: {
//         padding: 5,
//     },
// });

// export default ChatInput;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { uploadFiles } from '../../utils/firebase';

interface ChatInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSend: (text: string, uploadedImageUrls: string[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputText, setInputText, handleSend }) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "You need to enable permissions to access the photo library.");
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
            const newImageUris = result.assets.map(asset => asset.uri);
            setSelectedImages(prev => [...prev, ...newImageUris]);
        }
    };

    const handleSendMessage = async () => {
        if (inputText.trim().length === 0 && selectedImages.length === 0) {
            Alert.alert("No Message", "Please enter a message or select images to send.");
            return;
        }

        let uploadedUrls: string[] = [];
        if (selectedImages.length > 0) {
            try {
                uploadedUrls = await uploadFiles({
                    files: selectedImages.map(uri => ({
                        uri,
                        name: uri.split('/').pop() || 'image.jpg',
                    })),
                });
                console.log("Uploaded images:", uploadedUrls);
                setSelectedImages([]); // Xóa hình ảnh đã chọn sau khi gửi
            } catch (error) {
                console.error("Error uploading images:", error);
                Alert.alert("Upload Error", "There was an error uploading your images.");
                return;
            }
        }

        // Gửi tin nhắn với văn bản và các URL hình ảnh đã tải lên
        handleSend(inputText, uploadedUrls);
        setInputText(''); // Xóa nội dung văn bản sau khi gửi
    };

    const removeImage = (uri: string) => {
        setSelectedImages(prev => prev.filter(image => image !== uri));
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                {selectedImages.map((uri, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri }} style={styles.image} />
                        <TouchableOpacity onPress={() => removeImage(uri)} style={styles.deleteIcon}>
                            <AntDesign name="close" size={14} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                    <Feather name="send" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openImageLibrary} style={styles.uploadButton}>
                    <Feather name="image" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#fff',
    },
    imageScroll: {
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 5,
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
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        padding: 5,
    },
    uploadButton: {
        padding: 5,
    },
});

export default ChatInput;
