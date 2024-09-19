import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        // Xử lý đăng nhập ở đây  
        Alert.alert('Đăng nhập', 'Đăng nhập thành công!');
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.subtitle}>Vui lòng nhập thông tin đăng nhập của bạn.</Text>
            </View>
            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>Hoặc</Text>

            <TextInput
                style={styles.input}
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu', 'Chuyển đến trang quên mật khẩu!')}>
                <Text style={styles.link}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 20,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    button: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        // color: '#fff',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    loginText: {
        color: '#fff',
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;