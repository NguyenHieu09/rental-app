// UpdatePassword.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        // Call API to update password
        // Example:
        // updatePassword(currentPassword, newPassword)
        //     .then(() => Alert.alert('Thành công', 'Mật khẩu đã được cập nhật'))
        //     .catch((error) => Alert.alert('Lỗi', 'Không thể cập nhật mật khẩu'));

        Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
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