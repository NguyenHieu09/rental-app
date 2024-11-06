// // import React, { useState, useEffect, useRef } from 'react';
// // import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// // import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
// // import { RootStackParamList } from '../../types/navigation';
// // import { IChat, IConversation, IMediaType, ChatStatus } from '../../types/chat';
// // import moment from 'moment';
// // import { AppDispatch, RootState } from '../../redux-toolkit/store';
// // import { useSelector, useDispatch } from 'react-redux';
// // import VideoPlayer from './VideoPlayer';
// // import FileComponent from './FileComponent';
// // import ChatInput from './ChatInput';
// // import { socket } from '../../redux-toolkit/slices/socketSlice';
// // import { IConversationSocket, IReadConversationSocket } from '../../types/conversation';
// // import { addChat } from '../../redux-toolkit/slices/chatSlice';
// // import { readConversation } from '../../redux-toolkit/slices/conversationSlice';

// // const ChatDetail: React.FC = () => {
// //     const navigation = useNavigation();
// //     const selectedConversation = useSelector((state: RootState) => state.conversations.selectedConversation);
// //     const [inputText, setInputText] = useState<string>('');
// //     const user = useSelector((state: RootState) => state.user.user);
// //     const chats = selectedConversation?.chats || [];
// //     const dispatch = useDispatch<AppDispatch>();
// //     const flatListRef = useRef<FlatList<IChat>>(null);

// //     useEffect(() => {
// //         const friend = selectedConversation?.participants.find(p => p.userId !== user?.userId);
// //         const defaultAvatar = 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
// //         if (friend) {
// //             navigation.setOptions({
// //                 headerTitle: () => (
// //                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
// //                         <Image source={{ uri: friend.avatar || defaultAvatar }} style={styles.avatar} />
// //                         <Text style={styles.headerTitle}>{friend.name}</Text>
// //                     </View>
// //                 ),
// //             });
// //         }
// //     }, [selectedConversation, user, navigation]);

// //     useFocusEffect(
// //         React.useCallback(() => {
// //             if (selectedConversation && user) {
// //                 const lastChat = selectedConversation.chats[selectedConversation.chats.length - 1];
// //                 if (lastChat && lastChat.senderId !== user.userId && lastChat.status !== 'READ') {
// //                     socket.emit('read-conversation', {
// //                         conversationId: selectedConversation.conversationId,
// //                         chatId: lastChat.chatId,
// //                         userId: user.userId,
// //                         time: new Date().toISOString(),
// //                     });
// //                     const readData: IReadConversationSocket = {
// //                         conversationId: selectedConversation.conversationId,
// //                         chatId: lastChat.chatId,
// //                         userId: user.userId,
// //                         time: new Date().toISOString(),
// //                     };
// //                     dispatch(readConversation(readData));
// //                 }
// //             }
// //         }, [selectedConversation, user, dispatch])
// //     );

// //     const handleSend = () => {
// //         if (inputText.trim().length === 0 || !user) {
// //             return;
// //         }

// //         const newMessage: IChat = {
// //             chatId: Math.random().toString(),
// //             senderId: user.userId,
// //             message: inputText,
// //             medias: [],
// //             savedBy: [],
// //             deletedBy: [],
// //             status: 'RECEIVED',
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //         };

// //         const receiver = selectedConversation?.participants.find(p => p.userId !== user.userId);
// //         if (!receiver) {
// //             console.error("Receiver is undefined");
// //             return;
// //         }

// //         const socketData = {
// //             sender: {
// //                 userId: user.userId,
// //                 name: user.name,
// //                 avatar: user.avatar,
// //             },
// //             receiver,
// //             message: inputText,
// //             medias: [],
// //             createdAt: new Date().toISOString(),
// //             chatId: newMessage.chatId,
// //         };

// //         socket.emit('receive-message', socketData);

// //         setInputText('');
// //     };

// //     const getChatStatusText = (status: ChatStatus) => {
// //         if (status === 'RECEIVED') return 'Đã nhận';
// //         if (status === 'READ') return 'Đã đọc';
// //         return 'Không xác định';
// //     };

// //     const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
// //         const showTimestamp = index === 0 ||
// //             moment(item.createdAt).diff(moment(chats[index - 1]?.createdAt), 'minutes') > 5;

