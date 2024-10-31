// ChatScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button } from 'react-native';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'friend';
}

const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMessage: Message = {
                id: Math.random().toString(), // Tạo ID ngẫu nhiên cho tin nhắn
                text: inputText,
                sender: 'user',
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputText('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.friendMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    userMessage: {
        backgroundColor: '#DCF8C6', // Màu nền cho tin nhắn của người dùng
        alignSelf: 'flex-end', // Đẩy sang bên phải
    },
    friendMessage: {
        backgroundColor: '#E5E5EA', // Màu nền cho tin nhắn của bạn bè
        alignSelf: 'flex-start', // Đẩy sang bên trái
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default ChatScreen;
