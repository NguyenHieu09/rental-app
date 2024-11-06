// // RenterTabs.tsx
// import React, { useEffect, useState } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { IconFill, IconOutline } from '@ant-design/icons-react-native';
// import DashboardRenter from '../screens/renter/dashBoard/DashBoardRenter';
// import ChatScreen from '../screens/renter/chat/ChatScreen';
// import { Text } from 'react-native';
// import ProfileScreen from '../screens/profileScreen/ProfileScreen';
// import ExploreScreen from '../screens/renter/explore/ExploreScreen';
// import SavedScreen from '../screens/renter/saved/SavedScreen';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux-toolkit/store';
// import { fetchAllConversations } from '../api/api';
// import { IConversation } from '../types/chat';
// import { addConversations } from '../redux-toolkit/slices/conversationSlice';

// const Tab = createBottomTabNavigator();

// const RenterTabs: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const conversations = useSelector((state: RootState) => state.conversations.conversations);
//     const userId = useSelector((state: RootState) => state.user.user?.userId); // Giả định có ID người dùng trong Redux store
//     const [unreadCount, setUnreadCount] = useState(0);
//     const notifications = useSelector((state: RootState) => state.notifications.notifications);

//     const calculateUnreadMessages = (conversations: IConversation[], userId: string) => {
//         return conversations.reduce((totalUnread, conversation) => {
//             let unreadCount = 0;

//             for (let i = conversation.chats.length - 1; i >= 0; i--) {
//                 const chat = conversation.chats[i];

//                 if (chat.status === 'RECEIVED' && chat.senderId !== userId) {
//                     unreadCount++;
//                 } else {
//                     break; // Dừng nếu gặp tin nhắn đã đọc hoặc do chính người dùng gửi
//                 }
//             }

//             return totalUnread + unreadCount;
//         }, 0);
//     };


//     useEffect(() => {
//         const loadConversations = async () => {
//             try {
//                 const data: IConversation[] = await fetchAllConversations();

//                 // Chuyển đổi data thành dạng ITable
//                 const tableData = {
//                     data,
//                     pageInfo: {
//                         current: 1,
//                         pageSize: 10,
//                         total: data.length,
//                     },
//                 };

//                 dispatch(addConversations(tableData)); // Truyền dữ liệu đúng kiểu vào addConversations

//                 const unreadMessages = calculateUnreadMessages(data, userId || "");
//                 console.log(unreadMessages);


//                 setUnreadCount(unreadMessages);
//             } catch (error) {
//                 console.error('Error loading conversations:', error);
//             }
//         };

//         loadConversations();
//     }, [dispatch, userId]);

//     return (
//         <Tab.Navigator>
//             <Tab.Screen
//                 name="DashboardRenter"
//                 component={DashboardRenter}
//                 options={{
//                     title: 'Home',
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <IconFill name="home" color={color} size={size} />
//                     ),
//                     tabBarLabel: ({ color }) => (
//                         <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Home</Text>
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="ExploreScreen"
//                 component={ExploreScreen}
//                 options={{
//                     title: 'Explore',
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <IconOutline name="search" color={color} size={size} />
//                     ),
//                     tabBarLabel: ({ color }) => (
//                         <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Find</Text>
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="SavedScreen"
//                 component={SavedScreen}
//                 options={{
//                     title: 'SavedScreen',
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <IconFill name="heart" color={color} size={size} />
//                     ),
//                     tabBarLabel: ({ color }) => (
//                         <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Saved</Text>
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="ChatScreen"
//                 component={ChatScreen}
//                 options={{
//                     title: 'Chat',
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <IconFill name="message" color={color} size={size} />

//                     ),
//                     tabBarLabel: ({ color }) => (
//                         <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Chat</Text>
//                     ),
//                     tabBarBadge: unreadCount > 0 ? unreadCount : undefined,

//                 }}
//             />
//             <Tab.Screen
//                 name="ProfileScreen"
//                 component={ProfileScreen}
//                 options={{
//                     title: 'Profile',
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <IconOutline name="user" color={color} size={size} />
//                     ),
//                     tabBarLabel: ({ color }) => (
//                         <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Profile</Text>
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// };

// export default RenterTabs;

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import DashboardRenter from '../screens/renter/dashBoard/DashBoardRenter';
import ChatScreen from '../screens/renter/chat/ChatScreen';
import { Text } from 'react-native';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import ExploreScreen from '../screens/renter/explore/ExploreScreen';
import SavedScreen from '../screens/renter/saved/SavedScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import { fetchAllConversations } from '../api/api';
import { IConversation } from '../types/chat';
import { addConversations } from '../redux-toolkit/slices/conversationSlice';

const Tab = createBottomTabNavigator();

const RenterTabs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector((state: RootState) => state.conversations.conversations);

    const userId = useSelector((state: RootState) => state.user.user?.userId); // Giả định có ID người dùng trong Redux store
    const filteredConversations = conversations.filter((conversation) =>
        conversation.participants.some((participant) => participant.userId === userId)
    );
    const [unreadCount, setUnreadCount] = useState(0);

    // Tính toán số lượng tin nhắn chưa đọc
    const calculateUnreadMessages = (conversations: IConversation[], userId: string) => {
        return conversations.reduce((totalUnread, conversation) => {
            let unreadCount = 0;

            for (let i = conversation.chats.length - 1; i >= 0; i--) {
                const chat = conversation.chats[i];

                if (chat.status === 'RECEIVED' && chat.senderId !== userId) {
                    unreadCount++;
                } else {
                    break; // Dừng nếu gặp tin nhắn đã đọc hoặc do chính người dùng gửi
                }
            }

            return totalUnread + unreadCount;
        }, 0);
    };

    // Đảm bảo tính toán lại mỗi khi có sự thay đổi trong conversations
    useEffect(() => {
        if (userId) {
            const unreadMessages = calculateUnreadMessages(filteredConversations, userId);
            setUnreadCount(unreadMessages);
        }
    }, [conversations, userId]);

    // Lấy tất cả cuộc trò chuyện khi app bắt đầu
    useEffect(() => {
        const loadConversations = async () => {
            try {
                const data: IConversation[] = await fetchAllConversations();

                // Chuyển đổi data thành dạng ITable
                const tableData = {
                    data,
                    pageInfo: {
                        current: 1,
                        pageSize: 10,
                        total: data.length,
                    },
                };

                dispatch(addConversations(tableData)); // Truyền dữ liệu đúng kiểu vào addConversations
            } catch (error) {
                console.error('Error loading conversations:', error);
            }
        };

        loadConversations();
    }, [dispatch]);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="DashboardRenter"
                component={DashboardRenter}
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconFill name="home" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Home</Text>
                    ),
                }}
            />

            <Tab.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconOutline name="search" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Find</Text>
                    ),
                }}
            />

            <Tab.Screen
                name="SavedScreen"
                component={SavedScreen}
                options={{
                    title: 'SavedScreen',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconFill name="heart" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Saved</Text>
                    ),
                }}
            />

            <Tab.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    title: 'Chat',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconFill name="message" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Chat</Text>
                    ),
                    tabBarBadge: unreadCount > 0 ? unreadCount : undefined, // Hiển thị số lượng tin nhắn chưa đọc
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconOutline name="user" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Profile</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default RenterTabs;
