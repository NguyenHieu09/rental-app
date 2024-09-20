// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../types/navigation';
// import { RadioButton } from 'react-native-paper';

// const RegisterScreen: React.FC = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [accountType, setAccountType] = useState('Người thuê');
//     const [otp, setOtp] = useState('');
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//     const handleRegister = () => {
//         // Xử lý đăng ký ở đây  
//         Alert.alert('Đăng ký', 'Đăng ký thành công!');
//     };

//     const handleLoginNavigation = () => {
//         navigation.navigate('Login');
//     };

//     const handleGetOtp = () => {
//         Alert.alert('OTP', 'Mã OTP đã được gửi!');
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.title}>Đăng ký</Text>
//                 <Text style={styles.subtitle}>Nhập thông tin của bạn để tạo tài khoản.</Text>

//             </View>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Nhập họ tên của bạn"
//                 value={fullName}
//                 onChangeText={setFullName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="m@example.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nhập mật khẩu của bạn"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//             />

//             <View style={styles.accountTypeContainer}>
//                 <Text>Loại tài khoản:</Text>
//                 <RadioButton.Group onValueChange={value => setAccountType(value)} value={accountType}>
//                     <View style={styles.radioButtonRow}>
//                         <View style={styles.radioButtonContainer}>
//                             <RadioButton value="Người thuê" />
//                             <Text style={styles.radioButtonLabel}>Người thuê</Text>
//                         </View>
//                         <View style={styles.radioButtonContainer}>
//                             <RadioButton value="Chủ nhà" />
//                             <Text style={styles.radioButtonLabel}>Chủ nhà</Text>
//                         </View>
//                     </View>
//                 </RadioButton.Group>
//             </View>

//             <View style={styles.otpContainer}>
//                 <TextInput
//                     style={[styles.otpInput]}
//                     placeholder="Nhập mã OTP"
//                     value={otp}
//                     onChangeText={setOtp}
//                 />
//                 <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp}>
//                     <Text style={styles.buttonText}>Lấy mã OTP</Text>
//                 </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
//                 <Text style={styles.buttonText}>Đăng ký</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={handleLoginNavigation}>
//                 <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//     },
//     header: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     subtitle: {
//         marginBottom: 20,
//     },
//     input: {
//         height: 45, // Adjust the height as needed
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 15,
//         paddingHorizontal: 10,
//     },
//     otpInput: {
//         flex: 2,
//         marginRight: 10,
//         height: 45, // Adjust the height as needed
//         borderColor: '#ccc',
//         borderWidth: 1,
//         paddingHorizontal: 10,
//     },
//     otpContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     otpButton: {
//         height: 45,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#000',
//         paddingHorizontal: 15,
//         borderRadius: 5,
//     },
//     registerButton: {
//         backgroundColor: '#000',
//         paddingVertical: 15,
//         alignItems: 'center',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     accountTypeContainer: {
//         marginBottom: 15,
//     },
//     radioButtonRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     radioButtonContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20,
//     },
//     radioButtonLabel: {
//         marginLeft: 8,
//     },
//     link: {
//         marginTop: 20,
//         color: 'blue',
//         textAlign: 'center',
//     },
// });

// export default RegisterScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { RadioButton } from 'react-native-paper';
import { commonStyles, COLORS } from '../../styles/theme';

const RegisterScreen: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('Người thuê');
    const [otp, setOtp] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleRegister = () => {
        // Xử lý đăng ký ở đây  
        Alert.alert('Đăng ký', 'Đăng ký thành công!');
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
    };

    const handleGetOtp = () => {
        Alert.alert('OTP', 'Mã OTP đã được gửi!');
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
                value={fullName}
                onChangeText={setFullName}
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

            <View style={styles.accountTypeContainer}>
                <Text>Loại tài khoản:</Text>
                <RadioButton.Group onValueChange={value => setAccountType(value)} value={accountType}>
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
                <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp}>
                    <Text style={commonStyles.buttonText}>Lấy mã OTP</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={commonStyles.buttonText}>Đăng ký</Text>
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
    accountTypeContainer: {
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
});

export default RegisterScreen;