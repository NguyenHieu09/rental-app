


// UpdatePassword.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUserPassword } from '../../api/api';
import { RootState } from '../../redux-toolkit/store';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const user = useSelector((state: RootState) => state.user.user);

    const handleUpdatePassword = async () => {
        if (!newPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không được để trống');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải có độ dài ít nhất 6 ký tự');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải chứa ít nhất một chữ cái và một số');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        try {
            await updateUserPassword(currentPassword, newPassword);
            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật mật khẩu');
            console.error('Error updating password:', error);
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Mật khẩu hiện tại:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <Text style={styles.label}>Mật khẩu mới:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={commonStyles.button} onPress={handleUpdatePassword}>
                    <Text style={commonStyles.buttonText}>Cập nhật mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    form: {
        width: '100%',
        padding: 20,
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
});

export default UpdatePassword;