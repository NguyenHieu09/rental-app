// PersonalInfo.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import { COLORS, commonStyles, SIZES } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirstAndLastName } from '../../utils/avatar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { updateUserInfo } from '../../api/api';
import { saveUser } from '../../redux-toolkit/slices/userSlice';

const PersonalInfo = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [localAvatar, setLocalAvatar] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleSave = async () => {
        try {
            let avatarUrl = avatar;

            if (localAvatar) {
                const processedImageUri = await processImage(localAvatar);
                avatarUrl = processedImageUri;
                setAvatar(avatarUrl);
            }
            console.log('avatarUrl', avatarUrl);

            const user = await updateUserInfo(phoneNumber, avatarUrl, name);
            dispatch(saveUser(user));
            Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
            console.error('Error updating user info:', error);
        }
    };

    const handleAvatarUpdate = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            setLocalAvatar(selectedImage);
        }
    };

    const processImage = async (uri: string) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 600 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
        );
        return manipResult.uri;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={commonStyles.header}>
                <TouchableOpacity onPress={handleAvatarUpdate}>
                    {localAvatar ? (
                        <Image
                            source={{ uri: localAvatar }}
                            style={styles.avatar}
                        />
                    ) : avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        user?.name && (
                            <View style={styles.nameInitials}>
                                <Text style={styles.initials}>
                                    {getFirstAndLastName(user.name)}
                                </Text>
                            </View>
                        )
                    )}
                </TouchableOpacity>
                <Text style={styles.name}>{user?.name || 'Guest'}</Text>
                <Text style={styles.email}>
                    {user?.email || 'guest@example.com'}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Tên:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    editable={false}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    editable={false}
                />
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity
                    style={[commonStyles.button]}
                    onPress={handleSave}
                >
                    <Text style={commonStyles.buttonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.secondary,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    infoContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    nameInitials: {
        backgroundColor: '#f4f4f5',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    initials: {
        fontSize: 30,
        fontWeight: '500',
        color: '#09090b',
    },
});

export default PersonalInfo;
