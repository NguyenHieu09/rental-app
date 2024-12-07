import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatBotMessages, sendChatBotQuery } from '../../../api/chatbot';
import TypingIndicator from '../../../components/chatBot/TypingIndicator';
import {
    addChat,
    addChats,
    setLoading,
} from '../../../redux-toolkit/slices/chatBotSlice';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { IChatbot, IChatRequest, IChatResponse } from '../../../types/chatBot';
import { RootStackParamList } from '../../../types/navigation';

const ChatBotScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { chats, loading } = useSelector((state: RootState) => state.chatBot);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const flatListRef = useRef<FlatList<IChatbot>>(null);

    // Load initial chat messages
    const loadChatBotMessages = async () => {
        dispatch(setLoading(true));
        try {
            const data = await fetchChatBotMessages();
            const uniqueData = Array.from(
                new Map(data.map((item) => [item._id, item])).values(),
            );
            dispatch(addChats(uniqueData.reverse()));
        } catch (error) {
            console.error('Error loading chatbot messages:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Handle sending a new chat message
    const handleSend = async () => {
        if (inputText.trim() === '') return;

        const query: IChatRequest = { query: inputText };
        const newMessage: IChatResponse = {
            response: {
                _id: Date.now().toString(),
                query: inputText,
                result: '',
                source_documents: [],
            },
        };

        // Add new message immediately
        dispatch(addChat(newMessage));
        setInputText('');
        setIsTyping(true);

        // Scroll to the latest message
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });

        try {
            const response = await sendChatBotQuery(query);

            const filteredResponse: IChatResponse = {
                response: {
                    ...response.response,
                    query: '',
                },
            };

            dispatch(addChat(filteredResponse));
        } catch (error) {
            console.error('Error sending chatbot query:', error);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [chats]);

    useEffect(() => {
        loadChatBotMessages();
    }, [dispatch]);

    useFocusEffect(() => flatListRef.current?.scrollToEnd({ animated: true }));

    const renderMessage = ({ item }: { item: IChatbot }) => (
        <View style={styles.messageContainer}>
            {/* Query */}
            {item.query && (
                <View style={[styles.messageBubble, styles.queryBubble]}>
                    <Text style={styles.queryText}>{item.query}</Text>
                </View>
            )}
            {/* Result */}
            {item.result && (
                <View style={[styles.messageBubble, styles.resultBubble]}>
                    <Text style={styles.resultText}>{item.result}</Text>
                </View>
            )}
            {/* Source Documents */}
            {item.source_documents.map((doc, idx) => (
                <TouchableOpacity
                    key={`${item._id}-${idx}`}
                    onPress={() =>
                        navigation.navigate('PropertyScreen', {
                            slug: doc.slug,
                        })
                    }
                    style={[styles.sourceDocContainer, styles.messageBubble]}
                >
                    {doc.images?.[0] && (
                        <Image
                            source={{ uri: doc.images[0] }}
                            style={styles.image}
                        />
                    )}
                    <Text style={[styles.messageText, { fontSize: 16 }]}>
                        {doc.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={chats.map((chat) => chat.response)}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.chatList}
            />
            {isTyping && <TypingIndicator />}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder='Nhập tin nhắn...'
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        { opacity: inputText.trim() === '' ? 0.4 : 1 },
                    ]}
                    onPress={handleSend}
                    disabled={inputText.trim() === ''}
                >
                    <Feather name='send' size={24} color='#007AFF' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    chatList: { padding: 10 },
    messageContainer: {
        marginVertical: 5,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
        marginVertical: 5,
    },
    queryBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    resultBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
    },
    queryText: { color: 'black', fontSize: 16 },
    resultText: { color: 'black', fontSize: 16 },
    sourceDocContainer: {
        marginTop: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sourceDocText: { color: '#888' },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typingIndicatorContainer: {
        padding: 10,
        alignItems: 'center',
    },
    typingIndicatorText: {
        fontSize: 14,
        color: '#888',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },
    sendButton: { padding: 5 },
    uploadButton: { padding: 5 },
    messageText: { fontSize: 14, fontWeight: '500' },
});

export default ChatBotScreen;
