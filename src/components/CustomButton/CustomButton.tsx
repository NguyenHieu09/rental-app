// CustomButton.tsx  
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    imageSource: any;
    label: string;
    onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ imageSource, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00BFFF',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
});

export default CustomButton;