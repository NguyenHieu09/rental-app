import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IChat, IConversation, IMediaType } from '../../types/chat';
import moment from 'moment';
import { RootState } from '../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import VideoPlayer from './VideoPlayer';
import FileComponent from './FileComponent';

type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetail'>;

const ChatDetail: React.FC = () => {
    const route = useRoute<ChatDetailRouteProp>();
    const navigation = useNavigation();
    const { conversation } = route.params;
    const [inputText, setInputText] = useState<string>('');
    const [selectedConversation, setSelectedConversation] = useState<IConversation>(conversation);
    const user = useSelector((state: RootState) => state.user.user);

    const flatListRef = useRef<FlatList<IChat>>(null);

    useEffect(() => {
        const friend = conversation.participants.find(p => p.userId !== user?.userId);
        const defaultAvatar = 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
        if (friend) {
            navigation.setOptions({
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: friend.avatar || defaultAvatar }} style={styles.avatar} />
                        <Text style={styles.headerTitle}>{friend.name}</Text>
                    </View>
                ),
            });
        }
    }, [conversation, user, navigation]);

    useEffect(() => {
        if (selectedConversation.chats.length > 0) {
            flatListRef.current?.scrollToIndex({
                index: selectedConversation.chats.length - 1,
                animated: true,
            });
        }
    }, [selectedConversation.chats]);

    const handleSend = () => {
        if (inputText.trim().length > 0 && user) {
            const newMessage: IChat = {
                chatId: Math.random().toString(),
                senderId: user.userId,
                message: inputText,
                medias: [],
                savedBy: [],
                deletedBy: [],
                status: 'RECEIVED',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setSelectedConversation((prevConversation) => ({
                ...prevConversation,
                chats: [...prevConversation.chats, newMessage].sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                ),
            }));
            setInputText('');
        }
    };

    const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
        const showTimestamp = index === 0 ||
            moment(item.createdAt).diff(moment(selectedConversation.chats[index - 1].createdAt), 'minutes') > 5;

        const renderMedia = (media: IMediaType) => {
            if (media.type.startsWith('image/')) {
                return <Image source={{ uri: media.url }} style={styles.mediaImage} />;
            } else if (media.type.startsWith('video/')) {
                return <VideoPlayer videoUrl={media.url} />;
            } else {
                return (
                    <FileComponent
                        fileName={media.name}
                        fileUri={media.url}
                    />
                );
            }
        };

        return (
            <View>
                {showTimestamp && (
                    <Text style={styles.timestamp}>
                        {moment(item.createdAt).format('hh:mm A')}
                    </Text>
                )}
                <View style={[
                    styles.messageContainer,
                    item.senderId === user?.userId ? styles.userMessage : styles.friendMessage,
                    item.message ? styles.textMessage : null
                ]}>
                    {item.message && item.message.length > 0 && (
                        <View>
                            <Text style={[
                                styles.messageText,
                                item.senderId === user?.userId && styles.userMessageText
                            ]}>
                                {item.message}
                            </Text>
                        </View>
                    )}
                    {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
                        <View key={media.key} style={styles.mediaContainer}>
                            {renderMedia(media)}
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={selectedConversation.chats}
                renderItem={renderMessage}
                keyExtractor={(item) => item.chatId}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                getItemLayout={(_, index) => ({ length: 80, offset: 80 * index, index })}
                onScrollToIndexFailed={(info) => {
                    flatListRef.current?.scrollToOffset({
                        offset: info.averageItemLength * info.index,
                        animated: true,
                    });
                }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    placeholderTextColor="#888"
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
        backgroundColor: '#f5f5f5',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    friendMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    textMessage: {
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    timestamp: {
        alignSelf: 'center',
        marginBottom: 5,
        color: '#888',
        fontSize: 12,
    },
    userMessageText: {
        // color: 'blue',
    },
    mediaContainer: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    mediaImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    mediaVideo: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    mediaText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default ChatDetail;