// //         const renderMedia = (media: IMediaType) => {
// //             if (media.type.startsWith('image/')) {
// //                 return <Image source={{ uri: media.url }} style={styles.mediaImage} />;
// //             } else if (media.type.startsWith('video/')) {
// //                 return <VideoPlayer videoUrl={media.url} />;
// //             } else {
// //                 return (
// //                     <FileComponent
// //                         fileName={media.name}
// //                         fileUri={media.url}
// //                     />
// //                 );
// //             }
// //         };

// //         const isLastMessage = index === chats.length - 1;

// //         return (
// //             <View>
// //                 {showTimestamp && (
// //                     <Text style={styles.timestamp}>
// //                         {moment(item.createdAt).format('hh:mm A')}
// //                     </Text>
// //                 )}
// //                 <View style={[styles.messageContainer, item.senderId === user?.userId ? styles.userMessage : styles.friendMessage]}>
// //                     {item.message && item.message.length > 0 && (
// //                         <View>
// //                             <Text style={[styles.messageText, item.senderId === user?.userId && styles.userMessageText]}>
// //                                 {item.message}
// //                             </Text>
// //                         </View>
// //                     )}
// //                     {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
// //                         <View key={media.key} style={styles.mediaContainer}>
// //                             {renderMedia(media)}
// //                         </View>
// //                     ))}
// //                     {isLastMessage && item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
// //                         <Text style={styles.messageStatus}>
// //                             {getChatStatusText(item.status)}
// //                         </Text>
// //                     )}
// //                 </View>
// //             </View>
// //         );
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <FlatList
// //                 ref={flatListRef}
// //                 data={chats}
// //                 renderItem={renderMessage}
// //                 keyExtractor={(item) => item.chatId}
// //                 contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
// //                 getItemLayout={(_, index) => ({ length: 80, offset: 80 * index, index })}
// //                 onScrollToIndexFailed={(info) => {
// //                     flatListRef.current?.scrollToOffset({
// //                         offset: info.averageItemLength * info.index,
// //                         animated: true,
// //                     });
// //                 }}
// //             />
// //             <ChatInput
// //                 inputText={inputText}
// //                 setInputText={setInputText}
// //                 handleSend={handleSend}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 10,
// //         backgroundColor: '#f5f5f5',
// //     },
// //     messageContainer: {
// //         marginVertical: 5,
// //         padding: 10,
// //         borderRadius: 10,
// //         maxWidth: '70%',
// //         backgroundColor: '#E5E5EA',
// //     },
// //     userMessage: {
// //         alignSelf: 'flex-end',
// //         borderBottomRightRadius: 0,
// //     },
// //     friendMessage: {
// //         alignSelf: 'flex-start',
// //         borderBottomLeftRadius: 0,
// //     },
// //     textMessage: {
// //         backgroundColor: '#E5E5EA',
// //     },
// //     messageText: {
// //         fontSize: 16,
// //     },
// //     timestamp: {
// //         alignSelf: 'center',
// //         marginBottom: 5,
// //         color: '#888',
// //         fontSize: 12,
// //     },
// //     mediaContainer: {
// //         marginVertical: 5,
// //         borderRadius: 10,
// //         overflow: 'hidden',
// //     },
// //     mediaImage: {
// //         width: 200,
// //         height: 200,
// //         borderRadius: 10,
// //     },
// //     messageStatus: {
// //         fontSize: 12,
// //         color: '#888',
// //         textAlign: 'right',
// //         marginTop: 5,
// //     },
// //     headerTitle: {
// //         fontSize: 14,
// //         fontWeight: '500',
// //     },
// //     avatar: {
// //         width: 40,
// //         height: 40,
// //         borderRadius: 20,
// //         marginRight: 10,
// //     },
// //     userMessageText: {

// //     }
// // });

// // export default ChatDetail;

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../types/navigation';
// import { IChat, IConversation, IMediaType, ChatStatus } from '../../types/chat';
// import moment from 'moment';
// import { AppDispatch, RootState } from '../../redux-toolkit/store';
// import { useSelector, useDispatch } from 'react-redux';
// import VideoPlayer from './VideoPlayer';
// import FileComponent from './FileComponent';
// import ChatInput from './ChatInput';
// import { socket } from '../../redux-toolkit/slices/socketSlice';
// import { IConversationSocket, IReadConversationSocket } from '../../types/conversation';
// import { addChat } from '../../redux-toolkit/slices/chatSlice';
// import { readConversation } from '../../redux-toolkit/slices/conversationSlice';

