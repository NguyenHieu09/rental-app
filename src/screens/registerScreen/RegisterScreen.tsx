import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { RadioButton } from 'react-native-paper';
import { commonStyles, COLORS } from '../../styles/theme';
import axios from 'axios';
import { API_URL } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { registerUserAsync } from '../../redux-toolkit/slices/userSlice';
import { validateName, validateEmail, validatePassword, validateOtp, validateUserType, validateInputs } from '../../utils/validation';


interface ErrorState {
    name: string | null;
    email: string | null;
    password: string | null;
    otp: string | null;
    userType: string | null;
}

const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Người thuê');
    const [otp, setOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.user);
    const [errors, setErrors] = useState<ErrorState>({
        name: null,
        email: null,
        password: null,
        otp: null,
        userType: null,
    });

    const handleNameChange = (value: string) => {
        setName(value);
        setErrors(prevErrors => ({ ...prevErrors, name: validateName(value) }));
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setErrors(prevErrors => ({ ...prevErrors, email: validateEmail(value) }));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setErrors(prevErrors => ({ ...prevErrors, password: validatePassword(value) }));
    };

    const handleOtpChange = (value: string) => {
        setOtp(value);
        setErrors(prevErrors => ({ ...prevErrors, otp: validateOtp(value) }));
    };

    const handleUserTypeChange = (value: string) => {
        setUserType(value);
        setErrors(prevErrors => ({ ...prevErrors, userType: validateUserType(value) }));
    };

    const handleRegister = async () => {
        setErrors({
            name: null,
            email: null,
            password: null,
            otp: null,
            userType: null,
        });

        const validationErrors = validateInputs(name, email, password, otp, userType);
        if (Object.values(validationErrors).some(error => error !== null)) {
            setErrors(validationErrors);
            return;
        }

        console.log('Starting registration with:', {
            name,
            email,
            password,
            userType: userType === 'Người thuê' ? 'renter' : 'owner',
            otp,
        });

        try {
            const resultAction = await dispatch(registerUserAsync({
                name,
                email,
                password,
                userType: userType === 'Người thuê' ? 'renter' : 'owner',
                otp,
            })).unwrap();
            console.log(resultAction);

            Alert.alert('Đăng ký', 'Đăng ký thành công!');

            // Chuyển hướng đến trang Dashboard tương ứng
            if (userType === 'Chủ nhà') {
                navigation.navigate('DashboardOwner');
            } else if (userType === 'Người thuê') {
                navigation.navigate('DashboardRenter');
            }
        } catch (err) {
            console.error('Registration failed:', err);

            let errorMessage = 'Đã xảy ra lỗi, vui lòng thử lại.';
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
                errorMessage = (err as any).message;
            }

            Alert.alert('Đăng ký thất bại', errorMessage);
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
        setErrors({
            name: null,
            email: null,
            password: null,
            otp: null,
            userType: null,
        });

        try {
            const response = await axios.post(`${API_URL}/estate-manager-service/auth/register/otp`, {
                email
            });

            if (response.status === 200) {
                Alert.alert('OTP', 'Mã OTP đã được gửi!');
            } else {
                setErrors(prevErrors => ({ ...prevErrors, otp: response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại.' }));
                console.log('OTP error:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('OTP Axios error:', error.response?.data);
                setErrors(prevErrors => ({ ...prevErrors, otp: error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.' }));
            } else {
                console.error('OTP unknown error:', error);
                setErrors(prevErrors => ({ ...prevErrors, otp: 'Đã xảy ra lỗi, vui lòng thử lại.' }));
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
                onChangeText={handleNameChange}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
                style={commonStyles.input}
                placeholder="m@example.com"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
                style={commonStyles.input}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.userTypeContainer}>
                <Text>Loại tài khoản:</Text>
                <RadioButton.Group onValueChange={handleUserTypeChange} value={userType}>
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
            {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}

            <View style={styles.otpContainer}>
                <TextInput
                    style={styles.otpInput}
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChangeText={handleOtpChange}
                />
                <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp} disabled={otpLoading}>
                    {otpLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={commonStyles.buttonText}>Lấy mã OTP</Text>
                    )}
                </TouchableOpacity>
            </View>
            {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

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
        // textAlign: 'center',
        marginBottom: 15,
        marginTop: -5,
    },
});

export default RegisterScreen;