// // import React, { useState, useEffect, useRef } from 'react';
// // import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// // import moment from 'moment';
// // import ChatInput from '../../../components/chat/ChatInput';
// // import { TextInput } from 'react-native-gesture-handler';
// // import Feather from 'react-native-vector-icons/Feather';

// // const dummyConversation = [
// //     {
// //         "_id": "673c03be613c6f9310572e2e",
// //         "query": "Bất động sản ở Hà Nội",
// //         "result": "**Cho thuê nhà 5 tầng ngõ 172 Lạc Long Quân, 41m2 MT 6m, ngõ thông ô tô 7 chỗ vào nhà 21.5 tr/th**\n\n* Loại nhà: Nhà riêng\n* Địa chỉ: Đường Lạc Long Quân, Phường Bưởi, Quận Tây Hồ, Hà Nội\n* Diện tích: 41 m2\n* Giá: 21.500.000 VNĐ/tháng\n\n(Slug: cho-thue-nha-5-tang-ngo-172-lac-long-quan-41m2-mt-6m-ngo-thong-o-to-7-cho-vao-nha-21.5-trth-a1810c1d-bf96-40b9-a326-d54135dcc2ad)",
// //         "source_documents": [
// //             {
// //                 "address": {
// //                     "city": "Hà Nội",
// //                     "district": "Quận Tây Hồ",
// //                     "street": "Đường Lạc Long Quân",
// //                     "ward": "Phường Bưởi"
// //                 },
// //                 "attributes": [
// //                     {
// //                         "name": "Wifi",
// //                         "type": "Amenity"
// //                     }
// //                 ],
// //                 "description": "Nhà ngay mặt ngõ 172 Lạc Long Quân, ô tô qua, vào nhà\r\nNgõ thông ra Võng Thị, Thuỵ Khuê\r\nHiện trạng nhà 5 tầng 4 phòng thông sàn\r\nThuận tiện kinh doanh, làm văn phòng ...\r\nGiá thuê: 21.5 triệu/ th có thương lượng\r\nLH Thu Trang 0948031338 xem nhà",
// //                 "id": "92ac3107-20dc-4921-9486-feecb6d57439",
// //                 "images": [
// //                     "https://firebasestorage.googleapis.com/v0/b/iuh-kltn.appspot.com/o/property-service%2F1727884792570-Screenshot%202024-10-02%20224904.png?alt=media&token=d2bf1b66-1ab7-4bcd-852d-51a206bfcc64"
// //                 ],
// //                 "latitude": null,
// //                 "longitude": null,
// //                 "owner": {
// //                     "avatar": null,
// //                     "email": "thaoanhhaa1@gmail.com",
// //                     "name": "HÀ ANH THẢO",
// //                     "phoneNumber": "0987967079",
// //                     "userId": "66ea64c38a82519c8f196fb8"
// //                 },
// //                 "price": 21500000,
// //                 "rentalConditions": [
// //                     {
// //                         "type": "Diện tích",
// //                         "value": "41 m2"
// //                     },
// //                     {
// //                         "type": "Diện tích quyền sử dụng đất",
// //                         "value": "41 m2"
// //                     },
// //                     {
// //                         "type": "Phòng tắm",
// //                         "value": "5 phòng"
// //                     },
// //                     {
// //                         "type": "Phòng ngủ",
// //                         "value": "4 phòng"
// //                     },
// //                     {
// //                         "type": "Số tầng",
// //                         "value": "5 tầng"
// //                     },
// //                     {
// //                         "type": "Nội thất",
// //                         "value": "Không nội thất"
// //                     }
// //                 ],
// //                 "slug": "cho-thue-nha-5-tang-ngo-172-lac-long-quan-41m2-mt-6m-ngo-thong-o-to-7-cho-vao-nha-21.5-trth-a1810c1d-bf96-40b9-a326-d54135dcc2ad",
// //                 "title": "Cho thuê nhà 5 tầng ngõ 172 Lạc Long Quân, 41m2 MT 6m, ngõ thông ô tô 7 chỗ vào nhà 21.5 tr/th",
// //                 "type": {
// //                     "id": "66e5be4a8497a65d0dfdcfeb",
// //                     "name": "Nhà riêng"
// //                 },
// //                 "_id": "453593d6-893e-4540-a294-e4a3245ea17c",
// //                 "_collection_name": "property_collection"
// //             }
// //         ],
// //         "page_contents": [
// //             "Tiêu đề: Cho thuê nhà 5 tầng ngõ 172 Lạc Long Quân, 41m2 MT 6m, ngõ thông ô tô 7 chỗ vào nhà 21.5 tr/th\nMô tả: Nhà ngay mặt ngõ 172 Lạc Long Quân, ô tô qua, vào nhà\r\nNgõ thông ra Võng Thị, Thuỵ Khuê\r\nHiện trạng nhà 5 tầng 4 phòng thông sàn\r\nThuận tiện kinh doanh, làm văn phòng ...\r\nGiá thuê: 21.5 triệu/ th có thương lượng\r\nLH Thu Trang 0948031338 xem nhà\nLoại nhà: Nhà riêng\nĐịa chỉ: Đường Lạc Long Quân, Phường Bưởi, Quận Tây Hồ, Hà Nội\nChủ nhà: HÀ ANH THẢO\nEmail: thaoanhhaa1@gmail.com\nSố điện thoại: 0987967079\nDiện tích: 41 m2\nDiện tích quyền sử dụng đất: 41 m2\nPhòng tắm: 5 phòng\nPhòng ngủ: 4 phòng\nSố tầng: 5 tầng\nNội thất: Không nội thất\nAmenity: Wifi\nGiá: 21500000 (Slug: cho-thue-nha-5-tang-ngo-172-lac-long-quan-41m2-mt-6m-ngo-thong-o-to-7-cho-vao-nha-21.5-trth-a1810c1d-bf96-40b9-a326-d54135dcc2ad)"
// //         ]
// //     },
// //     {
// //         "_id": "673c039b613c6f9310572e2d",
// //         "query": "Bất động sản ở Hà Nội",
// //         "result": "Xin chào, tôi có thể giúp bạn cung cấp thông tin về bất động sản ở Hà Nội. Bạn có muốn biết thêm không?",
// //         "source_documents": [],
// //         "page_contents": []
// //     }
// // ]
// // const ChatBotScreen: React.FC = () => {
// //     const [inputText, setInputText] = useState<string>('');
// //     const [conversation, setConversation] = useState(dummyConversation); // Sử dụng state để lưu tin nhắn
// //     const flatListRef = useRef<FlatList<any>>(null);

