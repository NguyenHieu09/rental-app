// // // ChatScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { fetchAllConversations } from '../../../api/api';
// import { IConversation } from '../../../types/chat';
// import { RootStackParamList } from '../../../types/navigation';


// const ChatScreen: React.FC = () => {
//     const [conversations, setConversations] = useState<IConversation[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//     useEffect(() => {
//         const loadConversations = async () => {
//             try {
//                 const data = await fetchAllConversations();
//                 console.log('Conversations:', data);

//                 setConversations(data);
//             } catch (error) {
//                 console.error('Error loading conversations:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadConversations();
//     }, []);

//     const renderConversation = ({ item }: { item: IConversation }) => (
//         <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { conversation: item })}>
//             <View style={styles.conversationContainer}>
//                 <Text style={styles.conversationTitle}>
//                     {item.participants.map((p) => p.name).join(', ')}
//                 </Text>
//                 <Text style={styles.conversationLastMessage}>
//                     {item.chats[item.chats.length - 1]?.message || 'No messages'}
//                 </Text>
//             </View>
//         </TouchableOpacity>
//     );

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={conversations}
//                 renderItem={renderConversation}
//                 keyExtractor={(item) => item.conversationId}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     conversationContainer: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     conversationTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     conversationLastMessage: {
//         fontSize: 14,
//         color: '#555',
//     },
// });

// export default ChatScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllConversations } from '../../../api/api';
import { IConversation } from '../../../types/chat';
import { RootStackParamList } from '../../../types/navigation';
import { RootState } from '../../../redux-toolkit/store';
import { useSelector } from 'react-redux';

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

    const renderConversation = ({ item }: { item: IConversation }) => {
        const lastMessage = item.chats[item.chats.length - 1]?.message || 'No messages';
        const lastMessageTime = item.updatedAt; // Format this date as needed

        // Find the participant whose userId is different from the current user's userId
        const otherParticipant = item.participants.find(p => p.userId !== user?.userId);

        if (!otherParticipant) {
            return null; // or render a placeholder
        }

        const avatarUrl = otherParticipant.avatar || 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { conversation: item })}>
                <View style={styles.conversationContainer}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.conversationTitle}>
                            {otherParticipant.name || 'Unknown'}
                        </Text>
                        <Text style={styles.conversationLastMessage} numberOfLines={1}>
                            {lastMessage}
                        </Text>
                    </View>
                    <Text style={styles.time}>{lastMessageTime}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading || !user) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
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