import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { fetchAllConversations } from '../../../api/api';
import { IConversation } from '../../../types/chat';
import { RootStackParamList } from '../../../types/navigation';
import { RootState } from '../../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen: React.FC = () => {
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const loadConversations = async () => {
            try {
                const data = await fetchAllConversations();
                console.log('Conversations:', data);
                setConversations(data);
            } catch (error) {
                console.error('Error loading conversations:', error);
            } finally {
                setLoading(false);
            }
        };

        loadConversations();
    }, []);

    const getLastMessageText = (lastMessage: any) => {
        if (lastMessage.message) {
            return lastMessage.message;
        } else if (lastMessage.medias && lastMessage.medias.length > 0) {
            const mediaType = lastMessage.medias[0].type;
            if (mediaType.startsWith('image/')) {
                return '[hình ảnh]';
            } else if (mediaType.startsWith('video/')) {
                return '[video]';
            } else {
                return '[tiệp tin]';
            }
        } else {
            return '';
        }
    };

    const formatTime = (timestamp: string) => {
        const messageDate = new Date(timestamp);
        const today = new Date();

        const isToday =
            messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear();

        if (isToday) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(messageDate);
        }
    };

    const renderConversation = ({ item }: { item: IConversation }) => {
        const lastMessage = item.chats[item.chats.length - 1];
        const lastMessageText = getLastMessageText(lastMessage);
        const lastMessageTime = formatTime(item.updatedAt);

        const otherParticipant = item.participants.find(p => p.userId !== user?.userId);

        if (!otherParticipant) {
            return null;
        }

        const avatarUrl = otherParticipant.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { conversation: item })}>
                <View style={styles.conversationContainer}>
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                    <View style={styles.textContainer}>
                        <Text style={styles.conversationTitle}>
                            {otherParticipant.name || 'Unknown'}
                        </Text>
                        <Text style={styles.conversationLastMessage} numberOfLines={1}>
                            {lastMessageText}
                        </Text>
                    </View>
                    <Text style={styles.time}>{lastMessageTime}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading || !user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={conversations}
                renderItem={renderConversation}
                keyExtractor={(item) => item.conversationId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    conversationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    conversationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    conversationLastMessage: {
        fontSize: 14,
        color: '#666',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
});

export default ChatScreen;