// const ChatDetail: React.FC = () => {
//     const navigation = useNavigation();
//     const selectedConversation = useSelector((state: RootState) => state.conversations.selectedConversation);
//     const [inputText, setInputText] = useState<string>('');
//     const user = useSelector((state: RootState) => state.user.user);
//     const chats = selectedConversation?.chats || [];
//     const dispatch = useDispatch<AppDispatch>();
//     const flatListRef = useRef<FlatList<IChat>>(null);

//     useEffect(() => {
//         const friend = selectedConversation?.participants.find(p => p.userId !== user?.userId);
//         const defaultAvatar = 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
//         if (friend) {
//             navigation.setOptions({
//                 headerTitle: () => (
//                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                         <Image source={{ uri: friend.avatar || defaultAvatar }} style={styles.avatar} />
//                         <Text style={styles.headerTitle}>{friend.name}</Text>
//                     </View>
//                 ),
//             });
//         }
//     }, [selectedConversation, user, navigation]);

//     useEffect(() => {
//         if (selectedConversation && user) {
//             const lastChat = selectedConversation.chats[selectedConversation.chats.length - 1];
//             if (lastChat && lastChat.senderId !== user.userId && lastChat.status !== 'READ') {
//                 socket.emit('read-conversation', {
//                     conversationId: selectedConversation.conversationId,
//                     chatId: lastChat.chatId,
//                     userId: user.userId,
//                     time: new Date().toISOString(),
//                 });
//                 const readData: IReadConversationSocket = {
//                     conversationId: selectedConversation.conversationId,
//                     chatId: lastChat.chatId,
//                     userId: user.userId,
//                     time: new Date().toISOString(),
//                 };
//                 dispatch(readConversation(readData));
//             }
//         }
//     }, [selectedConversation, user, dispatch]); // Chạy khi selectedConversation hoặc user thay đổi

//     const handleSend = () => {
//         if (inputText.trim().length === 0 || !user) {
//             return;
//         }

//         const newMessage: IChat = {
//             chatId: Math.random().toString(),
//             senderId: user.userId,
//             message: inputText,
//             medias: [],
//             savedBy: [],
//             deletedBy: [],
//             status: 'RECEIVED',
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//         };

//         const receiver = selectedConversation?.participants.find(p => p.userId !== user.userId);
//         if (!receiver) {
//             console.error("Receiver is undefined");
//             return;
//         }

//         const socketData = {
//             sender: {
//                 userId: user.userId,
//                 name: user.name,
//                 avatar: user.avatar,
//             },
//             receiver,
//             message: inputText,
//             medias: [],
//             createdAt: new Date().toISOString(),
//             chatId: newMessage.chatId,
//         };

//         socket.emit('receive-message', socketData);
//         // dispatch(addChat(newMessage)); // Cần thêm nếu muốn lưu tin nhắn mới vào Redux store

//         setInputText('');
//     };

//     const getChatStatusText = (status: ChatStatus) => {
//         if (status === 'RECEIVED') return 'Đã nhận';
//         if (status === 'READ') return 'Đã đọc';
//         return 'Không xác định';
//     };

//     const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
//         const showTimestamp = index === 0 ||
//             moment(item.createdAt).diff(moment(chats[index - 1]?.createdAt), 'minutes') > 5;

//         const renderMedia = (media: IMediaType) => {
//             if (media.type.startsWith('image/')) {
//                 return <Image source={{ uri: media.url }} style={styles.mediaImage} />;
//             } else if (media.type.startsWith('video/')) {
//                 return <VideoPlayer videoUrl={media.url} />;
//             } else {
//                 return (
//                     <FileComponent
//                         fileName={media.name}
//                         fileUri={media.url}
//                     />
//                 );
//             }
//         };

//         const isLastMessage = index === chats.length - 1;

//         return (
//             <View>
//                 {showTimestamp && (
//                     <Text style={styles.timestamp}>
//                         {moment(item.createdAt).format('HH:mm')}
//                     </Text>
//                 )}
//                 <View style={[styles.messageContainer, item.senderId === user?.userId ? styles.userMessage : styles.friendMessage]}>
//                     {item.message && item.message.length > 0 && (
//                         <View>
//                             <Text style={[styles.messageText, item.senderId === user?.userId && styles.userMessageText]}>
//                                 {item.message}
//                             </Text>
//                         </View>
//                     )}
//                     {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
//                         <View key={media.key} style={styles.mediaContainer}>
//                             {renderMedia(media)}
//                         </View>
//                     ))}
//                     {isLastMessage && item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
//                         <Text style={styles.messageStatus}>
//                             {getChatStatusText(item.status)}
//                         </Text>
//                     )}
//                 </View>
//             </View>
//         );
//     };


