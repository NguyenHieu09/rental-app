import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IChat, IConversation } from '../../types/chat';

type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetail'>;

const ChatDetail: React.FC = () => {
    const route = useRoute<ChatDetailRouteProp>();
    const { conversation } = route.params;
    const [inputText, setInputText] = useState<string>('');
    const [selectedConversation, setSelectedConversation] = useState<IConversation>(conversation);

    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMessage: IChat = {
                chatId: Math.random().toString(), // Tạo ID ngẫu nhiên cho tin nhắn
                senderId: 'user', // Replace with actual user ID
                message: inputText,
                medias: [],
                savedBy: [],
                deletedBy: [],
                status: 'RECEIVED', // Use a valid status from ChatStatus
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setSelectedConversation((prevConversation) => {
                return {
                    ...prevConversation,
                    chats: [...prevConversation.chats, newMessage],
                };
            });
            setInputText('');
        }
    };

    const renderMessage = ({ item }: { item: IChat }) => (
        <View style={[styles.messageContainer, item.senderId === 'user' ? styles.userMessage : styles.friendMessage]}>
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={selectedConversation.chats}
                renderItem={renderMessage}
                keyExtractor={(item) => item.chatId}
                inverted // Đảo ngược danh sách để mới nhất ở dưới cùng
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

export default ChatDetail;