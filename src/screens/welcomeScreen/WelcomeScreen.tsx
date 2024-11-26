import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types/navigation';

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleStart = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/img/logo.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Chào mừng đến với</Text>
            <Text style={styles.title}>SmartRent</Text>
            <Text style={styles.subtitle}>
                Hãy để chúng tôi đồng hành cùng bạn
            </Text>
            <Text style={styles.footer}>
                trong hành trình tìm kiếm tổ ấm của mình.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Bắt đầu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F7FF',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        // marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
    },
    footer: {
        fontSize: 14,
        color: '#4A4A4A',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
