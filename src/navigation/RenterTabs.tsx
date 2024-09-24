// RenterTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import DashboardRenter from '../screens/renter/dashBoard/DashBoardRenter';
import ChatScreen from '../screens/renter/chat/ChatScreen';
import { Text } from 'react-native';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import ExploreScreen from '../screens/renter/explore/ExploreScreen';
import SavedScreen from '../screens/renter/saved/SavedScreen';

const Tab = createBottomTabNavigator();

const RenterTabs: React.FC = () => {
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
                        <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Explore</Text>
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