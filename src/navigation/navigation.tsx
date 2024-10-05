// navigation.tsx
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginStatus } from '../redux-toolkit/slices/userSlice';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import RegisterScreen from '../screens/registerScreen/RegisterScreen';
import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
import DashboardOwner from '../screens/owner/dashBoard/DashBoardOwner';
import RenterTabs from './RenterTabs';
import PropertyScreen from '../screens/renter/PropertyScreen/PropertyScreen';
import { IconOutline } from '@ant-design/icons-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OwnerTabs from './OwnerTabs';
import ManageProperty from '../screens/owner/property/ManageProperty';
import ManageRequestRental from '../screens/owner/ManageRequestRental/ManageRequestRental';
import ContractScreen from '../screens/owner/Contract/ContractScreen ';
// import PropertyDetail from '../screens/renter/PropertyScreen/PropertyDetail';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                await AsyncStorage.setItem('hasLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        };

        checkFirstLaunch();
        dispatch(checkLoginStatus());
    }, [dispatch]);

    if (isFirstLaunch === null || loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    // Hàm để thay đổi trạng thái khi click
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isFirstLaunch ? "Welcome" : user ? (user.userTypes.includes('owner') ? "DashboardOwner" : "RenterTabs") : "Login"}>
                {isFirstLaunch && (
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ headerShown: false }}
                    />
                )}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="RenterTabs" component={RenterTabs} options={{ headerShown: false }} />
                <Stack.Screen name="OwnerTabs" component={OwnerTabs} options={{ headerShown: false }} />

                <Stack.Screen name="PropertyScreen" component={PropertyScreen} options={{
                    title: 'Thông tin bất động sản',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#333', // Custom color
                    },
                    headerStyle: {
                        // backgroundColor: '#f8f8f8', // Custom background color
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleBookmark} style={{ marginRight: 16 }}>
                            <FontAwesome
                                name={isBookmarked ? "bookmark" : "bookmark-o"}  // bookmark-o là biểu tượng outline, bookmark là fill
                                size={30}
                                color={isBookmarked ? "blue" : "black"} // Đổi màu nếu được chọn
                            />
                        </TouchableOpacity>
                    ),
                }} />

                <Stack.Screen name="ManageProperty" component={ManageProperty}
                    options={{ title: 'Tài Sản Của Tôi' }}
                />
                <Stack.Screen name="ManageRequestRental" component={ManageRequestRental}
                    options={{ title: 'Yêu cầu thuê nhà' }}
                />
                <Stack.Screen name="ContractScreen" component={ContractScreen}
                    options={{ title: 'Tạo hợp đồng' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;