//     // const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
//     //     const showTimestamp = index === 0 ||
//     //         moment(item.createdAt).diff(moment(chats[index - 1]?.createdAt), 'minutes') > 5;

//     //     const renderMedia = (media: IMediaType) => {
//     //         if (media.type.startsWith('image/')) {
//     //             return <Image source={{ uri: media.url }} style={styles.mediaImage} />;
//     //         } else if (media.type.startsWith('video/')) {
//     //             return <VideoPlayer videoUrl={media.url} />;
//     //         } else {
//     //             return (
//     //                 <FileComponent
//     //                     fileName={media.name}
//     //                     fileUri={media.url}
//     //                 />
//     //             );
//     //         }
//     //     };

//     //     const isLastMessage = index === chats.length - 1;

//     //     return (
//     //         <View>
//     //             {showTimestamp && (
//     //                 <Text style={styles.timestamp}>
//     //                     {moment(item.createdAt).format('hh:mm A')}
//     //                 </Text>
//     //             )}
//     //             <View style={[styles.messageContainer, item.senderId === user?.userId ? styles.userMessage : styles.friendMessage]}>
//     //                 {item.message && item.message.length > 0 && (
//     //                     <View>
//     //                         <Text style={[styles.messageText, item.senderId === user?.userId && styles.userMessageText]}>
//     //                             {item.message}
//     //                         </Text>
//     //                     </View>
//     //                 )}
//     //                 {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
//     //                     <View key={media.key} style={styles.mediaContainer}>
//     //                         {renderMedia(media)}
//     //                     </View>
//     //                 ))}
//     //                 {isLastMessage && item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
//     //                     <Text style={styles.messageStatus}>
//     //                         {getChatStatusText(item.status)}
//     //                     </Text>
//     //                 )}
//     //             </View>
//     //         </View>
//     //     );
//     // };

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 ref={flatListRef}
//                 data={chats}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item.chatId}
//                 contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
//                 getItemLayout={(_, index) => ({ length: 80, offset: 80 * index, index })}
//                 onScrollToIndexFailed={(info) => {
//                     flatListRef.current?.scrollToOffset({
//                         offset: info.averageItemLength * info.index,
//                         animated: true,
//                     });
//                 }}
//             />
//             <ChatInput
//                 inputText={inputText}
//                 setInputText={setInputText}
//                 handleSend={handleSend}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: '#f5f5f5',
//     },
//     messageContainer: {
//         marginVertical: 5,
//         padding: 10,
//         borderRadius: 10,
//         maxWidth: '70%',
//         backgroundColor: '#E5E5EA',
//     },
//     userMessage: {
//         alignSelf: 'flex-end',
//         borderBottomRightRadius: 0,
//     },
//     friendMessage: {
//         alignSelf: 'flex-start',
//         borderBottomLeftRadius: 0,
//     },
//     textMessage: {
//         backgroundColor: '#E5E5EA',
//     },
//     messageText: {
//         fontSize: 16,
//     },
//     timestamp: {
//         alignSelf: 'center',
//         marginBottom: 5,
//         color: '#888',
//         fontSize: 12,
//     },
//     mediaContainer: {
//         marginVertical: 5,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     mediaImage: {
//         width: 200,
//         height: 200,
//         borderRadius: 10,
//     },
//     messageStatus: {
//         fontSize: 12,
//         color: '#888',
//         textAlign: 'right',
//         marginTop: 5,
//     },
//     headerTitle: {
//         fontSize: 14,
//         fontWeight: '500',
//     },
//     avatar: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 10,
//     },
//     userMessageText: {

//     }
// });

// export default ChatDetail;


import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { IChat, IConversation, IMediaType, ChatStatus } from '../../types/chat';
import moment from 'moment';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { useSelector, useDispatch } from 'react-redux';
import VideoPlayer from './VideoPlayer';
import FileComponent from './FileComponent';
import ChatInput from './ChatInput';
import { socket } from '../../redux-toolkit/slices/socketSlice';
import { IConversationSocket, IReadConversationSocket } from '../../types/conversation';
import { addChat } from '../../redux-toolkit/slices/chatSlice';
import { readConversation } from '../../redux-toolkit/slices/conversationSlice';

