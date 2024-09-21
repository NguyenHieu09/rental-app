import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../types/navigation';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { commonStyles, COLORS } from '../../styles/theme';
import { loginUserAsync } from '../../redux-toolkit/slices/userSlice';
import { RootState, AppDispatch } from '../../redux-toolkit/store';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log('User state updated:', user);
        if (user && Array.isArray(user.userTypes)) {
            if (user.userTypes.includes('owner')) {
                navigation.navigate('DashboardOwner');
            } else if (user.userTypes.includes('renter')) {
                navigation.navigate('DashboardRenter');
            }
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            await dispatch(loginUserAsync({ email, password })).unwrap();
            Alert.alert('Đăng nhập', 'Đăng nhập thành công!');
        } catch (err) {
            console.error('Login failed:', err);

            let errorMessage = 'Đã xảy ra lỗi, vui lòng thử lại.';
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
                errorMessage = (err as any).message;
            }

            Alert.alert('Đăng nhập thất bại', errorMessage);
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Image
                    source={require('../../../assets/img/2.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.subtitle}>Vui lòng nhập thông tin đăng nhập của bạn.</Text>
            </View>
            <View style={styles.socialButtons}>
                <TouchableOpacity
                    style={styles.socialButton}
                    activeOpacity={0.7}
                >
                    <IconFill name="facebook" size={24} color={COLORS.primary} />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    activeOpacity={0.7}
                >
                    <IconOutline name="google" size={24} color={COLORS.primary} />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>Hoặc</Text>

            <TextInput
                style={commonStyles.input}
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={commonStyles.input}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={commonStyles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={commonStyles.buttonText}>Đăng nhập</Text>
                )}
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.primary,
    },
    image: {
        width: 100,
        height: 100,
    },
    subtitle: {
        marginBottom: 20,
        color: COLORS.text,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    socialButton: {
        flex: 1,
        backgroundColor: COLORS.accent,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    socialButtonText: {
        fontWeight: 'bold',
        marginLeft: 10,
        color: COLORS.primary,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: COLORS.text,
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default LoginScreen;