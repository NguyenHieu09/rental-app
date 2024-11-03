import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';

interface ChatInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSend: () => void;
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

    const handleImageSend = () => {
        console.log("Sending images:", selectedImages);
        handleSend();
        setSelectedImages([]); // Clear the images after sending
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
                <TouchableOpacity onPress={openImageLibrary} style={{ paddingHorizontal: 5 }}>
                    <Feather name="image" size={30} color="#007BFF" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Nhập tin nhắn..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={handleSend} style={{ marginRight: 5 }}>
                    <Feather name="send" size={30} color="#007BFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    imageScroll: {
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        backgroundColor: '#fff',
    },
});

export default ChatInput;