// //     const handleSend = () => {
// //         if (!inputText.trim()) return;

// //         const newMessage = {
// //             _id: Date.now().toString(),
// //             query: inputText,
// //             result: '', // Tin nhắn người dùng không có result
// //             source_documents: [],
// //             page_contents: [], // Thêm thuộc tính page_contents
// //         };

// //         setConversation((prev) => [...prev, newMessage]);
// //         setInputText('');

// //         // Tự động thêm phản hồi của bot
// //         setTimeout(() => {
// //             const botReply = {
// //                 _id: (Date.now() + 1).toString(),
// //                 query: '',
// //                 result: 'Xin chào! Tôi có thể giúp bạn gì?',
// //                 source_documents: [],
// //                 page_contents: [], // Thêm thuộc tính page_contents
// //             };
// //             setConversation((prev) => [...prev, botReply]);
// //         }, 1000); // Trả lời sau 1 giây
// //     };



// //     useEffect(() => {
// //         // Tự động cuộn xuống cuối khi cập nhật danh sách tin nhắn
// //         flatListRef.current?.scrollToEnd({ animated: true });
// //     }, [conversation]);

// //     const renderMessage = ({ item }: { item: any }) => {
// //         return (
// //             <View>
// //                 {/* Query (Hiển thị bên phải) */}
// //                 {item.query && (
// //                     <View style={[styles.messageContainer, styles.userMessage]}>
// //                         <Text style={[styles.messageText, styles.userMessageText]}>{item.query}</Text>
// //                     </View>
// //                 )}

// //                 {/* Result và Source Documents (Hiển thị bên trái) */}
// //                 {item.result && (
// //                     <View style={[styles.messageContainer, styles.friendMessage]}>
// //                         <Text style={styles.messageText}>{item.result}</Text>
// //                         {item.source_documents?.length > 0 && (
// //                             <View style={styles.mediaContainer}>
// //                                 {item.source_documents.map((doc: any, idx: number) => (
// //                                     <View key={idx} style={styles.documentContainer}>
// //                                         <Image
// //                                             source={{ uri: doc.images?.[0] || '' }}
// //                                             style={styles.mediaImage}
// //                                         />
// //                                         <Text style={styles.messageText}>{doc.title}</Text>
// //                                         <Text style={styles.messageText}>{doc.description}</Text>
// //                                     </View>
// //                                 ))}
// //                             </View>
// //                         )}
// //                     </View>
// //                 )}
// //             </View>
// //         );
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <FlatList
// //                 data={conversation}
// //                 keyExtractor={(item) => item._id}
// //                 renderItem={renderMessage}
// //                 ref={flatListRef}
// //                 contentContainerStyle={styles.chatList}
// //             />
// //             <View style={styles.inputContainer}>
// //                 <TouchableOpacity style={styles.uploadButton}>
// //                     <Feather name="image" size={24} color="#007AFF" />
// //                 </TouchableOpacity>
// //                 <TextInput
// //                     style={styles.input}
// //                     value={inputText}
// //                     onChangeText={setInputText}
// //                     placeholder="Nhập tin nhắn..."
// //                 />
// //                 <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
// //                     <Feather name="send" size={24} color="#007AFF" />
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: { flex: 1, backgroundColor: '#f5f5f5' },
// //     chatList: { padding: 10 },
// //     messageContainer: {
// //         marginVertical: 5,
// //         padding: 10,
// //         borderRadius: 10,
// //         maxWidth: '70%',
// //     },
// //     userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
// //     friendMessage: { alignSelf: 'flex-start', backgroundColor: '#ffffff' },
// //     messageText: { fontSize: 16 },
// //     userMessageText: { color: '#000' },
// //     timestamp: { fontSize: 12, color: '#888', alignSelf: 'center', marginVertical: 5 },
// //     mediaContainer: { marginTop: 10 },
// //     mediaImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 5 },
// //     documentContainer: { marginBottom: 10 },
// //     inputContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         padding: 10,
// //     },
// //     input: {
// //         flex: 1,
// //         borderColor: '#ccc',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         padding: 5,
// //         marginRight: 10,
// //     },
// //     sendButton: { padding: 5 },
// //     uploadButton: { padding: 5 },
// // });


