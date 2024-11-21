// components/ChatButton.tsx  
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Bạn có thể thay đổi biểu tượng  

interface ChatButtonProps {
    onPress: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name="chat-bubble" size={24} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF', // Màu xanh dương  
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5, // Đổ bóng trên Android  
        shadowColor: '#000', // Đổ bóng trên iOS  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default ChatButton;