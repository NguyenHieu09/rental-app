import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import DashboardOwner from '../screens/owner/dashBoard/DashBoardOwner';
// import ChatScreen from '../screens/owner/chat/ChatScreen';
import { Text, View, TouchableOpacity } from 'react-native';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
// import ExploreScreen from '../screens/owner/explore/ExploreScreen';
import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import AddProperty from '../screens/owner/addProperty/AddPropertyScreen';
import ExploreScreen from '../screens/owner/explore/ExploreScreen';
import ChatScreen from '../screens/renter/chat/ChatScreen';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { IConversation } from '../types/chat';
import { fetchAllConversations } from '../api/api';
import { addConversations, clearConversations } from '../redux-toolkit/slices/conversationSlice';
import { RootStackParamList } from '../types/navigation';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
// import ExploreScreen from '../screens/renter/explore/ExploreScreen';
// import AuthenticationScreen from '../screens/Authentication/AuthenticationScreen';
// import ContractScreen from '../screens/owner/Contract/ContractScreen ';
// import WalletScreen from '../screens/Wallet/WalletScreen';

const Tab = createBottomTabNavigator();

const OwnerTabs: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector((state: RootState) => state.conversations.conversations);

    const userId = useSelector((state: RootState) => state.user.user?.userId);
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
                name="DashboardOwner"
                component={DashboardOwner}
                options={{
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
                name="Add"
                component={AddProperty}
                options={{
                    // headerShown: false,
                    title: 'Đăng tin',
                    headerTitleAlign: 'center',
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ top: -10, width: 50, height: 50, borderRadius: 30, backgroundColor: '#D3D3D3', justifyContent: 'center', alignItems: 'center' }}>
                                <IconOutline name="plus" color="black" size={24} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />

            < Tab.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
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

            < Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconOutline name="user" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Profile</Text>
                    ),
                }}
            />
        </Tab.Navigator >
    );
};

export default OwnerTabs;