// // export default ChatBotScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
// import { IChatbot, IChatRequest } from '../../../types/chatBot';
// import { fetchChatBotMessages, sendChatBotQuery } from '../../../api/chatbot';
// import { TextInput } from 'react-native-gesture-handler';
// import Feather from 'react-native-vector-icons/Feather';
// import { AppDispatch, RootState } from '../../../redux-toolkit/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { addChat, addChats, setLoading } from '../../../redux-toolkit/slices/chatBotSlice';


// const ChatBotScreen: React.FC = () => {
//     const { chats, loading } = useSelector((state: RootState) => state.chatBot);
//     const [inputText, setInputText] = useState<string>('');
//     const dispatch = useDispatch<AppDispatch>();


//     const loadChatBotMessages = async () => {
//         dispatch(setLoading(true));
//         try {
//             const data = await fetchChatBotMessages();
//             const uniqueData = Array.from(new Map(data.map(item => [item._id, item])).values());
//             dispatch(addChats(uniqueData));
//         } catch (error) {
//             console.error('Error loading chatbot messages:', error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     const handleSend = async () => {
//         if (inputText.trim() === '') return;

//         const query: IChatRequest = { query: inputText };
//         setInputText('');

//         try {
//             const response = await sendChatBotQuery(query);
//             dispatch(addChat(response));
//         } catch (error) {
//             console.error('Error sending chatbot query:', error);
//         }
//     };

//     useEffect(() => {
//         loadChatBotMessages();
//     }, [dispatch]);

//     const renderMessage = ({ item }: { item: IChatbot }) => {
//         return (
//             <View key={item._id} style={styles.messageContainer}>
//                 {/* Display query on the right */}
//                 <View style={[styles.messageBubble, styles.queryBubble]}>
//                     <Text style={styles.queryText}>{item.query}</Text>
//                 </View>
//                 {/* Display result on the left */}
//                 <View style={[styles.messageBubble, styles.resultBubble]}>
//                     <Text style={styles.resultText}>{item.result}</Text>
//                 </View>
//                 {/* Display source documents on the left */}
//                 {item.source_documents.map((doc, idx) => (
//                     <View key={idx} style={[styles.sourceDocContainer, styles.messageBubble]}>
//                         {/* <Text style={styles.sourceDocText}>
//                             Địa chỉ: {doc.address.street}, {doc.address.district}, {doc.address.city}
//                         </Text> */}

//                         {doc.images && doc.images[0] && (

//                             <Image source={{ uri: doc.images[0] }} style={styles.image} />



//                         )}
//                         <View>
//                             <Text style={[styles.messageText, { fontSize: 16 }]}>
//                                 {doc.title}
//                             </Text>

//                             {/* <Text style={styles.messageText} numberOfLines={2}>{doc.description}</Text> */}
//                         </View>

//                     </View>
//                 ))}
//             </View>
//         );
//     };

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
//                 data={chats.map(chat => chat.response)}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item._id}
//                 contentContainerStyle={styles.chatList}
//                 inverted
//             />

//             <View style={styles.inputContainer}>