const ChatDetail: React.FC = () => {
    const navigation = useNavigation();
    const selectedConversation = useSelector((state: RootState) => state.conversations.selectedConversation);
    const [inputText, setInputText] = useState<string>('');
    const user = useSelector((state: RootState) => state.user.user);
    const chats = selectedConversation?.chats || [];
    const dispatch = useDispatch<AppDispatch>();
    const flatListRef = useRef<FlatList<IChat>>(null);

    useEffect(() => {
        const friend = selectedConversation?.participants.find(p => p.userId !== user?.userId);
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
    }, [selectedConversation, user, navigation]);

    useEffect(() => {
        if (selectedConversation && user) {
            const lastChat = selectedConversation.chats[selectedConversation.chats.length - 1];
            if (lastChat && lastChat.senderId !== user.userId && lastChat.status !== 'READ') {
                socket.emit('read-conversation', {
                    conversationId: selectedConversation.conversationId,
                    chatId: lastChat.chatId,
                    userId: user.userId,
                    time: new Date().toISOString(),
                });
                const readData: IReadConversationSocket = {
                    conversationId: selectedConversation.conversationId,
                    chatId: lastChat.chatId,
                    userId: user.userId,
                    time: new Date().toISOString(),
                };
                dispatch(readConversation(readData));
            }
        }
    }, [selectedConversation, user, dispatch]); // Chạy khi selectedConversation hoặc user thay đổi

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [chats]);

    const handleSend = async (text: string, uploadedImageUrls: string[]) => {
        if ((text.trim().length === 0 && uploadedImageUrls.length === 0) || !user) {
            return; // Không gửi nếu không có văn bản hoặc hình ảnh
        }

        const newMessage: IChat = {
            chatId: Math.random().toString(),
            senderId: user.userId,
            message: text,
            medias: uploadedImageUrls.map((url, index) => ({
                key: (index + 1).toString(),
                name: `Image ${index + 1}`,
                url,
                type: 'image/jpeg', // Giả sử tất cả hình ảnh đều là loại 'image/jpeg'
            })),
            savedBy: [],
            deletedBy: [],
            status: 'RECEIVED',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const receiver = selectedConversation?.participants.find(p => p.userId !== user.userId);
        if (!receiver) {
            console.error("Receiver is undefined");
            return;
        }

        const socketData = {
            sender: {
                userId: user.userId,
                name: user.name,
                avatar: user.avatar,
            },
            receiver,
            message: text,
            medias: newMessage.medias,
            createdAt: newMessage.createdAt,
            chatId: newMessage.chatId,
        };

        socket.emit('receive-message', socketData);

        setInputText(''); // Xóa nội dung văn bản sau khi gửi


    };


    // const handleSend = () => {
    //     if (inputText.trim().length === 0 || !user) {
    //         return;
    //     }

    //     const newMessage: IChat = {
    //         chatId: Math.random().toString(),
    //         senderId: user.userId,
    //         message: inputText,
    //         medias: [],
    //         savedBy: [],
    //         deletedBy: [],
    //         status: 'RECEIVED',
    //         createdAt: new Date().toISOString(),
    //         updatedAt: new Date().toISOString(),
    //     };

    //     const receiver = selectedConversation?.participants.find(p => p.userId !== user.userId);
    //     if (!receiver) {
    //         console.error("Receiver is undefined");
    //         return;
    //     }

    //     const socketData = {
    //         sender: {
    //             userId: user.userId,
    //             name: user.name,
    //             avatar: user.avatar,
    //         },
    //         receiver,
    //         message: inputText,
    //         medias: [],
    //         createdAt: new Date().toISOString(),
    //         chatId: newMessage.chatId,
    //     };

    //     socket.emit('receive-message', socketData);
    //     // dispatch(addChat(newMessage)); // Cần thêm nếu muốn lưu tin nhắn mới vào Redux store

    //     setInputText('');
    // };


    // const handleSend = async (text: string, uploadedImageUrls: string[]) => {
    //     if (text.trim().length === 0 || !user) {
    //         return;
    //     }

    //     const newMessage: IChat = {
    //         chatId: Math.random().toString(),
    //         senderId: user.userId,
    //         message: text,
    //         medias: uploadedImageUrls.map((url, index) => ({
    //             key: (index + 1).toString(), // Generate a unique key
    //             name: `Image ${index + 1}`, // Provide a default name for the media
    //             url,
    //             type: 'image/jpeg', // Assuming all images are of type 'image/jpeg'
    //         })),
    //         savedBy: [],
    //         deletedBy: [],
    //         status: 'RECEIVED',
    //         createdAt: new Date().toISOString(),
    //         updatedAt: new Date().toISOString(),
    //     };

    //     const receiver = selectedConversation?.participants.find(p => p.userId !== user.userId);
    //     if (!receiver) {
    //         console.error("Receiver is undefined");
    //         return;
    //     }

    //     const socketData = {
    //         sender: {
    //             userId: user.userId,
    //             name: user.name,
    //             avatar: user.avatar,
    //         },
    //         receiver,
    //         message: text,
    //         medias: newMessage.medias,
    //         createdAt: newMessage.createdAt,
    //         chatId: newMessage.chatId,
    //     };

    //     socket.emit('receive-message', socketData);

    //     setInputText(''); // Clear the input after sending
    // };


    const getChatStatusText = (status: ChatStatus) => {
        if (status === 'RECEIVED') return 'Đã nhận';
        if (status === 'READ') return 'Đã đọc';
        return 'Không xác định';
    };

    const renderMessage = ({ item, index }: { item: IChat; index: number }) => {


        const showTimestamp = index === 0 ||
            moment(item.createdAt).diff(moment(chats[index - 1]?.createdAt), 'minutes') > 5;

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

        const isLastMessage = index === chats.length - 1;

        return (
            <View>
                {showTimestamp && (
                    <Text style={styles.timestamp}>
                        {moment(item.createdAt).format('HH:mm')}
                    </Text>
                )}
                <View style={[styles.messageContainer, item.senderId === user?.userId ? styles.userMessage : styles.friendMessage]}>
                    {item.message && item.message.length > 0 && (
                        <View>
                            <Text style={[styles.messageText, item.senderId === user?.userId && styles.userMessageText]}>
                                {item.message}
                            </Text>
                        </View>
                    )}
                    {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
                        <View key={media.key} style={styles.mediaContainer}>
                            {renderMedia(media)}
                        </View>
                    ))}
                    {isLastMessage && item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
                        <Text style={styles.messageStatus}>
                            {getChatStatusText(item.status)}
                        </Text>
                    )}
                </View>
            </View>
        );
    };


    // const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
    //     const showTimestamp = index === 0 ||
    //         moment(item.createdAt).diff(moment(chats[index - 1]?.createdAt), 'minutes') > 5;

    //     const renderMedia = (media: IMediaType) => {
    //         if (media.type.startsWith('image/')) {
    //             return <Image source={{ uri: media.url }} style={styles.mediaImage} />;
    //         } else if (media.type.startsWith('video/')) {
    //             return <VideoPlayer videoUrl={media.url} />;
    //         } else {
    //             return (
    //                 <FileComponent
    //                     fileName={media.name}
    //                     fileUri={media.url}
    //                 />
    //             );
    //         }
    //     };

    //     const isLastMessage = index === chats.length - 1;

    //     return (
    //         <View>
    //             {showTimestamp && (
    //                 <Text style={styles.timestamp}>
    //                     {moment(item.createdAt).format('hh:mm A')}
    //                 </Text>
    //             )}
    //             <View style={[styles.messageContainer, item.senderId === user?.userId ? styles.userMessage : styles.friendMessage]}>
    //                 {item.message && item.message.length > 0 && (
    //                     <View>
    //                         <Text style={[styles.messageText, item.senderId === user?.userId && styles.userMessageText]}>
    //                             {item.message}
    //                         </Text>
    //                     </View>
    //                 )}
    //                 {Array.isArray(item.medias) && item.medias.length > 0 && item.medias.map(media => (
    //                     <View key={media.key} style={styles.mediaContainer}>
    //                         {renderMedia(media)}
    //                     </View>
    //                 ))}
    //                 {isLastMessage && item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
    //                     <Text style={styles.messageStatus}>
    //                         {getChatStatusText(item.status)}
    //                     </Text>
    //                 )}
    //             </View>
    //         </View>
    //     );
    // };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={chats}
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
            <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                handleSend={handleSend}
            />
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
        backgroundColor: '#E5E5EA',
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
    timestamp: {
        alignSelf: 'center',
        marginBottom: 5,
        color: '#888',
        fontSize: 12,
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
    messageStatus: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
        marginTop: 5,
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
    userMessageText: {

    }
});

export default ChatDetail;