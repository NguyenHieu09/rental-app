import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { RadioButton } from 'react-native-paper';
import { commonStyles, COLORS } from '../../styles/theme';
import axios from 'axios';
import { API_URL } from '@env';

const RegisterScreen: React.FC = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setuserType] = useState('Người thuê');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleRegister = async () => {
        if (!name || !email || !password || !otp) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        setLoading(true);
        setError(null);

        console.log('Starting registration with:', {
            name,
            email,
            password,
            userType: userType === 'Người thuê' ? 'renter' : 'owner',
            otp,
        });

        try {
            const response = await axios.post(`${API_URL}/estate-manager-service/auth/register`, {
                name,
                email,
                password,
                userType: userType === 'Người thuê' ? 'renter' : 'owner',
                otp,
            });

            console.log('Registration response:', response);

            if (response.status === 200) {
                Alert.alert('Đăng ký', 'Đăng ký thành công!');
                navigation.navigate('Login');
            } else {
                setError(response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
                console.log('Registration error:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration Axios error:', error.response?.data);
                setError(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
            } else {
                console.error('Registration unknown error:', error);
                setError('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
            console.log('Registration process finished');
        }
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
    };

    const handleGetOtp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ họ tên, email và mật khẩu.');
            return;
        }

        setOtpLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/estate-manager-service/auth/register/otp`, {
                email
            });

            if (response.status === 200) {
                Alert.alert('OTP', 'Mã OTP đã được gửi!');
            } else {
                setError(response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
                console.log('OTP error:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('OTP Axios error:', error.response?.data);
                setError(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
            } else {
                console.error('OTP unknown error:', error);
                setError('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        } finally {
            setOtpLoading(false);
        }
    };
    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.subtitle}>Nhập thông tin của bạn để tạo tài khoản.</Text>
            </View>

            <TextInput
                style={commonStyles.input}
                placeholder="Nhập họ tên của bạn"
                value={name}
                onChangeText={setname}
            />
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

            <View style={styles.userTypeContainer}>
                <Text>Loại tài khoản:</Text>
                <RadioButton.Group onValueChange={value => setuserType(value)} value={userType}>
                    <View style={styles.radioButtonRow}>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton value="Người thuê" />
                            <Text style={styles.radioButtonLabel}>Người thuê</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton value="Chủ nhà" />
                            <Text style={styles.radioButtonLabel}>Chủ nhà</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>

            <View style={styles.otpContainer}>
                <TextInput
                    style={styles.otpInput}
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChangeText={setOtp}
                />
                <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp} disabled={otpLoading}>
                    {otpLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={commonStyles.buttonText}>Lấy mã OTP</Text>
                    )}
                </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={commonStyles.buttonText}>Đăng ký</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLoginNavigation}>
                <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
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
    subtitle: {
        marginBottom: 20,
        color: COLORS.text,
    },
    otpInput: {
        flex: 2,
        marginRight: 10,
        height: 45,
        borderColor: COLORS.text,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    otpButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.buttonBackground,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    registerButton: {
        backgroundColor: COLORS.buttonBackground,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    userTypeContainer: {
        marginBottom: 15,
    },
    radioButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioButtonLabel: {
        marginLeft: 8,
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

export default RegisterScreen;