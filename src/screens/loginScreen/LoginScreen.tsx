import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../redux-toolkit/slices/userSlice';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { COLORS, commonStyles } from '../../styles/theme';
import { RootStackParamList } from '../../types/navigation';
import FormLabel from '../../components/form/FormLabel';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, user, errorDetails } = useSelector(
        (state: RootState) => state.user,
    );
    const [errors, setErrors] = useState<{
        email: string;
        password: string;
    }>({ email, password });

    useEffect(() => {
        const emailError = errorDetails.find((item) => item.field === 'email');
        const passwordError = errorDetails.find(
            (item) => item.field === 'password',
        );

        setErrors({
            email: emailError ? emailError.error : '',
            password: passwordError ? passwordError.error : '',
        });
    }, [errorDetails]);

    useEffect(() => {
        console.log('User state updated:', user);
        if (user && Array.isArray(user.userTypes)) {
            if (user.userTypes.includes('owner')) {
                navigation.navigate('OwnerTabs');
            } else if (user.userTypes.includes('renter')) {
                navigation.navigate('RenterTabs');
            }
        }
    }, [user, navigation]);

    const handleLogin = async () => {
        const emailData = email.trim();
        const passwordData = password.trim();

        try {
            await dispatch(
                loginUserAsync({ email: emailData, password: passwordData }),
            ).unwrap();

            setEmail('');
            setPassword('');
            setErrors({ email: '', password: '' });
            Alert.alert('Đăng nhập', 'Đăng nhập thành công!');
        } catch (err) {
            console.error('Login failed:', err);

            setEmail(emailData);
            setPassword(passwordData);
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Image
                    source={require('../../../assets/img/logo.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.subtitle}>
                    Vui lòng nhập thông tin đăng nhập của bạn.
                </Text>
            </View>
            {/* <View style={styles.socialButtons}>
                <TouchableOpacity
                    style={styles.socialButton}
                    activeOpacity={0.7}
                >
                    <IconFill
                        name='facebook'
                        size={24}
                        color={COLORS.primary}
                    />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    activeOpacity={0.7}
                >
                    <IconOutline
                        name='google'
                        size={24}
                        color={COLORS.primary}
                    />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>Hoặc</Text> */}

            <FormLabel isError={Boolean(errors.email)}>Email</FormLabel>
            <TextInput
                style={commonStyles.input}
                placeholder='m@example.com'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <FormLabel isError={Boolean(errors.password)}>Mật khẩu</FormLabel>
            <TextInput
                style={commonStyles.input}
                placeholder='Nhập mật khẩu của bạn'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
                style={commonStyles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color='#fff' />
                ) : (
                    <Text style={commonStyles.buttonText}>Đăng nhập</Text>
                )}
            </TouchableOpacity>

            {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    Alert.alert(
                        'Quên mật khẩu',
                        'Chuyển đến trang quên mật khẩu!',
                    )
                }
            >
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
        // color: 'blue',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    errorText: {
        fontWeight: 500,
        fontSize: 13,
        color: 'red',
        marginBottom: 15,
    },
});

export default LoginScreen;
