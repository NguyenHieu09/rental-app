// theme.ts
import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#000',
    secondary: '#fff',
    accent: '#f0f0f0',
    text: '#333',
    buttonBackground: '#007BFF',
    buttonText: '#fff',
    error: '#ff4d4f',
};

export const FONTS = {
    regular: 'System',
    bold: 'System-Bold',
};

export const SIZES = {
    base: 10,
    font: 14,
    radius: 5,
    padding: 8,
};

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        justifyContent: 'center' as 'center',
        backgroundColor: COLORS.secondary,
    },
    header: {
        alignItems: 'center' as 'center',
        marginBottom: SIZES.base * 2,
    },
    input: {
        height: 45,
        borderColor: COLORS.text,
        borderWidth: 1,
        marginBottom: SIZES.base,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
    },
    antInput: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#d9d9d9',
        borderStyle: 'solid',
        backgroundColor: '#fff',
        paddingHorizontal: 11,
        paddingVertical: 4,
    },
    button: {
        backgroundColor: COLORS.buttonBackground,
        paddingVertical: SIZES.base * 1.5,
        alignItems: 'center' as 'center',
        borderRadius: SIZES.radius,
        marginBottom: SIZES.base * 1.5,
    },
    buttonText: {
        color: COLORS.buttonText,
        fontWeight: 'bold' as 'bold',
    },
    errorColor: {
        color: COLORS.error,
    },
    h5: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 19,
        marginBottom: 8,
    },
    fw600: {
        fontWeight: '600',
    },
    flex1: {
        flex: 1,
    },
});