//                 <TextInput
//                     style={styles.input}
//                     value={inputText}
//                     onChangeText={setInputText}
//                     placeholder="Nhập tin nhắn..."
//                 />
//                 <TouchableOpacity
//                     style={[styles.sendButton, { opacity: inputText.trim() === '' ? 0.4 : 1 }]}
//                     disabled={inputText.trim() === ''}>
//                     <Feather name="send" size={24} color={'#007AFF'} />
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity style={styles.sendButton}>
//                     <Feather name="send" size={24} color="#007AFF" />
//                 </TouchableOpacity> */}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#f5f5f5' },
//     chatList: { padding: 10 },
//     messageContainer: {
//         marginVertical: 5,
//     },
//     messageBubble: {
//         padding: 10,
//         borderRadius: 10,
//         maxWidth: '70%',
//         marginVertical: 5,
//     },
//     queryBubble: {
//         alignSelf: 'flex-end',
//         backgroundColor: '#DCF8C6',
//     },
//     resultBubble: {
//         alignSelf: 'flex-start',
//         backgroundColor: '#ffffff',
//     },
//     queryText: { color: 'black', fontSize: 16 },
//     resultText: { color: 'black', fontSize: 16 },
//     sourceDocContainer: { marginTop: 5, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
//     sourceDocText: { color: '#888' },
//     image: { width: 250, height: 240, resizeMode: 'cover', borderRadius: 15, marginBottom: 5 },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
//     friendMessage: { alignSelf: 'flex-start', backgroundColor: '#ffffff' },
//     messageText: { fontSize: 14, fontWeight: 500 },
//     userMessageText: { color: '#000' },
//     timestamp: { fontSize: 12, color: '#888', alignSelf: 'center', marginVertical: 5 },
//     mediaContainer: { marginTop: 10 },
//     mediaImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 5 },
//     documentContainer: { marginBottom: 10 },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         backgroundColor: 'white',
//     },
//     input: {
//         flex: 1,
//         borderRadius: 5,
//         padding: 5,
//         marginRight: 10,
//     },
//     sendButton: { padding: 5 },
//     uploadButton: { padding: 5 },
// });

// export default ChatBotScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { IChatbot, IChatRequest } from '../../../types/chatBot';
import { fetchChatBotMessages, sendChatBotQuery } from '../../../api/chatbot';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, addChats, setLoading } from '../../../redux-toolkit/slices/chatBotSlice';

const ChatBotScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { chats, loading } = useSelector((state: RootState) => state.chatBot);
    const [inputText, setInputText] = useState<string>('');

    const loadChatBotMessages = async () => {
        dispatch(setLoading(true));
        try {
            const data = await fetchChatBotMessages();
            const uniqueData = Array.from(new Map(data.map(item => [item._id, item])).values());
            dispatch(addChats(uniqueData));
        } catch (error) {
            console.error('Error loading chatbot messages:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSend = async () => {
        if (inputText.trim() === '') return;

        const query: IChatRequest = { query: inputText };
        setInputText('');

        try {
            const response = await sendChatBotQuery(query);
            console.log(response);

            dispatch(addChat(response));
        } catch (error) {
            console.error('Error sending chatbot query:', error);
        }
    };

    useEffect(() => {
        loadChatBotMessages();
    }, [dispatch]);

    const renderMessage = ({ item }: { item: IChatbot }) => {
        return (
            <View key={item._id} style={styles.messageContainer}>
                {/* Display query on the right */}
                {item.query && (
                    <View style={[styles.messageBubble, styles.queryBubble]}>
                        <Text style={styles.queryText}>{item.query}</Text>
                    </View>
                )}
                {/* Display result on the left */}
                {item.result && (
                    <View style={[styles.messageBubble, styles.resultBubble]}>
                        <Text style={styles.resultText}>{item.result}</Text>
                    </View>
                )}
                {/* Display source documents on the left */}
                {item.source_documents.map((doc, idx) => (
                    <View key={idx} style={[styles.sourceDocContainer, styles.messageBubble]}>
                        {doc.images && doc.images[0] && (
                            <Image source={{ uri: doc.images[0] }} style={styles.image} />
                        )}
                        <View>
                            <Text style={[styles.messageText, { fontSize: 16 }]}>
                                {doc.title}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={chats.map(chat => chat.response)}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.chatList}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Nhập tin nhắn..."
                />
                <TouchableOpacity
                    style={[styles.sendButton, { opacity: inputText.trim() === '' ? 0.4 : 1 }]}
                    onPress={handleSend}
                    disabled={inputText.trim() === ''}>
                    <Feather name="send" size={24} color={'#007AFF'} />
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
    sourceDocContainer: { marginTop: 5, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
    sourceDocText: { color: '#888' },
    image: { width: 250, height: 240, resizeMode: 'cover', borderRadius: 15, marginBottom: 5 },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
    friendMessage: { alignSelf: 'flex-start', backgroundColor: '#ffffff' },
    messageText: { fontSize: 14, fontWeight: '500' },
    userMessageText: { color: '#000' },
    timestamp: { fontSize: 12, color: '#888', alignSelf: 'center', marginVertical: 5 },
    mediaContainer: { marginTop: 10 },
    mediaImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 5 },
    documentContainer: { marginBottom: 10 },
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
});

export default ChatBotScreen;

