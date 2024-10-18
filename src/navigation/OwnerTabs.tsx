import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import DashboardOwner from '../screens/owner/dashBoard/DashBoardOwner';
import ChatScreen from '../screens/owner/chat/ChatScreen';
import { Text, View, TouchableOpacity } from 'react-native';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
// import ExploreScreen from '../screens/owner/explore/ExploreScreen';
import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import AddProperty from '../screens/owner/addProperty/AddPropertyScreen';
import ExploreScreen from '../screens/owner/explore/ExploreScreen';
// import ExploreScreen from '../screens/renter/explore/ExploreScreen';
// import AuthenticationScreen from '../screens/Authentication/AuthenticationScreen';
// import ContractScreen from '../screens/owner/Contract/ContractScreen ';
// import WalletScreen from '../screens/Wallet/WalletScreen';

const Tab = createBottomTabNavigator();

const OwnerTabs: React.FC = () => {
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